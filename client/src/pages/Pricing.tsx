import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Service } from '../types';
import { Loader2, Check, HelpCircle, Shield, Award, Sparkles } from 'lucide-react';

const Pricing: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fallbackServices: Service[] = [
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
      imageUrl: ''
    },
    {
      _id: 'fallback-character',
      name: 'High-Fidelity 3D Character Model',
      category: '3D Art & Modeling',
      description: 'High-res stylized or semi-realistic character model optimized for video games, VR avatars, or animated cinematic reels.',
      prices: { basic: 150, standard: 350, pro: 650 },
      features: {
        basic: ['Sculpted character base mesh', 'T-pose files', '3 revisions', '5-day delivery', 'Commercial license'],
        standard: ['Fully detailed mesh with clean UV wrapping & retopology', 'Rigged skeletal armature included', '5 revisions', '12-day delivery', 'Commercial license'],
        pro: ['Premium fully rigged & skinned model', 'Blendshapes for facial expressions + PBR textures', 'Unlimited revisions', '20-day delivery', 'Exclusive intellectual property rights']
      },
      imageUrl: ''
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
      imageUrl: ''
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
            setSelectedService(data[0]);
          } else {
            setServices(fallbackServices);
            setSelectedService(fallbackServices[0]);
          }
        } else {
          setServices(fallbackServices);
          setSelectedService(fallbackServices[0]);
        }
      } catch (err) {
        setServices(fallbackServices);
        setSelectedService(fallbackServices[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleSelectServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const service = services.find(s => s._id === e.target.value || s.id === e.target.value);
    if (service) {
      setSelectedService(service);
    }
  };

  const handleCommissionClick = (tier: 'Basic' | 'Standard' | 'Pro') => {
    if (!selectedService) return;
    navigate('/orders', {
      state: {
        preSelectedServiceId: selectedService._id || selectedService.id,
        preSelectedTier: tier
      }
    });
  };

  if (loading || !selectedService) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-cream" size={40} />
      </div>
    );
  }

  const packages = [
    {
      name: 'Basic Package',
      tier: 'Basic' as const,
      price: selectedService.prices.basic,
      icon: Shield,
      features: selectedService.features.basic || [],
      delivery: selectedService.features.basic?.find(f => f.toLowerCase().includes('delivery')) || '3-day delivery',
      revisions: selectedService.features.basic?.find(f => f.toLowerCase().includes('revision')) || '3 revisions',
      rights: selectedService.features.basic?.find(f => f.toLowerCase().includes('right') || f.toLowerCase().includes('license')) || 'Personal use rights'
    },
    {
      name: 'Standard Studio',
      tier: 'Standard' as const,
      price: selectedService.prices.standard,
      icon: Award,
      features: selectedService.features.standard || [],
      delivery: selectedService.features.standard?.find(f => f.toLowerCase().includes('delivery')) || '5-day delivery',
      revisions: selectedService.features.standard?.find(f => f.toLowerCase().includes('revision')) || '5 revisions',
      rights: selectedService.features.standard?.find(f => f.toLowerCase().includes('right') || f.toLowerCase().includes('license')) || 'Commercial license'
    },
    {
      name: 'Pro Sovereign',
      tier: 'Pro' as const,
      price: selectedService.prices.pro,
      icon: Sparkles,
      features: selectedService.features.pro || [],
      delivery: selectedService.features.pro?.find(f => f.toLowerCase().includes('delivery')) || '10-day delivery',
      revisions: selectedService.features.pro?.find(f => f.toLowerCase().includes('revision')) || 'Unlimited revisions',
      rights: selectedService.features.pro?.find(f => f.toLowerCase().includes('right') || f.toLowerCase().includes('license')) || 'Exclusive copyright transfer'
    }
  ];

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
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em]">
            Simple & Honest Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream">
            Choose the right plan for your vision.
          </h2>
          <p className="text-xs text-gray-500 font-light max-w-md mx-auto leading-relaxed">
            Select a service below to explore our standard tiers. No hidden fees or licensing runarounds—just straightforward, simple rates for premium creative output.
          </p>
        </motion.div>

        {/* Dropdown Select Service */}
        <motion.div variants={itemVariants} className="max-w-md mx-auto bg-surface-dark border border-cream/15 p-4 rounded-2xl flex flex-col items-center gap-3">
          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">
            Inspect Service Pricing Tiers
          </label>
          <select
            value={selectedService._id || selectedService.id}
            onChange={handleSelectServiceChange}
            className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light font-bold focus:border-cream/35 outline-none transition-colors"
          >
            {services.map(s => (
              <option key={s._id || s.id} value={s._id || s.id}>{s.name} ({s.category})</option>
            ))}
          </select>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {packages.map((pkg, idx) => {
            const Icon = pkg.icon;
            const isFeatured = pkg.tier === 'Standard';

            return (
              <div
                key={idx}
                className={`glass-panel rounded-3xl p-8 border flex flex-col justify-between transition-all duration-500 ${
                  isFeatured 
                    ? 'border-cream shadow-[0_15px_50px_rgba(222,219,200,0.18)] bg-surface-light/30 relative md:scale-[1.08] md:z-10 hover:scale-[1.10]' 
                    : 'border-cream/10 hover:border-cream/25 hover:scale-[1.03]'
                }`}
              >
                {/* Standard Popular Tag */}
                {isFeatured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cream text-black font-bold uppercase tracking-widest text-[8px] px-4 py-1 rounded-full shadow-[0_0_10px_#DEDBC8]">
                    RECOMMENDED TIER
                  </span>
                )}
 
                <div className="space-y-6">
                  {/* Title & Icon */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-cream">{pkg.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{pkg.tier} Suite</p>
                    </div>
                    <div className="w-10 h-10 bg-cream/5 border border-cream/25 rounded-xl flex items-center justify-center">
                      <Icon className="text-cream" size={18} />
                    </div>
                  </div>
 
                  {/* Price */}
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-cream">${pkg.price}</span>
                    <span className="text-xs text-gray-500 font-light ml-1">USD flat-rate</span>
                  </div>
 
                  {/* Features list */}
                  <ul className="space-y-3.5 border-t border-cream/5 pt-6">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex gap-2.5 items-start text-xs text-cream-light font-light">
                        <Check size={14} className="text-cream mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
 
                <div className="space-y-4 pt-8">
                  {/* Delivery & Revisions info cards */}
                  <div className="grid grid-cols-2 gap-2 text-center text-[9px] text-gray-500 uppercase tracking-wider bg-black/60 p-2.5 rounded-lg border border-cream/5">
                    <div>
                      <span className="block text-cream font-bold">{pkg.delivery.split(' ')[0]}</span>
                      <span>Delivery Days</span>
                    </div>
                    <div className="border-l border-cream/10">
                      <span className="block text-cream font-bold">{pkg.revisions.split(' ')[0]}</span>
                      <span>Revisions</span>
                    </div>
                  </div>
 
                  {/* CTA button */}
                  <button
                    onClick={() => handleCommissionClick(pkg.tier)}
                    className={`w-full py-5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                      isFeatured 
                        ? 'bg-cream text-black hover:bg-cream-light shadow-[0_8px_25px_rgba(222,219,200,0.35)] scale-[1.02]' 
                        : 'bg-surface-dark border border-cream/25 text-cream hover:border-cream/50 hover:bg-cream/5'
                    }`}
                  >
                    Select {pkg.tier} Tier
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
