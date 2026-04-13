
import React from 'react';
import { Sidebar } from './Sidebar';
import { GlobalSearch } from '../GlobalSearch';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#000000] dark:bg-[#000000] light:bg-[#F8F9FA] text-white dark:text-white light:text-neutral-900 overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar - Fixed */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 relative">
        {/* Top Navigation Bar */}
        <header className="h-20 border-b border-white/5 light:border-neutral-200 flex items-center justify-between px-8 sticky top-0 bg-black/50 dark:bg-black/50 light:bg-white/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-8">
            <GlobalSearch />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-white dark:text-white light:text-neutral-900">{user?.name}</span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#DFFF00]">System Active</span>
            </div>
            <div className="w-10 h-10 rounded-lg border border-white/10 overflow-hidden bg-white/5">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                  <span className="text-xs font-black">{user?.name?.charAt(0) || '?'}</span>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <main className="flex-grow overflow-y-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-8 max-w-[1440px] mx-auto w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Atmospheric Glows */}
        <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[#DFFF00]/5 blur-[160px] rounded-full pointer-events-none opacity-20 animate-pulse-glow"></div>
        <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#FF00FF]/5 blur-[120px] rounded-full pointer-events-none opacity-10 animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};
