
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, X, CheckCircle2, BookOpen, Activity, ArrowRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../stores/taskStore';
import { useHabitStore } from '../stores/habitStore';

export const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { tasks } = useTaskStore();
  const { habits } = useHabitStore();

  const toggleSearch = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSearch]);

  interface SearchResult {
    id: string;
    type: string;
    icon: LucideIcon;
    color: string;
    path: string;
    title?: string;
    name?: string;
  }

  const results: SearchResult[] = query.trim() === '' ? [] : [
    ...tasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase())).map(t => ({ ...t, type: 'task', icon: CheckCircle2, color: 'text-[#DFFF00]', path: '/tasks' })),
    ...habits.filter(h => h.name.toLowerCase().includes(query.toLowerCase())).map(h => ({ ...h, type: 'habit', icon: Activity, color: 'text-[#FF00FF]', path: '/habits' })),
    // Add more types as needed
  ].slice(0, 8) as SearchResult[];

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <button 
        onClick={toggleSearch}
        className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-neutral-500 hover:text-white hover:bg-white/10 transition-all group w-full md:w-64"
      >
        <Search size={16} className="group-hover:text-[#DFFF00] transition-colors" />
        <span className="text-[10px] font-black uppercase tracking-widest flex-grow text-left">Search System...</span>
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-black">
          <Command size={8} />
          <span>K</span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative z-10"
            >
              <div className="p-6 border-b border-white/5 flex items-center gap-4">
                <Search className="text-[#DFFF00]" size={20} />
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search tasks, habits, courses, or commands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white font-medium text-lg w-full placeholder:text-neutral-700"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-neutral-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                {results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleSelect(result.path)}
                        className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-all group text-left border border-transparent hover:border-white/5"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center ${result.color}`}>
                            <result.icon size={18} />
                          </div>
                          <div>
                            <div className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-1">{result.type}</div>
                            <div className="text-sm font-bold text-white group-hover:text-[#DFFF00] transition-colors">{result.title || result.name}</div>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-neutral-800 group-hover:text-white transition-all transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                ) : query.trim() !== '' ? (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-700">
                      <Search size={32} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2">No Results Found</h3>
                    <p className="text-neutral-500 text-sm font-medium">No system nodes match your search query.</p>
                  </div>
                ) : (
                  <div className="py-10">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-6 px-4">Quick Commands</div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Go to Tasks', path: '/tasks', icon: CheckCircle2 },
                        { label: 'Go to Habits', path: '/habits', icon: Activity },
                        { label: 'Go to Analytics', path: '/analytics', icon: Activity },
                        { label: 'Go to Courses', path: '/courses', icon: BookOpen },
                      ].map((cmd, i) => (
                        <button
                          key={i}
                          onClick={() => handleSelect(cmd.path)}
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all text-left group"
                        >
                          <cmd.icon size={16} className="text-neutral-500 group-hover:text-[#DFFF00]" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-white">{cmd.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-neutral-600">
                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">ESC</span>
                    <span>to close</span>
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-neutral-600">
                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">↑↓</span>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-neutral-600">
                    <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">ENTER</span>
                    <span>to select</span>
                  </div>
                </div>
                <div className="text-[8px] font-black uppercase tracking-widest text-[#DFFF00]">
                  System Search v1.0
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
