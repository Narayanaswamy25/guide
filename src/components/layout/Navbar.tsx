
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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-black/90 backdrop-blur-2xl border-b border-white/10 py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 flex items-center justify-between">
        {/* Left Section: Logo & Status */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#DFFF00] rounded-sm flex items-center justify-center text-black group-hover:rotate-90 transition-transform duration-500">
              <Command size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black tracking-tighter text-2xl uppercase leading-none">
                GUIDE
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mt-1">
                Academic_OS v1.0
              </span>
            </div>
          </Link>

          {/* System Status (Desktop Only) */}
          <div className="hidden xl:flex items-center gap-4 px-4 py-2 border-l border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#DFFF00] rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">System_Online</span>
            </div>
          </div>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Home', path: '/' },
            { label: 'Explore', path: '/explore' },
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="group relative py-2"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 group-hover:text-white transition-colors">
                {link.label}
              </span>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-px bg-[#DFFF00] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="hidden sm:flex px-8 py-3 bg-white text-black rounded-sm font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#DFFF00] transition-all active:scale-95 border border-transparent hover:border-black"
          >
            Access Dashboard
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden w-10 h-10 flex items-center justify-center text-white border border-white/10 rounded-sm hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black z-[110] p-12 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-[#DFFF00] font-black uppercase tracking-[0.4em] text-xs">Menu_System</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center text-white border border-white/10 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-10">
              {[
                { label: 'Home', path: '/' },
                { label: 'Explore Degrees', path: '/explore' },
                { label: 'About Platform', path: '/about' },
                { label: 'Contact Support', path: '/contact' },
              ].map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-black uppercase tracking-tighter text-white hover:text-[#DFFF00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/10">
              <button 
                onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
                className="w-full py-6 bg-[#DFFF00] text-black rounded-sm font-black uppercase tracking-[0.3em] text-xs"
              >
                Enter Platform
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
