import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Service } from '../types';
import { Loader2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Unified fallback seed data if backend API is not loaded yet
  const fallbackServices: Service[] = [
    {
      _id: 'fallback-vfx',
      name: 'Cinematic VFX & Dynamics',
      category: 'VFX',
      description: 'Advanced volume rendering, combustion simulations, and custom particle interactions built for high-end digital film compositions.',
      prices: { basic: 120, standard: 280, pro: 550 },
      features: {
        basic: ['1 cinematic visual effect asset', 'Volume rendering in USD format', '3 revision requests', '4-day delivery'],
        standard: ['Set of 3 modular simulation assets', 'High-res volumetric textures', '5 revision requests', '8-day delivery'],
        pro: ['Full cinematic dynamic sequence', 'Custom simulation cache + source scene', 'Unlimited revisions', '14-day delivery']
      },
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-motion',
      name: 'Abstract 3D Motion Graphics',
      category: 'Motion Design',
      description: 'Elite dynamic UI screens, modular hud designs, and smooth abstract graphic loops for immersive screen presentations.',
      prices: { basic: 90, standard: 200, pro: 420 },
      features: {
        basic: ['1 HUD interface screen loop (1080p)', 'Clean vector lines asset', '3 revision requests', '3-day delivery'],
        standard: ['Set of 3 dynamic motion assets', '4K high-res video rendering', '5 revision requests', '6-day delivery'],
        pro: ['Complete interactive UI hud system', 'Source project formats (AE/C4D)', 'Unlimited revisions', '10-day delivery']
      },
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-editing',
      name: 'High-Rhythm Commercial Editing',
      category: 'Video Editing',
      description: 'Bespoke narrative color-grading, rhythmic audio-visual syncing, and dynamic montage pacing tailored for luxury brands.',
      prices: { basic: 100, standard: 220, pro: 450 },
      features: {
        basic: ['Commercial video cut under 30s', 'Narrative pacing + sound mixing', '3 revision requests', '3-day delivery'],
        standard: ['Refined luxury montage under 90s', 'Precision color grading + audio design', '5 revision requests', '6-day delivery'],
        pro: ['Full master campaign commercial', 'Project timelines + high-res outputs', 'Unlimited revisions', '10-day delivery']
      },
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-pixel',
      name: 'Pixel Art character design & sprites',
      category: '2D Art & Game Design',
      description: 'High-quality retro-styled pixel art character sprites, background tilesheets, and fluid animations for game engines.',
      prices: { basic: 45, standard: 95, pro: 180 },
      features: {
        basic: ['1 character sprite (32x32px)', '3 revision requests', '2-day delivery time', 'Personal license rights'],
        standard: ['3 character sprites (64x64px)', 'Includes idle/walk sprite sheets', '5 revision requests', '5-day delivery time', 'Commercial use license'],
        pro: ['Full game asset pack', 'Custom loop sprite sheets & animations', 'Unlimited revisions', '8-day delivery time', 'Exclusive commercial copyright ownership']
      },
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-anime',
      name: 'Anime & Character Concept Illustration',
      category: '2D Art & Game Design',
      description: 'Premium Anime & cartoon style conceptual work for novel adaptations, webcomics, avatars, and character branding panels.',
      prices: { basic: 80, standard: 150, pro: 280 },
      features: {
        basic: ['Half-body character sketch (flat color)', '3 revisions', '3-day delivery', 'Personal use'],
        standard: ['Full-body detailed cell-shaded illustration', 'High-res source file included', '5 revisions', '6-day delivery', 'Commercial use rights'],
        pro: ['Premium fully-rendered illustration with environment background', 'Source file + separation layers', 'Unlimited revisions', '10-day delivery', 'Full commercial exclusivity']
      },
      imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-props',
      name: 'Low-Poly 3D Props & Assets',
      category: '3D Art & Modeling',
      description: 'Optimized, modular low-poly props, weapons, and environment assets ready for integration into Unity, Unreal, or WebGL.',
      prices: { basic: 50, standard: 120, pro: 250 },
      features: {
        basic: ['1 game prop model', 'OBJ/FBX formats', '3 revisions', '3-day delivery', 'Commercial use'],
        standard: ['Set of 5 modular props', 'Hand-painted UV textures included', '5 revisions', '6-day delivery', 'Commercial use'],
        pro: ['Full environment prop pack (15 items)', 'PBR materials + optimized source formats', 'Unlimited revisions', '10-day delivery', 'Full copyright transfer']
      },
      imageUrl: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-character',
      name: 'High-Fidelity 3D Character Model',
      category: '3D Art & Modeling',
      description: 'High-res stylized or semi-realistic character model optimized for video games, VR avatars, or animated cinematic reels.',
      prices: { basic: 150, standard: 350, pro: 650 },
      features: {
        basic: ['Sculpted character base mesh', 'T-pose files', '3 revisions', '5-day delivery', 'Commercial license'],
        standard: ['Fully detailed mesh with clean UV wrapping & retopology', 'Basic skeletal rigging included', '5 revisions', '12-day delivery', 'Commercial license'],
        pro: ['Premium fully rigged & skinned model', 'Blendshapes for facial expressions + PBR textures', 'Unlimited revisions', '20-day delivery', 'Exclusive intellectual property rights']
      },
      imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-cover',
      name: 'Book & Fantasy Novel Cover Illustration',
      category: 'Illustration Services',
      description: 'Bespoke conceptual fantasy and sci-fi narrative paintings custom crafted for digital and paperback cover publication layouts.',
      prices: { basic: 100, standard: 220, pro: 450 },
      features: {
        basic: ['Single front cover layout design', '2 sketch revisions', '5-day delivery', 'Personal distribution rights'],
        standard: ['Wrap-around paperback cover (front, spine, back)', 'Integrated professional typography styling', '5 revisions', '9-day delivery', 'Commercial print licensing'],
        pro: ['Premium cover illustration + promo asset banners', 'PSD source + high-fidelity digital files', 'Unlimited revisions', '14-day delivery', 'Exclusive publishing global rights']
      },
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-branding',
      name: 'Cinematic Minimalist Branding & Logo System',
      category: 'Graphic Design Services',
      description: 'Elite geometric logo sets, typography, and cohesive brand systems for creative agencies and high-end portfolios.',
      prices: { basic: 60, standard: 130, pro: 300 },
      features: {
        basic: ['2 unique vector logo concepts', 'High-res transparent PNG files', '3 revisions', '3-day delivery', 'Personal use'],
        standard: ['4 refined brand concepts + full vector package (AI/SVG)', 'Brand color palette guide', '5 revisions', '5-day delivery', 'Commercial trademark rights'],
        pro: ['Full master logo kit & dynamic style guide catalog', 'Social media kit + corporate stationeries', 'Unlimited revisions', '8-day delivery', 'Full copyright ownership']
      },
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-streetwear',
      name: 'Limited-Edition Streetwear Apparel Design',
      category: 'Merchandise Design',
      description: 'Premium apparel graphics, streetwear vector designs, and customized layouts built for screen-print or dropship brands.',
      prices: { basic: 40, standard: 90, pro: 200 },
      features: {
        basic: ['1 typography concept', 'High-res mockup preview', '2 revisions', '3-day delivery', 'Personal use'],
        standard: ['2 graphic illustrations ready for screen-print (PNG/vector)', 'Source files + flat vector print-outs', '5 revisions', '5-day delivery', 'Commercial usage'],
        pro: ['Premium merchandise collection kit (3 coordinated designs)', 'Full vector files + production technical worksheets', 'Unlimited revisions', '8-day delivery', 'Commercial copyright ownership']
      },
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    },
    {
      _id: 'fallback-layout',
      name: 'Premium Editorial Layout & Typography Design',
      category: 'Novel & Book Designing',
      description: 'Luxury modern print layouts, page typography typesetting, drop caps, and chapter headings for novels, booklets, or portfolios.',
      prices: { basic: 75, standard: 160, pro: 350 },
      features: {
        basic: ['Book formatting for up to 50 pages', 'PDF ready-for-print files', '3 revisions', '4-day delivery', 'Commercial rights'],
        standard: ['Full book interior design typesetting (up to 200 pages)', 'InDesign source formats + custom page stylings', '5 revisions', '8-day delivery', 'Commercial rights'],
        pro: ['Bespoke high-end custom layout + catalog typography setting', 'Epub formatting + unlimited book size packaging', 'Unlimited revisions', '12-day delivery', 'Exclusive digital distribution rights']
      },
      imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setServices(data);
          } else {
            setServices(fallbackServices);
          }
        } else {
          setServices(fallbackServices);
        }
      } catch (err) {
        console.warn('Could not contact API services, falling back to cached local data structures.', err);
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Categorize services
  const categories = [
    'VFX',
    'Motion Design',
    'Video Editing',
    '2D Art & Game Design',
    '3D Art & Modeling',
    'Illustration Services',
    'Graphic Design Services',
    'Merchandise Design',
    'Novel & Book Designing'
  ];

  const handleCommissionClick = (serviceId: string, tier: 'Basic' | 'Standard' | 'Pro') => {
    navigate('/orders', { state: { preSelectedServiceId: serviceId, preSelectedTier: tier } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-cream" size={40} />
      </div>
    );
  }

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
        className="max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Title */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em]">
            What we do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream">
            Explore our creative services.
          </h2>
          <p className="text-xs text-gray-500 font-light max-w-md mx-auto leading-relaxed">
            Pick a category below to explore our services. We offer simple, standard packages for Basic, Standard, or Pro tiers so you get exactly what you need without any complexity.
          </p>
        </motion.div>

        {/* Categories Toggles list */}
        <motion.div variants={itemVariants} className="space-y-24">
          {categories.map((category) => {
            const filteredServices = services.filter(s => s.category === category);
            if (filteredServices.length === 0) return null;

            return (
              <div key={category} className="space-y-8">
                <div className="border-b border-cream/10 pb-4">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-cream">
                    {category}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredServices.map((service, idx) => (
                    <motion.div
                      key={service._id || service.id}
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="glass-panel overflow-hidden rounded-2xl flex flex-col md:flex-row group border border-cream/10"
                    >
                      {/* Image Thumbnail with zoom hover */}
                      <div className="md:w-2/5 h-48 md:h-auto overflow-hidden relative">
                        <img 
                          src={service.imageUrl} 
                          alt={service.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] filter contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/20 to-transparent opacity-90" />
                        <div className="absolute top-4 left-4 bg-black/60 border border-cream/15 rounded-full px-3 py-1 backdrop-blur-md">
                          <span className="text-[9px] text-cream uppercase font-bold tracking-widest">
                            From ${service.prices.basic}
                          </span>
                        </div>
                      </div>

                      {/* Service Specs Details */}
                      <div className="md:w-3/5 p-6 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h4 className="text-lg font-bold text-cream group-hover:text-cream-light transition-colors">
                            {service.name}
                          </h4>
                          <p className="text-xs text-gray-400 font-light leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {/* Interactive Price select buttons inside the card */}
                        <div className="mt-6 space-y-4">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <button
                              onClick={() => handleCommissionClick(service._id || service.id || '', 'Basic')}
                              className="bg-surface-dark hover:bg-cream/10 border border-cream/10 rounded-lg p-2 transition-all group/tier"
                            >
                              <span className="text-[10px] text-gray-500 uppercase block font-medium">Basic</span>
                              <span className="text-xs text-cream font-bold block">${service.prices.basic}</span>
                            </button>
                            <button
                              onClick={() => handleCommissionClick(service._id || service.id || '', 'Standard')}
                              className="bg-surface-dark hover:bg-cream/10 border border-cream/10 rounded-lg p-2 transition-all"
                            >
                              <span className="text-[10px] text-gray-500 uppercase block font-medium">Standard</span>
                              <span className="text-xs text-cream font-bold block">${service.prices.standard}</span>
                            </button>
                            <button
                              onClick={() => handleCommissionClick(service._id || service.id || '', 'Pro')}
                              className="bg-surface-dark hover:bg-cream/10 border border-cream/10 rounded-lg p-2 transition-all"
                            >
                              <span className="text-[10px] text-gray-500 uppercase block font-medium">Pro</span>
                              <span className="text-xs text-cream font-bold block">${service.prices.pro}</span>
                            </button>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1">
                            <span className="flex items-center gap-1">
                              <ShieldCheck size={12} className="text-cream" /> Custom PSDs + Rig formats
                            </span>
                            <span className="flex items-center gap-1 font-serif italic text-cream-dark">
                              <Zap size={11} className="text-cream-dark" /> Quick delivery
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;
