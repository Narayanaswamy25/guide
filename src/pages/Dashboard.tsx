
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  BookOpen, 
  Compass, 
  TrendingUp,
  Star,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../stores/taskStore';
import { useModuleStore } from '../stores/moduleStore';
import { useAuth } from '../context/AuthContext';
import { degrees } from '../data/degreesData';

const data = [
  { name: 'Mon', focus: 4 },
  { name: 'Tue', focus: 7 },
  { name: 'Wed', focus: 5 },
  { name: 'Thu', focus: 9 },
  { name: 'Fri', focus: 6 },
  { name: 'Sat', focus: 3 },
  { name: 'Sun', focus: 2 },
];

export const Dashboard: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, fetchTasks, isLoading } = useTaskStore();
  const { completedModules } = useModuleStore();

  useEffect(() => {
    setIsMounted(true);
    fetchTasks();
  }, [fetchTasks]);

  // Roadmap Stats
  const roadmapCompleted = Object.values(completedModules).reduce((acc, mods) => acc + mods.length, 0);
  const activeRoadmaps = Object.keys(completedModules).length;
  
  // Calculate Career Clarity (Mock logic based on survey and progress)
  const surveyProgress = user?.careerInterests ? 100 : 0;
  const clarityScore = Math.min(100, Math.round((roadmapCompleted * 5) + (surveyProgress * 0.5)));

  const stats = [
    { label: 'Modules Mastered', value: roadmapCompleted, icon: CheckCircle2, color: 'text-[#DFFF00]' },
    { label: 'Active Roadmaps', value: activeRoadmaps, icon: Compass, color: 'text-[#FF00FF]' },
    { label: 'Clarity Score', value: `${clarityScore}%`, icon: Target, color: 'text-[#00FFFF]' },
    { label: 'Learning Velocity', value: 'Optimal', icon: TrendingUp, color: 'text-white' },
  ];

  // Recommended Degrees based on interests
  const interests = user?.careerInterests?.split(',') || [];
  const recommendedDegrees = degrees.filter(d => 
    d.domains.some(dom => dom.jobRoles.some(role => 
      interests.some(interest => role.toLowerCase().includes(interest.toLowerCase().trim()))
    ))
  ).slice(0, 3);

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
        <div className="relative">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center animate-spin-slow">
            <div className="w-10 h-10 bg-[#DFFF00] rounded-xl shadow-[0_0_30px_rgba(223,255,0,0.3)]"></div>
          </div>
          <div className="absolute -inset-4 bg-[#DFFF00]/10 blur-2xl rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <div className="text-[#DFFF00] font-black uppercase tracking-[0.6em] text-sm animate-pulse">
            Initializing Guide Dashboard
          </div>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
                className="w-1.5 h-1.5 bg-[#DFFF00] rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-2xl md:text-3xl font-black text-[#DFFF00]">{user?.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-1 md:mb-2">
              Academic Intelligence // {new Date().toLocaleDateString()}
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white dark:text-white light:text-neutral-900 leading-none">
              Welcome, {user?.name.split(' ')[0]}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={() => navigate('/explore')}
            className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)] flex items-center gap-2"
          >
            <Compass size={14} /> Explore Degrees
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 md:p-8 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#DFFF00]/10 transition-colors duration-500"></div>
            <stat.icon className={`${stat.color} mb-4 md:mb-6`} size={20} />
            <div className="text-2xl md:text-4xl font-black text-white dark:text-white light:text-neutral-900 mb-1 md:mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Learning Velocity Chart */}
        <div className="lg:col-span-8 glass-card p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-1">Learning Velocity</h2>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Roadmap Mastery Progress</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#DFFF00]">
              <Zap size={10} /> Optimal Pace
            </div>
          </div>
          <div className="h-[300px] w-full min-h-[300px] relative">
            <div className="absolute inset-0">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" debounce={100}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#DFFF00" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#DFFF00" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#ffffff20" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#09090b', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '900',
                        textTransform: 'uppercase'
                      }}
                      itemStyle={{ color: '#DFFF00' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="focus" 
                      stroke="#DFFF00" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorFocus)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Career Interests */}
        <div className="lg:col-span-4 glass-card p-8">
          <h2 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-8">Career Interests</h2>
          <div className="space-y-4">
            {interests.length > 0 ? (
              interests.map((interest, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-[#DFFF00]/20 transition-all">
                  <span className="text-[11px] font-black text-white uppercase tracking-tight">{interest.trim()}</span>
                  <div className="w-2 h-2 rounded-full bg-[#DFFF00] animate-pulse" />
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest mb-4">No interests set</p>
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-[10px] font-black uppercase tracking-widest text-[#DFFF00] hover:underline"
                >
                  Update Profile
                </button>
              </div>
            )}
          </div>
          <div className="mt-8 p-4 bg-[#FF00FF]/5 border border-[#FF00FF]/10 rounded-xl">
            <div className="text-[8px] font-black uppercase tracking-widest text-[#FF00FF] mb-1">Pro Tip</div>
            <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">Complete more quizzes to increase your Career Clarity score.</p>
          </div>
        </div>
      </div>

      {/* Recommended for You */}
      <section className="glass-card p-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-1">Recommended Degrees</h2>
            <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Based on your career interests</p>
          </div>
          <button 
            onClick={() => navigate('/explore')}
            className="text-[10px] font-black uppercase tracking-widest text-[#DFFF00] hover:text-white transition-colors"
          >
            View All
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedDegrees.length > 0 ? (
            recommendedDegrees.map((degree, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/explore/${degree.id}`)}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#DFFF00]/20 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="px-2 py-1 bg-[#DFFF00]/10 text-[#DFFF00] rounded text-[8px] font-black uppercase tracking-widest">
                    {degree.level}
                  </div>
                  <Star size={14} className="text-neutral-700 group-hover:text-[#DFFF00] transition-colors" />
                </div>
                <h3 className="text-sm font-black text-white dark:text-white light:text-neutral-900 uppercase tracking-tight mb-2 group-hover:text-[#DFFF00] transition-colors">
                  {degree.title}
                </h3>
                <div className="flex items-center gap-4 text-[9px] text-neutral-600 font-black uppercase tracking-widest">
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} />
                    <span>{degree.domains.length} Domains</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowRight size={12} />
                    <span>Explore</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center border border-dashed border-white/10 rounded-2xl">
              <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">Complete your academic profile to see recommendations</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
