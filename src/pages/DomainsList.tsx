import React from 'react';
import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Star, Clock, Briefcase, ChevronRight } from 'lucide-react';
import { getDegreeById } from '../data/degreesData';

export const DomainsList: React.FC = () => {
  const { degreeId } = useParams<{ degreeId: string }>();
  const navigate = useNavigate();
  const degree = getDegreeById(degreeId || '');

  if (!degree) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-6xl">🎓</div>
        <h2 className="text-2xl font-black uppercase text-white">Degree Not Found</h2>
        <Link to="/explore" className="btn-primary">← Back to Degrees</Link>
      </div>
    );
  }

  const levelColor = (level: string) => {
    if (level === 'Beginner') return '#22c55e';
    if (level === 'Intermediate') return '#c8ff00';
    return '#f97316';
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
        <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
        <ChevronRight size={12} />
        <span className="text-[#c8ff00]">{degree.shortTitle}</span>
      </div>

      {/* Degree Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 relative overflow-hidden"
        style={{ borderColor: `${degree.color}20` }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ background: degree.color }}
        />
        <div className="relative z-10">
          <div className="text-5xl mb-4">{degree.icon}</div>
          <div className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: degree.color }}>
            {degree.duration} Degree Program — India
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
            {degree.title}
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">{degree.description}</p>
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500">
              <span style={{ color: degree.color }}>{degree.domains.length}</span> Career Paths
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:text-white transition-colors">
              <ArrowLeft size={12} /> Back
            </button>
          </div>
        </div>
      </motion.div>

      {/* Domains Grid */}
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c8ff00] mb-6 flex items-center gap-2">
          Career Domains in {degree.shortTitle}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {degree.domains.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/explore/${degreeId}/${domain.id}`}
                className="group block glass-card p-8 hover:border-white/15 transition-all duration-300 relative overflow-hidden"
              >
                {/* Level Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border border-white/10"
                    style={{ background: `${levelColor(domain.level)}15` }}
                  >
                    {domain.icon}
                  </div>
                  <span
                    className="text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                    style={{ color: levelColor(domain.level), borderColor: `${levelColor(domain.level)}30`, background: `${levelColor(domain.level)}10` }}
                  >
                    {domain.level}
                  </span>
                </div>

                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#c8ff00] transition-colors leading-tight">
                  {domain.title}
                </h3>
                <p className="text-neutral-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2">
                  {domain.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star size={10} className="text-[#c8ff00]" fill="#c8ff00" />
                    {domain.rating}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={10} />
                    {domain.weeks} Weeks
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={10} />
                    {domain.jobRoles.length} Jobs
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-0.5">Avg Salary</div>
                    <div className="text-sm font-black text-[#c8ff00]">{domain.avgSalary}</div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-[#c8ff00] transition-colors">
                    Start <ArrowRight size={12} />
                  </div>
                </div>

                {/* Job Roles preview */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {domain.jobRoles.slice(0, 2).map(role => (
                    <span key={role} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 text-neutral-600 rounded-md">
                      {role}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
