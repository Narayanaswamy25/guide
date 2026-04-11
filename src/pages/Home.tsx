
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, Clock, Activity, 
  Calendar, Zap, Layout, Target,
  TrendingUp, Shield, Globe, MousePointer2
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000000] text-white relative overflow-hidden technical-grid selection:bg-[#DFFF00] selection:text-black">
      <Navbar />
      {/* Background Marquee */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] flex animate-marquee opacity-5 pointer-events-none select-none z-0">
        <span className="text-[20vw] font-black uppercase tracking-tighter whitespace-nowrap">
          GUIDE // LEARN NAVIGATE EXCEL // MASTER YOUR EDUCATION // GUIDE // 
        </span>
      </div>

      {/* Atmospheric Glows */}
      <div className="atmosphere-glow top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#DFFF00]/10 animate-pulse-glow"></div>
      <div className="atmosphere-glow bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-[#FF00FF]/5 animate-pulse-glow" style={{ animationDelay: '-5s' }}></div>

      {/* Hero Section */}
      <section className="pt-40 md:pt-56 pb-24 px-6 lg:px-20 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 mb-12 h-6">
            {/* System Status Removed */}
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-7xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-black tracking-tighter text-white mb-10 leading-[0.8] uppercase"
          >
            <span className="block">Master Your</span>
            <span className="text-[#DFFF00] block">Education</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-12 mt-12">
            <div className="space-y-6 max-w-2xl">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-neutral-500 leading-tight font-medium uppercase tracking-tight"
              >
                Your comprehensive learning platform for academic excellence. <br />
                Track progress, manage assignments, and achieve your educational goals.
              </motion.p>
              <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#DFFF00]" />
                  <span>Live Progress Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#DFFF00]" />
                  <span>Secure Authentication</span>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-primary group relative overflow-hidden flex items-center gap-3"
              >
                <Zap size={18} />
                <span className="relative z-10">OPEN DASHBOARD</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Modules Bento */}
      <section id="features" className="py-40 max-w-[1400px] mx-auto px-6 lg:px-20 relative z-10">
        <div className="mb-20">
          <span className="text-[#DFFF00] font-mono text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Learning Platform</span>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
            Essential <br /><span className="text-neutral-500">Features</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => navigate('/tasks')}
            className="md:col-span-2 glass-card p-12 cursor-pointer group hover:border-[#DFFF00]/20 transition-all"
          >
            <Layout className="text-[#DFFF00] mb-8 w-12 h-12 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">Assignment Manager</h3>
              <p className="text-neutral-400 font-medium leading-relaxed max-w-md">Organize assignments with kanban and list views. Track deadlines and submission status effortlessly.</p>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => navigate('/habits')}
            className="glass-card p-12 cursor-pointer group hover:border-[#FF00FF]/20 transition-all"
          >
            <Target className="text-[#FF00FF] mb-8 w-12 h-12 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Study Goals</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">Visual goal tracking. Build consistent study habits with real-time progress measurement.</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => navigate('/analytics')}
            className="glass-card p-12 cursor-pointer group hover:border-[#00FFFF]/20 transition-all"
          >
            <TrendingUp className="text-[#00FFFF] mb-8 w-12 h-12 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Performance Analytics</h3>
              <p className="text-neutral-500 font-medium leading-relaxed">Detailed academic insights. Visualize your learning progress and academic performance.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Performance Section */}
      <section id="system" className="py-40 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#DFFF00] mb-8">Optimized Learning</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
              Designed for <br /><span className="text-[#DFFF00]\">Success</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: Shield, title: "Clean Interface", desc: "A focused design that eliminates distractions and helps you stay focused on learning." },
                { icon: Globe, title: "All Your Data", desc: "Access your coursework and progress from any device, synchronized instantly." },
                { icon: MousePointer2, title: "Intuitive Design", desc: "Simple navigation optimized for students. Get to what you need fast." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#DFFF00]">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-tight mb-1">{item.title}</h4>
                    <p className="text-neutral-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-10 bg-[#DFFF00]/10 blur-[120px] rounded-full"></div>
            <div className="glass-card p-10 relative z-10 border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">academic_progress.log</span>
              </div>
              <div className="space-y-6 font-mono text-sm">
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Assignments_Completed</span>
                  <span className="text-[#DFFF00]">94.5%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '98.2%' }}
                    className="h-full bg-[#DFFF00]"
                  ></motion.div>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Focus_Intensity_Index</span>
                  <span className="text-[#FF00FF]">8.4/10</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '84%' }}
                    className="h-full bg-[#FF00FF]"
                  ></motion.div>
                </div>
                <div className="flex justify-between items-center text-neutral-400">
                  <span>Habit_Consistency_Score</span>
                  <span className="text-[#00FFFF]">92.0</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    className="h-full bg-[#00FFFF]"
                  ></motion.div>
                </div>
                <div className="pt-6 text-[10px] text-green-500 font-bold uppercase tracking-widest">
                  STATUS: OPTIMAL PERFORMANCE DETECTED.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="pricing" className="py-48 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12 leading-[0.85]">
            Start Your <br /><span className="text-[#DFFF00]">Journey</span>
          </h2>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            ENTER DASHBOARD
          </button>
        </div>
      </section>

      <Footer />

      {/* Fixed System Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-black/80 backdrop-blur-md border-t border-white/5 z-[100] px-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[8px] font-mono text-neutral-600 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Platform: Operational
          </div>
          <div className="hidden md:flex items-center gap-4 text-[8px] font-mono text-neutral-700 uppercase tracking-widest">
            <span>Version: 1.0</span>
            <span>Status: Ready</span>
          </div>
        </div>
        <div className="text-[8px] font-mono text-neutral-700 uppercase tracking-widest">
          © 2026 GUIDE LEARNING // ALL_RIGHTS_RESERVED
        </div>
      </div>
    </div>
  );
};
