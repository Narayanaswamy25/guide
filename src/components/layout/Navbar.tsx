
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Command, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#DFFF00] rounded-lg flex items-center justify-center text-black group-hover:rotate-12 transition-transform">
            <Command size={24} />
          </div>
          <span className="text-white font-black tracking-tighter text-2xl uppercase">
            GUIDE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <Link
            to="/"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-[#DFFF00] transition-colors"
          >
            Home
          </Link>
          <a
            href="#features"
            onClick={(e) => handleAnchorClick(e, 'features')}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-[#DFFF00] transition-colors"
          >
            Features
          </a>
          <a
            href="#platform"
            onClick={(e) => handleAnchorClick(e, 'platform')}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-[#DFFF00] transition-colors"
          >
            Platform
          </a>
          <a
            href="#support"
            onClick={(e) => handleAnchorClick(e, 'support')}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-[#DFFF00] transition-colors"
          >
            Support
          </a>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#DFFF00] text-black rounded-sm font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black border-b border-white/5 p-8 flex flex-col gap-8 md:hidden"
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-black uppercase tracking-tighter text-white"
            >
              Home
            </Link>
            <a
              href="#features"
              onClick={(e) => { handleAnchorClick(e, 'features'); setIsMobileMenuOpen(false); }}
              className="text-2xl font-black uppercase tracking-tighter text-white"
            >
              Features
            </a>
            <a
              href="#platform"
              onClick={(e) => { handleAnchorClick(e, 'platform'); setIsMobileMenuOpen(false); }}
              className="text-2xl font-black uppercase tracking-tighter text-white"
            >
              Platform
            </a>
            <a
              href="#support"
              onClick={(e) => { handleAnchorClick(e, 'support'); setIsMobileMenuOpen(false); }}
              className="text-2xl font-black uppercase tracking-tighter text-white"
            >
              Support
            </a>
            <div className="flex flex-col gap-4 pt-4">
              <button 
                onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
                className="w-full py-4 bg-[#DFFF00] text-black rounded-sm font-black uppercase tracking-widest text-xs"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
