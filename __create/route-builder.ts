import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

// Add type declarations for Vite-specific import.meta properties
declare const __VITE_DEV__: boolean;

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly hot?: {
    accept: (callback?: (module: any) => void) => void;
  };
  glob?: (pattern: string, options?: any) => any;
}

const API_BASENAME = '/api';
const api = new Hono();

// Get current directory
const __dirname = join(fileURLToPath(new URL('.', import.meta.url)), '../src/app/api');
if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Recursively find all route.js files
async function findRouteFiles(dir: string): Promise<string[]> {
  const files = await readdir(dir);
  let routes: string[] = [];

  for (const file of files) {
    try {
      const filePath = join(dir, file);
      const statResult = await stat(filePath);

      if (statResult.isDirectory()) {
        routes = routes.concat(await findRouteFiles(filePath));
      } else if (file === 'route.js') {
        // Handle root route.js specially
        if (filePath === join(__dirname, 'route.js')) {
          routes.unshift(filePath); // Add to beginning of array
        } else {
          routes.push(filePath);
        }
      }
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

  return routes;
}

// Helper function to transform file path to Hono route path
function getHonoPath(routeFile: string): { name: string; pattern: string }[] {
  const relativePath = routeFile.replace(__dirname, '');
  const parts = relativePath.split('/').filter(Boolean);
  const routeParts = parts.slice(0, -1); // Remove 'route.js'
  if (routeParts.length === 0) {
    return [{ name: 'root', pattern: '' }];
  }
  const transformedParts = routeParts.map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [_, dots, param] = match;
      return dots === '...'
        ? { name: param, pattern: `:${param}{.+}` }
        : { name: param, pattern: `:${param}` };
    }
    return { name: segment, pattern: segment };
  });
  return transformedParts;
}

// Environment detection helper
const isDevelopment = () => {
  try {
    return process.env.NODE_ENV !== 'production' && 
           (typeof window === 'undefined' || 
            (import.meta as any)?.env?.DEV === true);
  } catch {
    return process.env.NODE_ENV !== 'production';
  }
};

// Import and register all routes
async function registerRoutes() {
  // In production build, skip route scanning since routes are statically imported
  if (!isDevelopment()) {
    console.log('Production mode: skipping dynamic route scanning');
    return;
  }

  const routeFiles = (
    await findRouteFiles(__dirname).catch((error) => {
      console.error('Error finding route files:', error);
      return [];
    })
  )
    .slice()
    .sort((a, b) => {
      return b.length - a.length;
    });

  // Clear existing routes
  api.routes = [];

  for (const routeFile of routeFiles) {
    try {
      // Use a more reliable import approach
      const route = await import(/* @vite-ignore */ routeFile);

      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
      for (const method of methods) {
        try {
          if (route[method]) {
            const parts = getHonoPath(routeFile);
            const honoPath = `/${parts.map(({ pattern }) => pattern).join('/')}`;
            const handler: Handler = async (c) => {
              const params = c.req.param();
              if (isDevelopment()) {
                try {
                  const updatedRoute = await import(/* @vite-ignore */ routeFile);
                  return await updatedRoute[method](c.req.raw, { params });
                } catch (error) {
                  console.error(`Error importing updated route ${routeFile}:`, error);
                  return await route[method](c.req.raw, { params });
                }
              }
              return await route[method](c.req.raw, { params });
            };
            const methodLowercase = method.toLowerCase();
            switch (methodLowercase) {
              case 'get':
                api.get(honoPath, handler);
                break;
              case 'post':
                api.post(honoPath, handler);
                break;
              case 'put':
                api.put(honoPath, handler);
                break;
              case 'delete':
                api.delete(honoPath, handler);
                break;
              case 'patch':
                api.patch(honoPath, handler);
                break;
              default:
                console.warn(`Unsupported method: ${method}`);
                break;
            }
          }
        } catch (error) {
          console.error(`Error registering route ${routeFile} for method ${method}:`, error);
        }
      }
    } catch (error) {
      console.error(`Error importing route file ${routeFile}:`, error);
    }
  }
}

// Initial route registration
registerRoutes().catch((error) => {
  console.error('Error initializing routes:', error);
});

// Hot reload routes in development
if (isDevelopment()) {
  try {
    // Use dynamic import for glob to avoid TypeScript issues
    const importMetaAny = import.meta as any;
    if (importMetaAny?.glob) {
      importMetaAny.glob('../src/app/api/**/route.js', {
        eager: true,
      });
    }
    if (importMetaAny?.hot) {
      importMetaAny.hot.accept((newSelf: any) => {
        registerRoutes().catch((err: any) => {
          console.error('Error reloading routes:', err);
        });
      });
    }
  } catch (error) {
    console.log('Hot reload not available in this environment');
  }
}

export { api, API_BASENAME };
