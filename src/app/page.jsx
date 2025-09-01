'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Palette, 
  Smartphone,
  Database,
  Globe,
  ArrowRight,
  Star,
  Users,
  Award,
  Send
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// Particle background component
const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#186F65] rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] overflow-hidden">
      <ParticleBackground />
      
      <motion.div 
        style={{ y }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-[#B5CB99] text-base sm:text-lg font-medium tracking-wide">
            Hello, I'm
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-inter leading-tight"
        >
          Siddhartha{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#186F65] to-[#B5CB99]">
            Chatterjee
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
        >
          Full-Stack Developer crafting digital experiences that{' '}
          <span className="text-[#B5CB99] font-semibold">inspire</span> and{' '}
          <span className="text-[#186F65] font-semibold">innovate</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(24, 111, 101, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('featured-project')}
            className="bg-gradient-to-r from-[#186F65] to-[#B5CB99] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center gap-2 hover:shadow-lg transition-all duration-300 w-full sm:w-auto justify-center"
          >
            View My Work
            <ArrowRight size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="border-2 border-[#186F65] text-[#186F65] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-[#186F65] hover:text-white transition-all duration-300 w-full sm:w-auto justify-center flex items-center"
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-12"
        >
          {[
            { icon: Github, href: "https://github.com/sidd-chat" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/siddhartha-chatterjee-b31894b3/" },
            { icon: Mail, href: "mailto:siddharthachatterjee04@gmail.com" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{ scale: 1.2, y: -5 }}
              className="text-gray-400 hover:text-[#186F65] transition-colors duration-300"
            >
              <social.icon size={20} className="sm:w-6 sm:h-6" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#186F65] rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#186F65] rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const skills = [
    { name: "Frontend Development", level: 95, icon: Code },
    { name: "UI/UX Design", level: 88, icon: Palette },
    // { name: "Mobile Development", level: 85, icon: Smartphone },
    { name: "Backend Development", level: 90, icon: Database },
    { name: "Web Technologies", level: 92, icon: Globe },
  ];

  return (
    <section className="py-20 bg-[#111] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-[#186F65]">Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with a keen eye for design and a love for creating 
            seamless digital experiences. With expertise spanning modern web technologies, I bring 
            ideas to life through clean code and intuitive interfaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl border border-gray-800 hover:border-[#186F65] transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-[#186F65] rounded-lg">
                    <skill.icon size={20} className="text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm sm:text-base">{skill.name}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#186F65] to-[#B5CB99] h-2 rounded-full"
                  />
                </div>
                <span className="text-[#B5CB99] text-sm font-medium">{skill.level}%</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-gray-800"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">My Journey</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p>
                Started my journey in web development with a curiosity for how things work 
                behind the scenes. What began as tinkering with HTML and CSS evolved into 
                a deep passion for creating full-stack applications.
              </p>
              <p>
                Today, I specialize in modern JavaScript frameworks, cloud technologies, 
                and creating user experiences that not only look great but perform exceptionally.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open source projects, or sharing knowledge with the developer community.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#186F65]">5+</div>
                <div className="text-xs sm:text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#B5CB99]">2+</div>
                <div className="text-xs sm:text-sm text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#186F65]">100%</div>
                <div className="text-xs sm:text-sm text-gray-400">Passion</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Featured Project Section
const FeaturedProject = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // const [currentImage, setCurrentImage] = useState(0);
  // const projectImages = [
  //   "/jj/Screenshot 2025-09-01 222043.png",
  //   "/jj/Screenshot 2025-09-01 222058.png", 
  //   "/jj/Screenshot 2025-09-01 222120.png",
  //   "/jj/Screenshot 2025-09-01 222130.png",
  //   "/jj/Screenshot 2025-09-01 222203.png"
  // ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage((prev) => (prev + 1) % projectImages.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleVideoHover = (videoElement, shouldPlay) => {
    if (videoElement && !isMobile) {
      if (shouldPlay) {
        videoElement.currentTime = 0;
        videoElement.play().catch(console.error);
      } else {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }
  };

  const handleMobileVideoToggle = (videoElement) => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        setIsPlaying(false);
      } else {
        videoElement.currentTime = 0;
        videoElement.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  return (
    <section id="featured-project" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-[#186F65]">Project</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative w-full"
            onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector('video');
              handleVideoHover(video, true);
            }}
            onMouseLeave={(e) => {
              const video = e.currentTarget.querySelector('video');
              handleVideoHover(video, false);
            }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-gray-800 w-full">
              <video
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/jj.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Hover indicator for desktop */}
              {!isMobile && (
                <div className="absolute inset-0 bg-black/20 opacity-100 hover:opacity-0 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Hover to play video
                  </div>
                </div>
              )}
              
              {/* Mobile play/pause button */}
              {isMobile && (
                <button
                  onClick={(e) => {
                    const video = e.currentTarget.parentElement.querySelector('video');
                    handleMobileVideoToggle(video);
                  }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center group"
                >
                  <div className="bg-black/70 text-white p-4 rounded-full group-active:scale-95 transition-transform">
                    {isPlaying ? (
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-1 h-4 bg-white mr-1"></div>
                        <div className="w-1 h-4 bg-white"></div>
                      </div>
                    ) : (
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    )}
                  </div>
                </button>
              )}
            </div>
            
            {/* Hover instruction text for desktop */}
            {!isMobile && (
              <p className="text-center text-gray-400 text-sm mt-3">
                Hover over the video to see it in action
              </p>
            )}
            
            {/* Image indicator dots commented out */}
            {/* <div className="flex justify-center gap-2 mt-4">
              {projectImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={twMerge(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    currentImage === index ? "bg-[#186F65]" : "bg-gray-600"
                  )}
                />
              ))}
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Jhola Junction</h3>
              <p className="text-xl text-[#B5CB99] mb-6">
                E-commerce Platform for Jhola Bags and Pouches
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed">
              A bold, Gen-Z focused e-commerce platform for tote bags and accessories. I built it end-to-end with a clean, colorful UI, Supabase backend, secure Razorpay payments, and Shiprocket integration for order management and logistics. It includes real-time cart & wishlist, responsive design, and custom admin dashboard—showcasing my ability to deliver a full-stack, production-ready brand experience.
            </p>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Key Features:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-[#186F65]" />
                  Real-time inventory management
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-[#186F65]" />
                  Secure Razorpay payment integration
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-[#186F65]" />
                  Shiprocket logistics integration
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-[#186F65]" />
                  Advanced search and filtering
                </li>
                <li className="flex items-center gap-2">
                  <Star size={16} className="text-[#186F65]" />
                  Mobile-responsive design
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Supabase", "Tailwind CSS", "Shiprocket", "Razorpay"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#1a1a1a] border border-[#186F65] text-[#B5CB99] rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <motion.a
                href="https://www.jholajunction.in"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#186F65] to-[#B5CB99] text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 cursor-pointer"
              >
                Live Demo
                <ExternalLink size={16} />
              </motion.a>
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#186F65] text-[#186F65] px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#186F65] hover:text-white transition-all duration-300"
              >
                View Code
                <Github size={16} />
              </motion.button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Other Work Section
const OtherWork = () => {
  const [playingVideos, setPlayingVideos] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = [
    {
      id: 'jewelry',
      title: "Minimal Jewelry Brand",
      subtitle: "AURELIA",
      description: "An elegant e-commerce platform showcasing minimalist jewelry designs with sophisticated user experience",
      tech: ["Figma Mockup"],
      video: "/jewelry-demo.mp4",
      demoUrl: "https://post-bony-66192377.figma.site/",
    },
    {
      id: 'cafe',
      title: "Artsy Café",
      subtitle: "BREW & BLOOM", 
      description: "A vibrant café website featuring artistic ambiance, menu showcase, and seamless booking system",
      tech: ["Figma Mockup"],
      video: "/cafe-demo.mp4",
      demoUrl: "https://strong-clump-94022311.figma.site/",
    },
  ];

  const handleVideoHover = (videoElement, shouldPlay) => {
    if (videoElement && !isMobile) {
      if (shouldPlay) {
        videoElement.currentTime = 0;
        videoElement.play().catch(console.error);
      } else {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }
  };

  const handleMobileVideoToggle = (videoElement, projectId) => {
    if (videoElement) {
      const isPlaying = playingVideos[projectId];
      if (isPlaying) {
        videoElement.pause();
        setPlayingVideos(prev => ({ ...prev, [projectId]: false }));
      } else {
        videoElement.currentTime = 0;
        videoElement.play().catch(console.error);
        setPlayingVideos(prev => ({ ...prev, [projectId]: true }));
      }
    }
  };

  return (
    <section className="py-20 bg-[#111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Concept <span className="text-[#186F65]">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A collection of projects that showcase my versatility and passion for development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#186F65] transition-all duration-300 group w-full"
              onMouseEnter={(e) => {
                const video = e.currentTarget.querySelector('video');
                handleVideoHover(video, true);
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget.querySelector('video');
                handleVideoHover(video, false);
              }}
            >
              <div className="relative overflow-hidden">
                <video
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Desktop hover overlay */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Hover to play
                    </div>
                  </div>
                )}
                
                {/* Mobile play/pause button */}
                {isMobile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = e.currentTarget.parentElement.querySelector('video');
                      handleMobileVideoToggle(video, project.id);
                    }}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center group"
                  >
                    <div className="bg-black/70 text-white p-4 rounded-full group-active:scale-95 transition-transform">
                      {playingVideos[project.id] ? (
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="w-1 h-4 bg-white mr-1"></div>
                          <div className="w-1 h-4 bg-white"></div>
                        </div>
                      ) : (
                        <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                      )}
                    </div>
                  </button>
                )}
              </div>
              
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
                <h4 className="text-base sm:text-lg font-semibold text-[#186F65] mb-3">"{project.subtitle}"</h4>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#0a0a0a] text-[#B5CB99] rounded-full text-xs sm:text-sm border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[#186F65] hover:text-[#B5CB99] transition-colors duration-300 flex items-center gap-1 cursor-pointer text-sm sm:text-base"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </motion.a>
                  {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[#186F65] hover:text-[#B5CB99] transition-colors duration-300 flex items-center gap-1"
                  >
                    <Github size={16} />
                    Code
                  </motion.button> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Diya Shaw",
      role: "Founder at Jhola Junction",
      content: "Working with Siddhartha Chatterjee on the Jhola Junction website was such a wonderful experience. He really understood the vibe I wanted for the brand and brought it to life in the most creative way. The site feels fresh, easy to navigate, and truly represents what Jhola Junction stands for. Siddhartha was patient, open to ideas, and quick to make things happen — which made the whole process stress-free for me. I'm so grateful for his effort and creativity, and I couldn't be happier with the result.",
      avatar: "/diya.jpeg",
    },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What People <span className="text-[#186F65]">Say</span>
          </h2>
        </motion.div>

        <div className="flex justify-center">
          <div className="max-w-2xl">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-gray-800 hover:border-[#186F65] transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="sm:w-5 sm:h-5 text-[#B5CB99] fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-base sm:text-lg italic">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold text-base sm:text-lg">{testimonial.name}</div>
                    <div className="text-[#B5CB99] text-sm sm:text-base">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-[#111] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's <span className="text-[#186F65]">Connect</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <motion.a
                  href="mailto:siddharthachatterjee04@gmail.com"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-gray-300 hover:text-[#186F65] transition-colors duration-300"
                >
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-gray-800">
                    <Mail size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">Email</div>
                    <div className="text-xs sm:text-sm break-all">siddharthachatterjee04@gmail.com</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/siddhartha-chatterjee-b31894b3/"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-gray-300 hover:text-[#186F65] transition-colors duration-300"
                >
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-gray-800">
                    <Linkedin size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">LinkedIn</div>
                    <div className="text-xs sm:text-sm">Connect with me</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/sidd-chat"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-gray-300 hover:text-[#186F65] transition-colors duration-300"
                >
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-gray-800">
                    <Github size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">GitHub</div>
                    <div className="text-xs sm:text-sm">Check out my code</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white focus:border-[#186F65] focus:outline-none transition-colors duration-300 text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white focus:border-[#186F65] focus:outline-none transition-colors duration-300 text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2 text-sm sm:text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg text-white focus:border-[#186F65] focus:outline-none transition-colors duration-300 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-[#186F65] to-[#B5CB99] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                Send Message
                <Send size={16} className="sm:w-5 sm:h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Main Portfolio Component
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-inter overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <FeaturedProject />
      <OtherWork />
      <TestimonialsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 bg-[#0a0a0a] border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2025 Siddhartha Chatterjee. Crafted with passion and precision.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}