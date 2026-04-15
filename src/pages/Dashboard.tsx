
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  Flame, 
  TrendingUp,
  Calendar as CalendarIcon,
  MoreHorizontal
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
import { useTaskStore } from '../stores/taskStore';
import { useCourseStore } from '../stores/courseStore';
import { useModuleStore } from '../stores/moduleStore';
import { useAuth } from '../context/AuthContext';
import { formatTimestamp } from '../lib/utils';

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
  const { user } = useAuth();
  const { tasks, fetchTasks, isLoading } = useTaskStore();
  const { courses } = useCourseStore();
  const { completedModules } = useModuleStore();

  useEffect(() => {
    setIsMounted(true);
    fetchTasks();
  }, [fetchTasks]);

  // Task Stats
  const completedTasks = tasks.filter(t => t.status === 'DONE').length;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  
  // Course Stats
  const completedCourses = courses.filter(c => c.status === 'completed').length;
  const inProgressCourses = courses.filter(c => c.status === 'active').length;

  // Roadmap Stats
  const roadmapCompleted = Object.values(completedModules).reduce((acc, mods) => acc + mods.length, 0);
  // For "In Progress" roadmap, we can count domains that have some progress but aren't finished
  // But maybe it's simpler to just count the individual modules as "tasks"
  
  const totalCompleted = completedTasks + completedCourses + roadmapCompleted;
  const totalInProgress = inProgressTasks + inProgressCourses;
  const urgentTasks = tasks.filter(t => t.priority === 'urgent').length;
  
  // Efficiency: Completed tasks vs tasks that were actually started (IN_PROGRESS + DONE)
  const startedTasks = tasks.filter(t => t.status === 'DONE' || t.status === 'IN_PROGRESS');
  const startedCourses = courses.filter(c => c.status === 'completed' || c.status === 'active');
  
  const totalStarted = startedTasks.length + startedCourses.length + roadmapCompleted;
  const efficiency = totalStarted > 0 
    ? Math.round((totalCompleted / totalStarted) * 100) 
    : 0;

  useEffect(() => {
    if (tasks.length > 0 || courses.length > 0 || roadmapCompleted > 0) {
      console.log('Dashboard Metrics Debug:', {
        totalTasks: tasks.length,
        totalCourses: courses.length,
        roadmapCompleted,
        completed: totalCompleted,
        inProgress: totalInProgress,
        started: totalStarted,
        efficiency: efficiency
      });
    }
  }, [tasks, courses, roadmapCompleted, totalCompleted, totalInProgress, totalStarted, efficiency]);

  const stats = [
    { label: 'Completed', value: totalCompleted, icon: CheckCircle2, color: 'text-[#DFFF00]' },
    { label: 'In Progress', value: totalInProgress, icon: Clock, color: 'text-[#FF00FF]' },
    { label: 'Urgent', value: urgentTasks, icon: Flame, color: 'text-[#00FFFF]' },
    { label: 'Efficiency', value: `${efficiency}%`, icon: TrendingUp, color: 'text-white' },
  ];

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
            Loading Your Dashboard
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

        <div className="text-neutral-600 font-mono text-[9px] uppercase tracking-[0.3em] max-w-xs text-center leading-relaxed">
          Connecting to secure backend API... <br />
          Retrieving operational telemetry...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-3xl font-black text-[#DFFF00]">{user?.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">
              Operational Overview // {new Date().toLocaleDateString()}
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-white dark:text-white light:text-neutral-900">
              Welcome, {user?.name.split(' ')[0]}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
            Export Report
          </button>
          <button className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)]">
            Sync Data
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
            className="glass-card p-8 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#DFFF00]/10 transition-colors duration-500"></div>
            <stat.icon className={`${stat.color} mb-6`} size={24} />
            <div className="text-4xl font-black text-white dark:text-white light:text-neutral-900 mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Productivity Chart */}
        <div className="lg:col-span-8 glass-card p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-1">Focus Intensity</h2>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Weekly Cognitive Output</p>
            </div>
            <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-[#DFFF00] focus:outline-none cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
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

        {/* Recent Activity */}
        <div className="lg:col-span-4 glass-card p-8">
          <h2 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-8">Recent Activity</h2>
          <div className="space-y-8">
            {tasks.slice(0, 4).map((task, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  task.status === 'DONE' ? 'bg-[#DFFF00]' : 'bg-neutral-800'
                }`}></div>
                <div className="flex-grow">
                  <div className="text-[11px] font-black text-white dark:text-white light:text-neutral-900 uppercase tracking-tight group-hover:text-[#DFFF00] transition-colors cursor-pointer">
                    {task.title}
                  </div>
                  <div className="text-[9px] text-neutral-600 font-black uppercase tracking-widest mt-1">
                    {task.status} {'//'} {task.priority}
                  </div>
                </div>
                <div className="text-[8px] text-neutral-800 font-black uppercase tracking-widest">
                  {formatTimestamp(task.updatedAt)}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-neutral-600 hover:text-white hover:bg-white/5 transition-all">
            View All Logs
          </button>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <section className="glass-card p-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900">Critical Deadlines</h2>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#DFFF00] hover:text-white transition-colors">
            View Full Queue
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.filter(t => t.priority === 'urgent' || t.priority === 'high').slice(0, 3).map((task, i) => (
            <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#DFFF00]/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                  task.priority === 'urgent' ? 'bg-red-500/10 text-red-500' : 'bg-[#FF00FF]/10 text-[#FF00FF]'
                }`}>
                  {task.priority}
                </div>
                <button className="text-neutral-700 group-hover:text-white transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <h3 className="text-sm font-black text-white dark:text-white light:text-neutral-900 uppercase tracking-tight mb-2 group-hover:text-[#DFFF00] transition-colors">
                {task.title}
              </h3>
              <div className="flex items-center gap-4 text-[9px] text-neutral-600 font-black uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <CalendarIcon size={12} />
                  <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>14:00</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
