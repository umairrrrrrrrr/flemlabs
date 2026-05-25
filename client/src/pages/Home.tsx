import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Compass, ShieldCheck, ChevronDown, Award, Star, Eye } from 'lucide-react';
import heroBgVideo from '../11234.mp4';

const Home: React.FC = () => {
  // Framer Motion reveal configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const wordRevealVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const pillars = [
    {
      title: 'Visual Storytelling',
      desc: 'Forging immersive high-fidelity digital art, book covers, and concept assets configured to trigger emotional connection.',
      count: '01'
    },
    {
      title: 'VFX',
      desc: 'Cinematic visual effects, particle simulations, and compositing that bring your scenes to life with next-level motion and depth.',
      count: '02'
    },
    {
      title: 'Cinematic Branding',
      desc: 'Sleek geometric logo systems, vector apparel templates, and typography setting matching boutique agency guides.',
      count: '03'
    }
  ];

  const featuredWorks = [
    {
      title: 'Neon Cyberpunk Knight Rig',
      category: '3D Art & Modeling',
      img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      client: 'Ascent Games LLC'
    },
    {
      title: 'Kinetic Brand Reveal',
      category: 'Motion Graphics',
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      client: 'Luminary Creative Co.'
    },
    {
      title: 'Pixel Forge Dungeon Tileset',
      category: '2D Art & Game Design',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      client: 'IndieQuest Systems'
    }
  ];

  const reviewsRow1 = [
    {
      text: "Pinnacle of digital craftsmanship. Mesh topology is exceptionally clean.",
      author: "Vanguard Studios",
      rating: 5
    },
    {
      text: "Stunning 3D models, exceeded all project asset constraints.",
      author: "Chronos Pubs",
      rating: 5
    },
    {
      text: "Their custom shaders and lighting spreads are incredibly premium.",
      author: "Aether Concept Lab",
      rating: 5
    },
    {
      text: "A complete masterclass in cinematic artwork layout and curation.",
      author: "Orion Literary",
      rating: 5
    },
    {
      text: "Escrow safe commissions gave us absolute peace of mind during delivery.",
      author: "Synapse Networks",
      rating: 5
    }
  ];

  const reviewsRow2 = [
    {
      text: "Immersive visual stories that immediately trigger emotional connections.",
      author: "Kaelen Thorne",
      rating: 5
    },
    {
      text: "Remarkable character rigging. Standard-setting visual pipeline.",
      author: "Horizon Games",
      rating: 5
    },
    {
      text: "The low-poly environment assets are optimized flawlessly for Unity.",
      author: "Ember Studio",
      rating: 5
    },
    {
      text: "Bespoke screen-prints and typography layout of the highest caliber.",
      author: "Nova Wear NYC",
      rating: 5
    },
    {
      text: "A creative partner that consistently wows our production leads.",
      author: "Ascent Games",
      rating: 5
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-cream-light overflow-x-hidden">
      
      {/* =================================================== */}
      {/* SECTION 1: HERO VIEWPORT */}
      {/* =================================================== */}
      <section className="relative min-h-screen flex flex-col justify-end p-6 md:p-12 pb-20 md:pb-28 overflow-hidden border-b border-cream/5">
        
        {/* Background Layer: Rich warm mesh gradient + Large Ambient Spotlights */}
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#0b0a09] via-[#050505] to-black">
          {/* Ambient Spotlight Blur Bulbs */}
          <div className="absolute top-[35%] left-[25%] -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#6366f1]/8 blur-[100px] sm:blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-cream/4 blur-[90px] sm:blur-[140px] rounded-full pointer-events-none" />
          
          {/* Video element */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-5 filter brightness-[0.75] contrast-[1.05] opacity-95"
            src={heroBgVideo}
          >
            <source src={heroBgVideo} type="video/mp4" />
          </video>

          {/* Cinematic Gradients overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/45 z-10" />
          <div className="absolute inset-0 vignette-overlay z-10" />
        </div>

        {/* Floating particles background placeholder */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cream/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0.1, 0.6, 0.1]
              }}
              transition={{
                duration: 7 + Math.random() * 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Hero Content (Lower compact cinematic layout) */}
        <div className="relative z-30 max-w-7xl mx-auto w-full text-left pt-24 pb-4 flex flex-col items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Large Typographic Title */}
            <motion.div variants={itemVariants} className="overflow-hidden pb-1 pt-1">
              <h1 
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}
                className="text-5xl sm:text-6xl md:text-7xl xl:text-[7.5rem] tracking-tight text-cream leading-[0.85] select-none flex flex-wrap lowercase"
              >
                {["f", "l", "e", "m", "l", "a", "b", "s"].map((char, index) => (
                  <span key={index} className="overflow-hidden inline-block">
                    <motion.span
                      className="inline-block"
                      variants={wordRevealVariants}
                      custom={index}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </motion.div>

            {/* Subtitle & Description */}
            <div className="max-w-2xl mt-1 sm:mt-1.5 space-y-2">
              <motion.h2 
                variants={itemVariants} 
                className="text-lg sm:text-xl md:text-2xl font-serif italic text-cream-dark"
              >
                Turning imagination into unforgettable digital experiences.
              </motion.h2>
              <motion.p 
                variants={itemVariants} 
                className="text-xs sm:text-[13px] text-gray-400 leading-relaxed font-light"
              >
                Flemlabs is a premium creative studio specializing in concept art, motion graphics, vfx, and high-end web solutions.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-5 sm:mt-6">
              <Link
                to="/services"
                className="group bg-cream hover:bg-cream-light text-black font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full flex items-center gap-2 border border-transparent shadow-[0_4px_25px_rgba(222,219,200,0.15)] hover:shadow-[0_4px_35px_rgba(222,219,200,0.4)] transition-all duration-500 transform hover:scale-[1.03]"
              >
                <Compass size={14} className="group-hover:rotate-45 transition-transform duration-500" />
                Explore Services
              </Link>
              <Link
                to="/portfolio"
                className="group bg-surface-dark/40 hover:bg-cream/10 text-cream font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full flex items-center gap-2 border border-cream/20 hover:border-cream/45 backdrop-blur-md transition-all duration-500 transform hover:scale-[1.03]"
              >
                <Play size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                View Portfolio
                <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-[10px] tracking-widest font-medium animate-pulse select-none z-30">
          <span>SCROLL DOWN</span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* =================================================== */}
      {/* SECTION 2: GLOWING TEXT TICKER / MARQUEE */}
      {/* =================================================== */}
      <section className="bg-black py-8 border-y border-cream/5 overflow-hidden relative select-none">
        <div className="flex whitespace-nowrap gap-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-cream-dark/50">
          <div className="flex animate-marquee-loop items-center gap-10">
            <span>Concept Art</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Character modeling</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Streetwear Apparel</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Typesetting Typography</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Modular prop rigs</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Book cover layout</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
          </div>
          <div className="flex animate-marquee-loop items-center gap-10" aria-hidden="true">
            <span>Concept Art</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Character modeling</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Streetwear Apparel</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Typesetting Typography</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Modular prop rigs</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
            <span>Book cover layout</span> <span className="w-1.5 h-1.5 rounded-full bg-cream" />
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* SECTION 3: THE THREE ATELIER PILLARS */}
      {/* =================================================== */}
      <section className="py-24 px-6 md:px-12 relative max-w-7xl mx-auto w-full">
        {/* Spot blur bulb */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-cream/3 blur-[120px] rounded-full pointer-events-none" />

        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em]">
              Creative Core Pillars
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-cream">
              Sculpting High-End Assets.
            </h2>
            <p className="text-xs text-gray-500 font-light max-w-md mx-auto">
              Our studio structures visual foundations across illustration, 3D retopologies, and vector systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pil, idx) => (
              <div 
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-cream/10 space-y-6 hover:border-cream/30 hover:bg-surface-light/20 transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <span className="text-sm font-serif italic text-cream-dark font-bold block">{pil.count}</span>
                  <h4 className="text-lg font-bold text-cream group-hover:text-cream-light transition-colors">{pil.title}</h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{pil.desc}</p>
                </div>
                <div className="pt-8 border-t border-cream/5 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  <span>Escrow Safe commissions</span>
                  <ChevronDown size={12} className="-rotate-90 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* SECTION 4: MINI SHOWCASE REEL */}
      {/* =================================================== */}
      <section className="py-20 px-6 md:px-12 bg-surface-dark/15 border-y border-cream/5 relative">
        <div className="max-w-7xl mx-auto w-full space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-cream/10">
            <div>
              <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em] block">
                Some of our work
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-cream mt-1">
                Stuff we're proud of.
              </h2>
            </div>
            <Link 
              to="/portfolio" 
              className="text-xs font-bold text-cream hover:underline flex items-center gap-1 group"
            >
              See everything →
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorks.map((work, idx) => (
              <Link 
                key={idx}
                to="/portfolio"
                className="glass-panel overflow-hidden rounded-2xl border border-cream/10 flex flex-col group transition-all duration-500 hover:scale-[1.01]"
              >
                <div className="h-56 overflow-hidden relative bg-black">
                  <img 
                    src={work.img} 
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1.5s] filter grayscale contrast-[1.05] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-4 left-4 bg-black/60 border border-cream/15 rounded-full px-2.5 py-0.5 backdrop-blur-md">
                    <span className="text-[8px] text-cream uppercase font-bold tracking-widest">
                      {work.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 bg-surface-dark/40 flex-1 flex flex-col justify-between">
                  <h4 className="text-sm font-bold text-cream">{work.title}</h4>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 border-t border-cream/5 pt-3 mt-4">
                    <span>Client: {work.client}</span>
                    <span className="font-serif italic text-cream-dark">2026</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* SECTION 5: HORIZONTAL SLIDING DUAL REVIEWS TICKER */}
      {/* =================================================== */}
      <section className="py-24 relative overflow-hidden select-none bg-gradient-to-b from-black to-[#050505] border-t border-cream/5">
        {/* Soft atmospheric gradient blur spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-cream/3 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center space-y-4 relative z-10">
          <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em]">
            What people are saying
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-cream">
            Real words from real clients.
          </h2>
          <p className="text-xs text-gray-500 font-light max-w-md mx-auto">
            Don't take our word for it — here's what the people we've worked with actually think.
          </p>
        </div>

        {/* Sliding Rows Containers */}
        <div className="relative space-y-8 w-full z-10 py-4">
          
          {/* Fading Edge overlays (Mask effect) */}
          <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-black to-transparent z-[25] pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-black to-transparent z-[25] pointer-events-none" />

          {/* ROW 1: LEFT SLIDING MARQUEE */}
          <div className="flex whitespace-nowrap gap-6 w-full overflow-hidden py-2">
            <div className="flex gap-6 animate-marquee-loop flex-shrink-0">
              {reviewsRow1.map((rev, idx) => (
                <div 
                  key={idx}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-cream/10 w-[300px] sm:w-[350px] flex-shrink-0 space-y-3.5 hover:border-cream/35 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-cream-dark uppercase tracking-widest font-bold font-serif italic">
                      {rev.author}
                    </span>
                    <div className="flex gap-0.5 text-yellow-500/80">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={10} fill="#DEDBC8" stroke="#DEDBC8" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-normal line-clamp-2 h-10 select-none">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
            {/* Duplicated for seamless loop */}
            <div className="flex gap-6 animate-marquee-loop flex-shrink-0" aria-hidden="true">
              {reviewsRow1.map((rev, idx) => (
                <div 
                  key={`dup-${idx}`}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-cream/10 w-[300px] sm:w-[350px] flex-shrink-0 space-y-3.5 hover:border-cream/35 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-cream-dark uppercase tracking-widest font-bold font-serif italic">
                      {rev.author}
                    </span>
                    <div className="flex gap-0.5 text-yellow-500/80">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={10} fill="#DEDBC8" stroke="#DEDBC8" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-normal line-clamp-2 h-10 select-none">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 2: RIGHT SLIDING MARQUEE (REVERSE) */}
          <div className="flex whitespace-nowrap gap-6 w-full overflow-hidden py-2">
            <div className="flex gap-6 animate-marquee-loop-reverse flex-shrink-0">
              {reviewsRow2.map((rev, idx) => (
                <div 
                  key={idx}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-cream/10 w-[300px] sm:w-[350px] flex-shrink-0 space-y-3.5 hover:border-cream/35 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-cream-dark uppercase tracking-widest font-bold font-serif italic">
                      {rev.author}
                    </span>
                    <div className="flex gap-0.5 text-yellow-500/80">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={10} fill="#DEDBC8" stroke="#DEDBC8" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-normal line-clamp-2 h-10 select-none">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
            {/* Duplicated for seamless loop */}
            <div className="flex gap-6 animate-marquee-loop-reverse flex-shrink-0" aria-hidden="true">
              {reviewsRow2.map((rev, idx) => (
                <div 
                  key={`dup-${idx}`}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-cream/10 w-[300px] sm:w-[350px] flex-shrink-0 space-y-3.5 hover:border-cream/35 transition-colors duration-300"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-cream-dark uppercase tracking-widest font-bold font-serif italic">
                      {rev.author}
                    </span>
                    <div className="flex gap-0.5 text-yellow-500/80">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={10} fill="#DEDBC8" stroke="#DEDBC8" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed whitespace-normal line-clamp-2 h-10 select-none">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =================================================== */}
      {/* SECTION 6: THE ESCROW INVITATION CTA */}
      {/* =================================================== */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto w-full pb-32">
        <div className="glass-panel p-8 md:p-16 rounded-3xl border border-cream/20 text-center relative overflow-hidden flex flex-col items-center gap-6 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -bottom-20 w-[450px] h-[150px] bg-cream/5 blur-[80px] rounded-full pointer-events-none" />
          
          <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em] flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-cream" /> COLLABORATE WITH THE STUDIO
          </span>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-cream font-serif italic">
            Let's bring your vision to life.
          </h3>
          <p className="text-xs text-gray-400 font-light max-w-md leading-relaxed">
            Share your project requirements, assets specifications, or print ideas, and start a custom project with Flemlabs today.
          </p>
          <Link
            to="/orders"
            className="bg-cream hover:bg-cream-light text-black font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-[0_4px_25px_rgba(222,219,200,0.2)] transition-all duration-300 transform hover:scale-[1.03] mt-2 inline-block"
          >
            Let's build something →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
