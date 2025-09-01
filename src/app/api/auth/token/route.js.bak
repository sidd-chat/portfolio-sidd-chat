import { getToken } from '@auth/core/jwt';

export async function GET(request) {
	// Add fallback values for environment variables
	const AUTH_SECRET = process.env.AUTH_SECRET || 'fallback-secret-for-development';
	const AUTH_URL = process.env.AUTH_URL || 'http://localhost:4000';
	
	const [token, jwt] = await Promise.all([
		getToken({
			req: request,
			secret: AUTH_SECRET,
			secureCookie: AUTH_URL.startsWith('https'),
			raw: true,
		}),
		getToken({
			req: request,
			secret: AUTH_SECRET,
			secureCookie: AUTH_URL.startsWith('https'),
		}),
	]);

	if (!jwt) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	return new Response(
		JSON.stringify({
			jwt: token,
			user: {
				id: jwt.sub,
				email: jwt.email,
				name: jwt.name,
			},
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
}
