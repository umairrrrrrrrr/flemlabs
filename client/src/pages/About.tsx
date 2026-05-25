import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Award, Compass, Eye } from 'lucide-react';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
 
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };
 
  return (
    <div className="relative min-h-screen bg-black pt-32 pb-24 px-6 md:px-12">
      {/* Soft spotlight backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cream/3 blur-[150px] rounded-full pointer-events-none" />
 
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-20"
        >
          {/* Header section */}
          <motion.div variants={itemVariants} className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-[10px] text-cream font-bold tracking-[0.3em] uppercase">
              The Story
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-cream animate-fade-in">
              We just love making beautiful digital things.
            </h1>
            <p className="text-xs text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
              No complex corporate structures or heavy tech jargon—just a group of designers, artists, and modelers working together to make your ideas look premium, clean, and authentic.
            </p>
          </motion.div>
 
          {/* Philosophy / Story grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="glass-panel p-8 md:p-12 rounded-3xl space-y-6 border border-cream/10">
              <div className="inline-flex w-10 h-10 bg-cream/5 border border-cream/20 rounded-full items-center justify-center">
                <Eye className="text-cream" size={20} />
              </div>
              <h3 className="text-2xl font-bold text-cream font-serif italic">
                How we think about design
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                At flem, we believe digital art should be more than just filler on a screen—it should make a statement. Whether we are drawing a custom cover illustration, crafting low-poly game assets, or designing a clean brand system, we put real care and detail into every single project.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                We reject boring templates and generic shortcuts. Every asset we make is custom-built, carefully arranged, and finished with organic colors and natural lighting to ensure your project stands out.
              </p>
            </div>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface-dark border border-cream/5 p-6 rounded-2xl space-y-3">
                <Award className="text-cream" size={24} />
                <h4 className="text-base font-bold text-cream">Elite Production</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Over 30 customized services including 3D model rigs, visual assets, and premium typography layouts.
                </p>
              </div>
              <div className="bg-surface-dark border border-cream/5 p-6 rounded-2xl space-y-3">
                <ShieldCheck className="text-cream" size={24} />
                <h4 className="text-base font-bold text-cream">Full Commercial Rights</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Every commission includes complete global commercial copyright ownership and layered source files.
                </p>
              </div>
              <div className="bg-surface-dark border border-cream/5 p-6 rounded-2xl space-y-3">
                <Compass className="text-cream" size={24} />
                <h4 className="text-base font-bold text-cream">Seamless Experience</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Enjoy real-time timeline tracking updates, simple Web3 payments, and direct communication.
                </p>
              </div>
              <div className="bg-surface-dark border border-cream/5 p-6 rounded-2xl space-y-3">
                <MapPin className="text-cream" size={24} />
                <h4 className="text-base font-bold text-cream">Grounded Presence</h4>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Our main visual design and development office is located directly in NYC's creative hub.
                </p>
              </div>
            </div>
          </motion.div>
 
          {/* Google Maps / Office Location section */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pt-8">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold text-cream">Our Office Headquarters</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Our main creative district office is always open for layout reviews, asset consultations, and direct briefings.
              </p>
              <div className="space-y-2 text-xs text-gray-500 font-medium pt-2">
                <p className="flex items-center gap-2">
                  <MapPin size={14} className="text-cream" />
                  Air University E-9 Islamabad, Pakistan
                </p>
                <p>Email: muhammadumairshake@gmail.com</p>
                <p>Phone: +92 344 2226667</p>
              </div>
            </div>
 
            {/* OpenStreetMap embed pointing at Air University Islamabad */}
            <div className="lg:col-span-2 glass-panel h-80 rounded-2xl overflow-hidden border border-cream/10 relative group">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.1376%2C33.6259%2C73.1776%2C33.6659&layer=mapnik&marker=33.6459%2C73.1576"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)', position: 'absolute', inset: 0 }}
                loading="lazy"
                title="Air University Islamabad Map"
              />
              {/* Interaction blocker — locks map from panning/zooming */}
              <div className="absolute inset-0 z-10 cursor-default" style={{ pointerEvents: 'all' }} />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent pointer-events-none z-20" />
              {/* GPS Pin label overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 bg-cream text-black rounded-full flex items-center justify-center shadow-[0_0_25px_#DEDBC8] animate-bounce">
                    <MapPin size={20} />
                  </div>
                  <div className="bg-black/90 border border-cream/20 rounded-xl px-4 py-2 mt-3 text-center shadow-2xl backdrop-blur-md">
                    <span className="text-[10px] text-cream uppercase font-bold tracking-widest block">
                      flemlabs
                    </span>
                    <span className="text-[9px] text-gray-400 font-light block mt-0.5">
                      Islamabad, Pakistan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
