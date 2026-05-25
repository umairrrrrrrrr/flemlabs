const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Service = require('../models/Service');
const Review = require('../models/Review');

const seedDB = async () => {
  try {
    // 1. Seed Admin User
    const adminEmail = 'admin@flemlabs.com';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'flemlabs Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Seeded Admin account: admin@flemlabs.com / admin123');
    }

    // 2. Seed Services Catalog (Only seed if empty to prevent duplicate overlays)
    const servicesCount = await Service.find();
    if (servicesCount.length === 0) {
      const servicesData = [
        // VFX
        {
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
        // Motion Design
        {
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
        // Video Editing
        {
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
        // 2D Art & Game Design
        {
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

        // 3D Art & Modeling
        {
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

        // Illustration Services
        {
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

        // Graphic Design Services
        {
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

        // Merchandise Design
        {
          name: 'Limited-Edition Streetwear Apparel Design',
          category: 'Merchandise Design',
          description: 'Premium vector/raster streetwear designs, typography motifs, and custom artwork layout illustrations for print-on-demand brands.',
          prices: { basic: 40, standard: 90, pro: 200 },
          features: {
            basic: ['1 typography concept', 'High-res mockup preview', '2 revisions', '3-day delivery', 'Personal use'],
            standard: ['2 graphic illustrations ready for screen-print (PNG/vector)', 'Source files + flat vector print-outs', '5 revisions', '5-day delivery', 'Commercial usage'],
            pro: ['Premium merchandise collection kit (3 coordinated designs)', 'Full vector files + production technical worksheets', 'Unlimited revisions', '8-day delivery', 'Commercial copyright ownership']
          },
          imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
        },

        // Novel & Book Designing
        {
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

      await Service.create(servicesData);
      console.log(`Seeded ${servicesData.length} artwork services.`);
    }

    // 3. Seed Initial Reviews (Only seed if empty)
    const reviewsCount = await Review.find();
    if (reviewsCount.length === 0) {
      const reviewsData = [
        {
          userId: '60c72b2f9b1d8b0015f6de01',
          userName: 'Helena Vance',
          rating: 5,
          comments: 'flemlabs represents the absolute pinnacle of digital craftsmanship. The low-poly environment designs exceeded our expectations, and the cinematic aesthetics matched our high-end game vision perfectly. Simply unmatched.'
        },
        {
          userId: '60c72b2f9b1d8b0015f6de02',
          userName: 'Kaelen Thorne',
          rating: 5,
          comments: 'The anime-style character renders were detailed and delivered days ahead of schedule. Their attention to lighting overlays and clean separations sets them apart as a true luxury digital art studio.'
        },
        {
          userId: '60c72b2f9b1d8b0015f6de03',
          userName: 'Seraphina Vance',
          rating: 5,
          comments: 'Our streetwear brand has seen immediate attention since adopting flemlabs designs. The custom typography and vector layout illustrations are exceptionally premium.'
        },
        {
          userId: '60c72b2f9b1d8b0015f6de04',
          userName: 'Aria Chen',
          rating: 5,
          comments: "The volume rendering simulations flemlabs created for our cinematic trailer were absolute art. No generic presets, just pure hand-crafted dynamics that made our launch video pop. Literally the easiest project integration we've ever done."
        },
        {
          userId: '60c72b2f9b1d8b0015f6de05',
          userName: 'Lucas Sterling',
          rating: 5,
          comments: 'Collaborated with flemlabs on our limited-edition winter streetwear capsule. Their typography pacing and vector layout compositions are incredibly clean. Complete escrow transparency made the entire commission process a breeze.'
        },
        {
          userId: '60c72b2f9b1d8b0015f6de06',
          userName: 'Nadia Petrov',
          rating: 5,
          comments: "Honestly, their custom 3D character rigs are top-tier. Mesh topology was perfectly clean, retopologies were optimized for Unreal Engine, and the blendshapes are incredibly expressive. They are our go-to studio now."
        }
      ];

      await Review.create(reviewsData);
      console.log('Seeded initial user reviews.');
    }
  } catch (err) {
    console.error('Seeding database error:', err);
  }
};

module.exports = seedDB;
