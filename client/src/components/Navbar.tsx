import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, ShieldAlert } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Orders', path: '/orders' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4 md:px-8 flex justify-center">
      <nav className="glass-panel py-3 px-6 rounded-full flex items-center justify-between w-full max-w-7xl backdrop-blur-md shadow-2xl transition-all duration-300">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl md:text-2xl font-bold tracking-widest text-white group-hover:opacity-80 transition-opacity lowercase">
            flemlabs
          </span>
        </Link>

        {/* Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-xs md:text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                isActive(link.path) 
                  ? 'text-cream font-bold' 
                  : 'text-gray-400 hover:text-cream'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cream rounded-full shadow-[0_0_8px_#DEDBC8]" />
              )}
            </Link>
          ))}
          {/* Admin link */}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={`flex items-center gap-1 text-xs md:text-sm font-medium text-amber-300 hover:text-amber-100 hover:-translate-y-0.5 transition-all duration-300 ${
                isActive('/admin') ? 'font-bold underline decoration-amber-300 decoration-2 underline-offset-4' : ''
              }`}
            >
              <ShieldAlert size={14} />
              Admin
            </Link>
          )}
        </div>

        {/* Auth status buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-cream-dark bg-surface-dark px-3 py-1 rounded-full border border-cream/10">
                <UserIcon size={12} />
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-cream p-1.5 rounded-full border border-cream/10 hover:border-cream/30 transition-all duration-300"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-cream hover:bg-cream-light text-black font-semibold text-xs md:text-sm px-5 py-2 rounded-full border border-transparent shadow-[0_4px_12px_rgba(222,219,200,0.15)] hover:shadow-[0_4px_20px_rgba(222,219,200,0.35)] transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
