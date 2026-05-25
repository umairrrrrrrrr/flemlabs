import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X } from 'lucide-react';


interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  imageUrl: string;
  description: string;
}

const Portfolio: React.FC = () => {

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  
  // Dynamic artwork state
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: 'port-1',
      title: 'Neon Cyberpunk Knight Rigs',
      category: '3D Art & Modeling',
      client: 'Ascent Games LLC',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      description: 'Fully rigged modular PBR cybernetic suit and sword props optimized for Unity HDRP engines. Features 4K custom textures and neon emitting shaders.'
    },
    {
      id: 'port-2',
      title: 'Aether Fantasy Book Jacket',
      category: 'Illustration Services',
      client: 'Chronicle Press Pubs',
      year: '2026',
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-painted fantasy book cover illustration featuring intricate architectural spires and atmospheric lighting spreads. Typographic setting included in deliverables.'
    },
    {
      id: 'port-3',
      title: 'Pixel Forge Dungeon Tilesets',
      category: '2D Art & Game Design',
      client: 'IndieQuest Systems',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      description: 'Retro 16-bit dungeon environment background tile arrays, including animated hazards, lava flows, breakable chests, and isometric wall sets.'
    },
    {
      id: 'port-4',
      title: 'Geometric Tech Brand System',
      category: 'Graphic Design Services',
      client: 'Synapse Networks Ltd',
      year: '2026',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      description: 'Minimalist brand identity framework, including vector guidelines, dark custom typography layouts, corporate stationary templates, and logo guides.'
    },
    {
      id: 'port-5',
      title: 'Futuristic Streetwear Capsule',
      category: 'Merchandise Design',
      client: 'Vanguard Wear NYC',
      year: '2026',
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      description: 'Limited edition streetwear screen-print files, featuring original typography slogans and neon vector overlay prints matching post-cyberpunk motifs.'
    },
    {
      id: 'port-6',
      title: 'Orion Editorial layout catalog',
      category: 'Novel & Book Designing',
      client: 'Orion Literary Council',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
      description: 'High-end layout design of editorial content, typesetting fonts, custom border decals, and chapter markers tailored for boutique art book publications.'
    },
    {
      id: 'port-7',
      title: 'Hyper-realistic Cyberpunk Explosion',
      category: 'VFX',
      client: 'Neo-Tokyo Films',
      year: '2026',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      description: 'Procedural VFX system featuring realistic combustion physics, volume rendering, and particle interactions designed for cinematic live-action integration.'
    },
    {
      id: 'port-8',
      title: 'Abstract Dynamic HUD Interface',
      category: 'Motion Graphics',
      client: 'Quantum Dynamics',
      year: '2026',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      description: 'Bespoke 3D UI hud motion graphics design. Smooth interactive screen transitions and dynamic grid systems custom rendered for futuristic brand launches.'
    },
    {
      id: 'port-9',
      title: 'Cinematic Brand Anthology',
      category: 'Video Editing',
      client: 'Aura Luxury Group',
      year: '2025',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      description: 'High-rhythm cinematic commercial montage. Features advanced dynamic sound design, precision color grading, and custom narrative pacing.'
    }
  ]);

  const categories = [
    'All',
    '2D Art & Game Design',
    '3D Art & Modeling',
    'Illustration Services',
    'Graphic Design Services',
    'Merchandise Design',
    'Novel & Book Designing',
    'VFX',
    'Motion Graphics',
    'Video Editing'
  ];

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12">
      <motion.div
        className="max-w-7xl mx-auto w-full space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-cream/10 pb-8">
          <div>
            <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em] block">
              immersive visual showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mt-2">
              Curated Masterpieces.
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1 max-w-sm">
              Explore recent deliverables completed for high-end digital agency environments.
            </p>
          </div>
        </motion.div>

        {/* Filter categories list */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 justify-center py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-xs px-4 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-cream text-black font-semibold border-transparent shadow-[0_4px_12px_rgba(222,219,200,0.15)]'
                  : 'bg-surface-dark border-cream/10 text-gray-400 hover:text-cream hover:border-cream/30'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grid displays */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="glass-panel overflow-hidden rounded-2xl border border-cream/10 flex flex-col group cursor-pointer transition-all duration-500 hover:translate-y-[-4px]"
            >
              {/* Image panel with reveal overlay */}
              <div className="h-64 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-cream/15 border border-cream/30 flex items-center justify-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <Eye size={18} className="text-cream animate-pulse" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 border border-cream/15 rounded-full px-2.5 py-0.5 backdrop-blur-md">
                  <span className="text-[8px] text-cream uppercase font-bold tracking-widest">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Title coordinates */}
              <div className="p-5 bg-surface-dark/40 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-cream">{item.title}</h4>
                  <p className="text-xs text-gray-400 mt-2 font-light line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500 border-t border-cream/5 pt-3 mt-4">
                  <span>Client: {item.client}</span>
                  <span className="font-serif italic text-cream-dark">{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Deep Details Preview Modal overlay */}
        {selectedItem && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <div 
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            />
            <div className="relative glass-panel w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-cream/15 max-h-[90vh] flex flex-col animate-fade-in md:flex-row">
              {/* Left Side: Art frame */}
              <div className="md:w-3/5 h-64 md:h-auto overflow-hidden relative bg-black flex items-center justify-center">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
              </div>

              {/* Right Side: Specifications details */}
              <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-none">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-cream uppercase font-bold tracking-widest border border-cream/25 px-2 py-0.5 rounded-full">
                        {selectedItem.category}
                      </span>
                      <h3 className="text-xl font-bold text-cream mt-2">{selectedItem.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-500 hover:text-cream transition-colors p-1"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="border-t border-cream/10 pt-4 mt-6 space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500">Commission Client:</span>
                    <span className="text-cream font-medium">{selectedItem.client}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500">Production Year:</span>
                    <span className="text-cream font-medium">{selectedItem.year}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-500">Escrow Security:</span>
                    <span className="text-emerald-400 font-medium">Logged on Ethereum</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Portfolio;
