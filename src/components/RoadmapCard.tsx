
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { CareerPath } from '../types';

interface RoadmapCardProps {
  path: CareerPath;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ path, isSaved, onToggleSave }) => {
  const [progress, setProgress] = useState(0);
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[path.icon] || LucideIcons.HelpCircle;
  const { Star, Clock, ArrowRight, Zap, CheckCircle2, Bookmark } = LucideIcons;

  useEffect(() => {
    const saved = localStorage.getItem(`progress_${path.id}`);
    if (saved) {
      const completedSteps = JSON.parse(saved);
      setProgress(Math.round((completedSteps.length / path.steps.length) * 100));
    }
  }, [path.id, path.steps.length]);

  const difficultyStyles = {
    'Beginner': 'text-neutral-400 border-white/10 bg-white/5',
    'Intermediate': 'text-esta-lime border-esta-lime/20 bg-esta-lime/5',
    'Advanced': 'text-white border-white/20 bg-white/10'
  }[path.difficulty];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="group flex flex-col h-full bg-black border border-white/10 overflow-hidden transition-all duration-500 hover:border-esta-lime relative brutal-border"
    >
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-esta-lime/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      <div className="p-8 flex-grow relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-14 h-14 bg-white text-black flex items-center justify-center border border-white/10 group-hover:bg-esta-lime group-hover:text-black transition-all duration-500 brutal-border">
            <IconComponent size={28} strokeWidth={3} />
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2 mb-4">
              {onToggleSave && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleSave(path.id);
                  }}
                  className={`p-2 border transition-all ${
                    isSaved 
                      ? 'bg-esta-lime border-esta-lime text-black' 
                      : 'bg-black border-white/10 text-neutral-500 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                </button>
              )}
              <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest border ${difficultyStyles} mono-label`}>
                {path.difficulty}
              </span>
            </div>
            {progress > 0 && (
              <div className="flex items-center space-x-2 text-[8px] font-black text-esta-lime uppercase tracking-widest mono-label">
                <CheckCircle2 size={10} />
                <span>{progress}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-esta-lime mb-3 flex items-center mono-label">
          <Zap size={10} className="mr-2" />
          {path.category}
        </div>

        <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter group-hover:text-esta-lime transition-colors leading-none">
          {path.title}
        </h3>
        
        <p className="text-neutral-500 text-xs font-medium leading-relaxed mb-8 line-clamp-2 group-hover:text-neutral-400 transition-colors">
          {path.description}
        </p>

        {progress > 0 && (
          <div className="w-full h-0.5 bg-neutral-900 overflow-hidden mb-8 border border-white/5">
            <div 
              className="h-full bg-esta-lime transition-all duration-1000" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className="flex items-center space-x-6 pt-6 border-t border-white/5">
          <div className="flex items-center space-x-2 text-neutral-600 group-hover:text-neutral-400 transition-colors">
            <Clock size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">{path.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-neutral-600 group-hover:text-neutral-400 transition-colors">
            <Star size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">{path.rating}</span>
          </div>
        </div>
      </div>

      <Link
        to={`/roadmaps/${path.id}`}
        className="mt-auto flex items-center justify-center space-x-3 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-esta-lime hover:text-black transition-all border-t border-white/10 relative z-10"
      >
        <span>{progress > 0 ? 'RESUME_SYNC' : 'INIT_DEPLOY'}</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};
