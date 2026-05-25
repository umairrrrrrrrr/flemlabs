import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-cream/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <span className="text-lg font-bold tracking-widest text-cream block">
            FLEMLABS
          </span>
          <span className="text-xs font-serif italic text-cream-dark block mt-1">
            "Imagination curated into digital landmarks."
          </span>
        </div>
        <div className="flex gap-8 text-xs text-gray-500 font-medium">
          <Link to="/about" className="hover:text-cream transition-colors">Studio</Link>
          <Link to="/services" className="hover:text-cream transition-colors">Services</Link>
          <Link to="/portfolio" className="hover:text-cream transition-colors">Portfolio</Link>
          <Link to="/contact" className="hover:text-cream transition-colors">Contact</Link>
        </div>
        <div className="text-[10px] text-gray-600 tracking-wider">
          &copy; {new Date().getFullYear()} FLEMLABS. ALL CREATIVE RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
