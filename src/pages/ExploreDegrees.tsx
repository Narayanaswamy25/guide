import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Search, GraduationCap, Zap, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { degrees } from '../data/degreesData';
import { useAuth } from '../context/AuthContext';

export const ExploreDegrees: React.FC = () => {
  const [search, setSearch] = useState('');
  const { user, updateProfile } = useAuth();

  const handleEnroll = async (e: React.MouseEvent, degreeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await updateProfile({ selectedDegree: degreeId });
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  };

  const filtered = degrees.filter(
    d =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c8ff00] mb-2 flex items-center gap-2">
            <Zap size={10} />
            India College Guide — Class 12 Students
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
            Choose Your<br />
            <span className="text-[#c8ff00]">Degree.</span>
          </h1>
          <p className="mt-4 text-neutral-400 max-w-xl text-sm font-medium leading-relaxed">
            Explore every major engineering & technology degree offered in India. Click any degree to discover career paths, roadmaps and job opportunities waiting for you.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass-card px-5 py-3 text-center border-[#c8ff00]/20">
            <div className="text-[8px] font-black uppercase tracking-widest text-neutral-500 mb-1">Degrees</div>
            <div className="text-2xl font-black text-[#c8ff00]">{degrees.length}</div>
          </div>
          <div className="glass-card px-5 py-3 text-center">
            <div className="text-[8px] font-black uppercase tracking-widest text-neutral-500 mb-1">Domains</div>
            <div className="text-2xl font-black text-white">
              {degrees.reduce((acc, d) => acc + d.domains.length, 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
        <input
          type="text"
          placeholder="Search degrees..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-12 text-sm"
        />
      </div>

      {/* Degree Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((degree, i) => (
          <motion.div
            key={degree.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link
              to={`/explore/${degree.id}`}
              className="group block glass-card p-8 hover:border-white/15 transition-all duration-300 relative overflow-hidden"
            >
              {/* Accent glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                style={{ background: degree.color }}
              />

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/10"
                style={{ background: `${degree.color}15` }}
              >
                {degree.icon}
              </div>

              {/* Content */}
              <div className="flex justify-between items-start mb-2">
                <div className="text-[8px] font-black uppercase tracking-widest" style={{ color: degree.color }}>
                  {degree.duration}
                </div>
                {user?.selectedDegree === degree.id ? (
                  <div className="flex items-center gap-1 text-[#c8ff00] text-[8px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={10} />
                    Enrolled
                  </div>
                ) : (
                  <button 
                    onClick={(e) => handleEnroll(e, degree.id)}
                    className="text-[8px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[#c8ff00] transition-colors leading-tight">
                {degree.title}
              </h2>
              <p className="text-neutral-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2">
                {degree.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-neutral-600">
                    <BookOpen size={12} />
                    {degree.domains.length} Domains
                  </div>
                </div>
                <div
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: degree.color }}
                >
                  Explore <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-8 border-[#c8ff00]/10 bg-[#c8ff00]/[0.02]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-[#c8ff00]/10 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={24} className="text-[#c8ff00]" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#c8ff00] mb-1">For 12th Students in India</div>
            <h3 className="text-white font-black uppercase tracking-tight text-lg mb-2">
              Not sure which degree to choose?
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Start by exploring <strong className="text-white">B.Tech IT</strong> or <strong className="text-white">B.Tech CSE</strong> if you love computers.
              Interested in electronics? Try <strong className="text-white">B.Tech EEE</strong>. Want AI? Explore <strong className="text-white">B.Tech AI/ML</strong>.
              Each degree card shows you career paths, salary ranges, and a full learning roadmap.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <div className="flex items-center gap-1 text-[#c8ff00] text-[10px] font-black uppercase tracking-widest">
              <Star size={12} fill="currentColor" />
              Free
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
