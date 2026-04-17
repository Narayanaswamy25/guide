import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, CheckCircle2,
  Clock, BookOpen, Briefcase, ArrowRight, ExternalLink, Star
} from 'lucide-react';
import { getDomainById, getDegreeById, getSimilarJobRoles } from '../data/degreesData';

import { useModuleStore } from '../stores/moduleStore';

export const RoadmapPage: React.FC = () => {
  const { degreeId, domainId } = useParams<{ degreeId: string; domainId: string }>();
  const navigate = useNavigate();
  const degree = getDegreeById(degreeId || '');
  const domain = getDomainById(degreeId || '', domainId || '');
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  
  const similarRoles = getSimilarJobRoles(domainId || '');
  
  const { completedModules: allCompleted, markModuleComplete } = useModuleStore();
  const key = `${degreeId}_${domainId}`;
  const completedModules = new Set(allCompleted[key] || []);

  const isQuizCompleted = localStorage.getItem(`quiz_completed_${degreeId}_${domainId}`) === 'true';

  if (!degree || !domain) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-6xl">📚</div>
        <h2 className="text-2xl font-black uppercase text-white">Domain Not Found</h2>
        <Link to="/explore" className="btn-primary">← Back to Explore</Link>
      </div>
    );
  }

  const activeModule = domain.modules[activeModuleIdx];
  const progress = Math.round((completedModules.size / domain.modules.length) * 100);

  const markComplete = () => {
    if (degreeId && domainId) {
      markModuleComplete(degreeId, domainId, activeModuleIdx);
    }
    if (activeModuleIdx < domain.modules.length - 1) {
      setActiveModuleIdx(activeModuleIdx + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 flex-wrap">
        <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
        <ChevronRight size={12} />
        <Link to={`/explore/${degreeId}`} className="hover:text-white transition-colors">{degree.shortTitle}</Link>
        <ChevronRight size={12} />
        <span className="text-[#c8ff00]">{domain.title}</span>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#c8ff00] mb-1">Curriculum Roadmap</div>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-none">{domain.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Progress */}
          <div className="glass-card px-4 md:px-5 py-2 md:py-3 flex-grow md:flex-none md:min-w-[140px]">
            <div className="flex justify-between text-[7px] md:text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-1.5 md:mb-2">
              <span>Progress</span>
              <span className="text-[#c8ff00]">{progress}%</span>
            </div>
            <div className="w-full h-1 md:h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full bg-[#c8ff00] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* ── LEFT: Module List ── */}
        <div className="glass-card overflow-hidden h-fit lg:sticky lg:top-24">
          <div className="p-4 md:p-5 border-b border-white/5 bg-white/[0.02]">
            <div className="text-[8px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-1">Curriculum Sync</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-white">{completedModules.size}/{domain.modules.length} Modules</div>
          </div>
          <div className="overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] flex lg:flex-col scrollbar-hide">
            {domain.modules.map((mod, i) => {
              const isActive = i === activeModuleIdx;
              const isDone = completedModules.has(i);
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleIdx(i)}
                  className={`flex-shrink-0 w-[240px] lg:w-full text-left p-4 md:p-5 border-r lg:border-r-0 lg:border-b border-white/5 transition-all group ${
                    isActive ? 'bg-[#c8ff00]/10 border-l-2 border-l-[#c8ff00]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] md:text-[10px] font-black ${
                      isDone ? 'bg-[#c8ff00] text-black' : isActive ? 'bg-[#c8ff00]/20 text-[#c8ff00]' : 'bg-white/5 text-neutral-500'
                    }`}>
                      {isDone ? <CheckCircle2 size={12} /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest mb-0.5 ${isDone ? 'text-[#c8ff00]' : 'text-neutral-600'}`}>
                        Module {i + 1}
                      </div>
                      <div className={`text-[10px] md:text-[11px] font-black uppercase tracking-tight leading-tight truncate lg:whitespace-normal ${isActive ? 'text-[#c8ff00]' : 'text-white'}`}>
                        {mod.title}
                      </div>
                    </div>
                    <ChevronRight size={14} className={`hidden lg:block flex-shrink-0 mt-1 transition-colors ${isActive ? 'text-[#c8ff00]' : 'text-neutral-700 group-hover:text-neutral-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Module Detail ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModuleIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Module Header */}
            <div className="glass-card p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#c8ff00]/5 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full animate-pulse" />
                      Interactive Curriculum Node — Module {activeModuleIdx + 1}
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
                      {activeModule.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#c8ff00]">
                      <Clock size={12} /> {activeModule.duration}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed max-w-2xl">{activeModule.description}</p>
              </div>
            </div>

            {/* YouTube Embed */}
            <div className="glass-card overflow-hidden">
              <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  Lab Node Active
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${activeModule.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-[#c8ff00] transition-colors"
                >
                  YouTube <ExternalLink size={10} />
                </a>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeModule.youtubeId}?rel=0&modestbranding=1`}
                  title={activeModule.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Topics Covered */}
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-4 md:mb-5 flex items-center gap-2">
                <BookOpen size={12} className="text-[#c8ff00]" /> Topics Covered
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {activeModule.topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 md:p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="w-1.5 h-1.5 bg-[#c8ff00] rounded-full flex-shrink-0" />
                    <span className="text-[10px] md:text-[11px] font-bold text-neutral-300">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Roles */}
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-4 md:mb-5 flex items-center gap-2">
                <Briefcase size={12} className="text-[#c8ff00]" /> Job Roles After This Domain
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
                {domain.jobRoles.map(role => (
                  <div key={role} className="px-3 md:px-4 py-1.5 md:py-2 border border-[#c8ff00]/20 bg-[#c8ff00]/5 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-widest text-[#c8ff00]">
                    {role}
                  </div>
                ))}
              </div>
              
              {/* Similar Roles */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5">
                <h4 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-3 md:mb-4">Similar Roles You Might Like</h4>
                <div className="flex flex-wrap gap-2">
                  {similarRoles.map(role => (
                    <div key={role} className="px-2.5 md:px-3 py-1 md:py-1.5 bg-white/[0.02] border border-white/10 rounded-lg text-[9px] md:text-[10px] font-bold text-neutral-500 hover:text-white hover:border-white/20 transition-colors cursor-default">
                      {role}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 md:p-4 mt-5 md:mt-6 bg-[#c8ff00]/5 border border-[#c8ff00]/10 rounded-xl">
                <Star size={14} className="text-[#c8ff00]" fill="#c8ff00" />
                <span className="text-[11px] md:text-sm font-black text-white">Avg Salary: <span className="text-[#c8ff00]">{domain.avgSalary}</span></span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setActiveModuleIdx(Math.max(0, activeModuleIdx - 1))}
                disabled={activeModuleIdx === 0}
                className="btn-secondary flex items-center gap-2 px-4 md:px-6"
              >
                <ChevronLeft size={16} /> <span className="hidden sm:inline">Previous</span>
              </button>
              <button
                onClick={() => {
                  if (isQuizCompleted) return;
                  if (progress === 100) {
                    navigate(`/explore/${degreeId}/${domainId}/quiz`);
                    return;
                    }
                  markComplete();
                }}
                className="btn-primary flex items-center gap-2 flex-1 justify-center"
              >
                {isQuizCompleted ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Complete</span>
                  </>
                ) : progress === 100 ? (
                  <>
                    <ArrowRight size={16} />
                    <span>Take Quiz</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>{completedModules.has(activeModuleIdx) ? 'Completed ✓' : 'Mark Complete & Next'}</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
