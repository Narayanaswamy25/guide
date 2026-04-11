
import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Shield, 
  ArrowUpRight, 
  Clock, 
  Target,
  LogOut, 
  Layout, 
  Flame,
  Share2,
  Edit3,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTaskStore } from '../stores/taskStore';
import { useHabitStore } from '../stores/habitStore';

export const Profile: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { tasks } = useTaskStore();
  const { habits } = useHabitStore();

  if (!isAuthenticated) return null;

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;

  const stats = [
    { label: 'Tasks Completed', value: completedTasks.toString(), icon: CheckCircle2, color: 'text-[#DFFF00]' },
    { label: 'Focus Hours', value: '42.5h', icon: Clock, color: 'text-[#FF00FF]' },
    { label: 'Habit Streak', value: `${maxStreak}d`, icon: Flame, color: 'text-[#00FFFF]' },
    { label: 'Efficiency', value: '94%', icon: TrendingUp, color: 'text-white' },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="flex items-center space-x-10">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-2 border-white/10 rounded-none flex items-center justify-center relative overflow-hidden group-hover:border-[#DFFF00]/50 transition-all duration-500 brutal-border">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User size={64} className="text-black" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#DFFF00] rounded-none flex items-center justify-center border-4 border-black shadow-xl brutal-border">
              <Shield size={18} className="text-black" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-4 text-[#DFFF00] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              <Target size={14} />
              <span>Verified Identity</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none mb-4">
              {user?.name?.split(' ')[0] || 'Engineer'} <span className="text-[#DFFF00]">{user?.name?.split(' ')[1] || 'Core'}.</span>
            </h1>
            <p className="text-neutral-600 font-black tracking-[0.2em] text-[10px] uppercase">INFRASTRUCTURE_LEVEL_12 // {user?.role === 'admin' ? 'SYS_ADMIN' : 'SR_CANDIDATE'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
            <Edit3 size={16} />
            <span>Edit Profile</span>
          </button>
          <button className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)] flex items-center gap-2">
            <Share2 size={16} />
            <span>Share Node</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 group overflow-hidden"
          >
            <stat.icon className={`${stat.color} mb-6`} size={24} />
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Bio Section */}
          <section className="glass-card p-12 relative overflow-hidden">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Zap className="text-[#DFFF00] mr-4" size={24} />
              Productivity Bio
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed italic border-l-4 border-[#DFFF00] pl-8">
              "Analytical Systems Architect focused on high-velocity output and scalable productivity frameworks. Currently optimizing deep work cycles and task orchestration."
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Deep Work", "Systems Design", "Velocity", "Focus"].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-neutral-500">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Connected Accounts */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Layout className="text-[#DFFF00] mr-4" size={24} />
              Connected Nodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'GitHub', icon: Github, value: '@saravanaskv', color: 'hover:text-white' },
                { label: 'Twitter', icon: Twitter, value: '@saravana_dev', color: 'hover:text-[#1DA1F2]' },
                { label: 'LinkedIn', icon: Linkedin, value: 'saravana-jenkins', color: 'hover:text-[#0A66C2]' },
              ].map((account, i) => (
                <div key={i} className="glass-card p-6 flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <account.icon size={20} className={`text-neutral-500 transition-colors ${account.color}`} />
                    <div>
                      <div className="text-[10px] font-black text-white uppercase tracking-tight">{account.label}</div>
                      <div className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">{account.value}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-neutral-800 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Achievements & Activity */}
        <div className="lg:col-span-4 space-y-12">
          <section className="glass-card p-10">
            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Award className="text-[#DFFF00] mr-4" size={20} />
              Achievements
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center border transition-all ${i <= 3 ? 'bg-[#DFFF00]/10 border-[#DFFF00]/20 text-[#DFFF00]' : 'bg-white/5 border-white/5 text-neutral-800'}`}>
                  <Award size={24} className={i <= 3 ? 'animate-pulse' : ''} />
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-neutral-600 hover:text-white hover:bg-white/5 transition-all">
              View All Badges
            </button>
          </section>

          <section className="glass-card p-10">
            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Clock className="text-[#DFFF00] mr-4" size={20} />
              Activity Log
            </h2>
            <div className="space-y-8">
              {[
                { action: 'Completed Task', target: 'UI Refactor', time: '2h ago' },
                { action: 'Updated Habit', target: 'Deep Work', time: '5h ago' },
                { action: 'Synced Data', target: 'Cloud Node', time: '1d ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-[#DFFF00] mt-1.5 shadow-[0_0_10px_rgba(223,255,0,0.5)]"></div>
                  <div>
                    <div className="text-[11px] font-black text-white uppercase tracking-tight">{activity.action}</div>
                    <div className="text-[10px] text-neutral-500 font-medium mb-1">{activity.target}</div>
                    <div className="text-[8px] text-neutral-700 font-black uppercase tracking-widest">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
