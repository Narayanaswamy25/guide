
import React from 'react';
import { 
  Home as HomeIcon,
  LayoutDashboard, 
  CheckSquare, 
  Activity,
  Calendar, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Command,
  Compass,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { label: 'Home', path: '/', icon: HomeIcon },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Explore', path: '/explore', icon: Compass },
  { label: 'Extra Skills', path: '/extra-skills', icon: Sparkles },
  // { label: 'Degree', path: '/degree', icon: GraduationCap },
  // { label: 'Courses', path: '/courses', icon: BookOpen },
  { label: 'Tasks', path: '/tasks', icon: CheckSquare },
  { label: 'Habits', path: '/habits', icon: Activity },
  { label: 'Calendar', path: '/calendar', icon: Calendar },
  // { label: 'Analytics', path: '/analytics', icon: BarChart3 },
];

const bottomItems = [
  { label: 'Settings', path: '/settings', icon: Settings },

];

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar, isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          width: isMobileMenuOpen ? 240 : (isSidebarOpen ? 240 : 80),
          x: isMobileMenuOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -240 : 0)
        }}
        className={`h-screen fixed lg:sticky top-0 left-0 flex-shrink-0 bg-[#09090b] dark:bg-[#09090b] light:bg-white border-r border-white/5 light:border-neutral-200 flex flex-col z-[70] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Section */}
        <Link 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className="h-20 flex items-center px-6 border-b border-white/5 light:border-neutral-200 hover:bg-white/[0.02] light:hover:bg-neutral-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#DFFF00] rounded-lg flex items-center justify-center text-black">
              <Command size={20} />
            </div>
            <AnimatePresence mode="wait">
              {(isSidebarOpen || isMobileMenuOpen) && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-white dark:text-white light:text-black font-black tracking-tighter text-xl"
                >
                  GUIDE
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-grow py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-white/5 light:bg-neutral-100 text-[#DFFF00]' 
                    : 'text-neutral-500 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/[0.02] light:hover:bg-neutral-50'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[#DFFF00]' : 'group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors'} />
                {(isSidebarOpen || isMobileMenuOpen) && (
                  <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-white/5 light:border-neutral-200 space-y-1">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-white/5 light:bg-neutral-100 text-[#DFFF00]' 
                    : 'text-neutral-500 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/[0.02] light:hover:bg-neutral-50'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-[#DFFF00]' : 'group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors'} />
                {(isSidebarOpen || isMobileMenuOpen) && (
                  <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                )}
              </Link>
            );
          })}
          <button 
            onClick={() => {
              logout();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-500 hover:text-red-500 hover:bg-red-500/5 light:hover:bg-red-50 transition-all group"
          >
            <LogOut size={20} />
            {(isSidebarOpen || isMobileMenuOpen) && (
              <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
            )}
          </button>
        </div>

        {/* Toggle Button - Desktop Only */}
        <button 
          onClick={toggleSidebar}
          className="hidden lg:flex absolute -right-3 top-24 w-6 h-6 bg-[#DFFF00] rounded-full items-center justify-center text-black shadow-xl hover:scale-110 transition-transform"
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </motion.aside>
    </>
  );
};
