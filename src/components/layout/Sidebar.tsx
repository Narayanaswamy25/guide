
import React from 'react';
import { 
  Home as HomeIcon,
  LayoutDashboard, 
  CheckSquare, 
  Activity,
  Calendar, 
  BarChart3, 
  Settings, 
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Command,
  GraduationCap,
  BookOpen,
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
  { label: 'Degree', path: '/degree', icon: GraduationCap },
  { label: 'Courses', path: '/courses', icon: BookOpen },
  { label: 'Tasks', path: '/tasks', icon: CheckSquare },
  { label: 'Habits', path: '/habits', icon: Activity },
  { label: 'Calendar', path: '/calendar', icon: Calendar },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
];

const bottomItems = [
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Profile', path: '/profile', icon: User },
];

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isSidebarOpen ? 240 : 80 }}
      className="h-screen bg-[#09090b] dark:bg-[#09090b] light:bg-white border-r border-white/5 light:border-neutral-200 flex flex-col relative z-50 transition-all duration-300 ease-in-out"
    >
      {/* Brand Section */}
      <Link to="/" className="h-20 flex items-center px-6 border-b border-white/5 light:border-neutral-200 hover:bg-white/[0.02] light:hover:bg-neutral-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#DFFF00] rounded-lg flex items-center justify-center text-black">
            <Command size={20} />
          </div>
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
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
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-white/5 light:bg-neutral-100 text-[#DFFF00]' 
                  : 'text-neutral-500 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/[0.02] light:hover:bg-neutral-50'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-[#DFFF00]' : 'group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors'} />
              {isSidebarOpen && (
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
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                isActive 
                  ? 'bg-white/5 light:bg-neutral-100 text-[#DFFF00]' 
                  : 'text-neutral-500 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/[0.02] light:hover:bg-neutral-50'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-[#DFFF00]' : 'group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors'} />
              {isSidebarOpen && (
                <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
              )}
            </Link>
          );
        })}
        <button 
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-500 hover:text-red-500 hover:bg-red-500/5 light:hover:bg-red-50 transition-all group"
        >
          <LogOut size={20} />
          {isSidebarOpen && (
            <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
          )}
        </button>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 w-6 h-6 bg-[#DFFF00] rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-transform"
      >
        {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>
    </motion.aside>
  );
};
