
import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Award, CheckCircle2, Clock, BarChart3 } from 'lucide-react';

export const Degree: React.FC = () => {
  const degreeInfo = {
    title: "Bachelor of Computer Science",
    institution: "Global Tech University",
    progress: 75,
    creditsEarned: 90,
    creditsRequired: 120,
    gpa: "3.85",
    major: "Software Engineering",
    minor: "Artificial Intelligence",
    expectedGraduation: "June 2026"
  };

  const requirements = [
    { name: "Core Computer Science", completed: 8, total: 10, status: "In Progress" },
    { name: "Mathematics & Logic", completed: 4, total: 4, status: "Completed" },
    { name: "Software Engineering", completed: 5, total: 6, status: "In Progress" },
    { name: "General Education", completed: 6, total: 8, status: "In Progress" },
    { name: "Electives", completed: 3, total: 4, status: "In Progress" }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#DFFF00] mb-2">Academic Infrastructure</div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Degree <span className="text-neutral-500">Trajectory.</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-6 py-3 border-[#DFFF00]/20">
            <div className="text-[8px] font-black uppercase tracking-widest text-neutral-500 mb-1">Current GPA</div>
            <div className="text-2xl font-black text-[#DFFF00]">{degreeInfo.gpa}</div>
          </div>
          <div className="glass-card px-6 py-3 border-white/10">
            <div className="text-[8px] font-black uppercase tracking-widest text-neutral-500 mb-1">Credits</div>
            <div className="text-2xl font-black text-white">{degreeInfo.creditsEarned}/{degreeInfo.creditsRequired}</div>
          </div>
        </div>
      </div>

      {/* Degree Overview Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <GraduationCap size={120} />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">{degreeInfo.title}</h2>
              <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">{degreeInfo.institution}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-2">Major</div>
                <div className="text-white font-bold">{degreeInfo.major}</div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-2">Minor</div>
                <div className="text-white font-bold">{degreeInfo.minor}</div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-2">Expected Grad</div>
                <div className="text-white font-bold">{degreeInfo.expectedGraduation}</div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-2">Status</div>
                <div className="text-[#DFFF00] font-bold flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#DFFF00] rounded-full animate-pulse"></div>
                  ACTIVE_ENROLLMENT
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-end mb-4">
              <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Overall Completion</div>
              <div className="text-4xl font-black text-white">{degreeInfo.progress}%</div>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${degreeInfo.progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#DFFF00] to-[#BFFF00] rounded-full shadow-[0_0_20px_rgba(223,255,0,0.3)]"
              ></motion.div>
            </div>
            <div className="mt-6 flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-600">
              <span>0% START</span>
              <span>75% MILESTONE</span>
              <span>100% GRADUATION</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requirements.map((req, i) => (
          <motion.div 
            key={req.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 hover:border-[#DFFF00]/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${req.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-[#DFFF00]/10 text-[#DFFF00]'}`}>
                {req.status === 'Completed' ? <CheckCircle2 size={20} /> : <BookOpen size={20} />}
              </div>
              <div className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded ${req.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-neutral-800 text-neutral-500'}`}>
                {req.status}
              </div>
            </div>
            
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{req.name}</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500">
                <span>Modules</span>
                <span>{req.completed} / {req.total}</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(req.completed / req.total) * 100}%` }}
                  className={`h-full ${req.status === 'Completed' ? 'bg-green-500' : 'bg-[#DFFF00]'}`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Requirement Placeholder */}
        <button className="glass-card p-6 border-dashed border-white/10 hover:border-[#DFFF00]/30 transition-all flex flex-col items-center justify-center gap-4 group">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-neutral-500 group-hover:text-[#DFFF00] group-hover:border-[#DFFF00]/30 transition-all">
            <Award size={24} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">Add Academic Goal</span>
        </button>
      </div>

      {/* Academic Timeline/Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              <Clock size={20} className="text-[#DFFF00]" />
              Academic Velocity
            </h3>
            <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Last 4 Semesters</div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4">
            {[65, 82, 78, 92, 85, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  className="w-full bg-white/5 rounded-t-lg relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#DFFF00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
                <span className="text-[8px] font-black uppercase tracking-widest text-neutral-600">SEM_0{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-6 flex items-center gap-3">
              <BarChart3 size={20} className="text-[#FF00FF]" />
              Skill Matrix
            </h3>
            <div className="space-y-6">
              {[
                { label: "Technical Proficiency", val: 88, color: "#DFFF00" },
                { label: "Research & Analysis", val: 72, color: "#FF00FF" },
                { label: "Theoretical Logic", val: 94, color: "#00FFFF" }
              ].map((skill) => (
                <div key={skill.label} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500">
                    <span>{skill.label}</span>
                    <span>{skill.val}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.val}%` }}
                      style={{ backgroundColor: skill.color }}
                      className="h-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 mt-8">
            <p className="text-[10px] text-neutral-500 font-medium leading-relaxed italic">
              "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
