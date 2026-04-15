
import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Zap, 
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { useTaskStore } from '../stores/taskStore';
import { useHabitStore } from '../stores/habitStore';

export const Analytics: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { tasks, isLoading: tasksLoading } = useTaskStore();
  const { habits, isLoading: habitsLoading } = useHabitStore();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoading = tasksLoading || habitsLoading;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
        <div className="relative">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center animate-spin-slow">
            <div className="w-10 h-10 bg-white rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)]"></div>
          </div>
          <div className="absolute -inset-4 bg-white/10 blur-2xl rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <div className="text-white font-black uppercase tracking-[0.6em] text-sm animate-pulse">
            Aggregating Telemetry
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
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="text-neutral-600 font-mono text-[9px] uppercase tracking-[0.3em] max-w-xs text-center leading-relaxed">
          Processing historical data nodes... <br />
          Generating performance vectors...
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const activeHabits = habits.length;
  const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);

  const stats = [
    { label: 'Completion Rate', value: `${completionRate}%`, trend: '+12%', up: true, icon: CheckCircle2, color: 'text-[#DFFF00]' },
    { label: 'Active Habits', value: activeHabits.toString(), trend: '+2', up: true, icon: Zap, color: 'text-[#FF00FF]' },
    { label: 'Total Streak', value: `${totalStreak}d`, trend: '+5d', up: true, icon: Activity, color: 'text-[#00FFFF]' },
    { label: 'Task Velocity', value: `${(completedTasks / 7).toFixed(1)}/d`, trend: '-0.5/d', up: false, icon: Target, color: 'text-white' },
  ];

  const priorityData = [
    { name: 'Urgent', value: tasks.filter(t => t.priority === 'urgent').length, color: '#ef4444' },
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length, color: '#FF00FF' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, color: '#00FFFF' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length, color: '#DFFF00' },
  ].filter(p => p.value > 0);

  const completionData = [
    { name: 'Week 1', completed: Math.min(completedTasks, 5), target: 5 },
    { name: 'Week 2', completed: Math.max(0, Math.min(completedTasks - 5, 8)), target: 8 },
    { name: 'Week 3', completed: Math.max(0, Math.min(completedTasks - 13, 10)), target: 10 },
    { name: 'Week 4', completed: Math.max(0, completedTasks - 23), target: 12 },
  ];

  const focusData = [
    { time: '08:00', focus: 30 },
    { time: '10:00', focus: 85 },
    { time: '12:00', focus: 45 },
    { time: '14:00', focus: 95 },
    { time: '16:00', focus: 70 },
    { time: '18:00', focus: 40 },
    { time: '20:00', focus: 20 },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">
            Performance Telemetry // Period: Last 30 Days
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Analytics
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
            Export JSON
          </button>
          <button className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)]">
            Refresh Data
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
            <div className="flex items-center justify-between mb-6">
              <stat.icon className={`${stat.color}`} size={24} />
              <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.up ? 'text-[#DFFF00]' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Task Completion Velocity */}
        <div className="lg:col-span-8 glass-card p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white mb-1">Completion Velocity</h2>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Completed vs Target Tasks</p>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DFFF00]"></span>
                <span className="text-neutral-500">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/10"></span>
                <span className="text-neutral-500">Target</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full min-h-[300px] relative">
            <div className="absolute inset-0">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" debounce={100}>
                  <BarChart data={completionData}>
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
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }}
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
                    <Bar dataKey="completed" fill="#DFFF00" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="target" fill="rgba(255,255,255,0.05)" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="lg:col-span-4 glass-card p-8">
          <h2 className="text-xl font-black uppercase tracking-tight text-white mb-8">Priority Mix</h2>
          <div className="h-[250px] w-full relative min-h-[250px]">
            <div className="absolute inset-0">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" debounce={100}>
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#09090b', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '900',
                        textTransform: 'uppercase'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-2xl font-black text-white">{tasks.length}</div>
              <div className="text-[8px] text-neutral-600 font-black uppercase tracking-widest">Total Tasks</div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {priorityData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{item.name}</span>
                </div>
                <span className="text-[10px] font-black text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Focus Intensity Area Chart */}
      <section className="glass-card p-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-1">Cognitive Load Profile</h2>
            <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Average Focus Intensity by Hour</p>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#DFFF00]">
            Peak: 14:00 (95%)
          </div>
        </div>
        <div className="h-[200px] w-full min-h-[200px] relative">
          <div className="absolute inset-0">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%" debounce={100}>
                <AreaChart data={focusData}>
                  <defs>
                    <linearGradient id="colorFocusAnalytics" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF00FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="time" 
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
                    itemStyle={{ color: '#FF00FF' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="focus" 
                    stroke="#FF00FF" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorFocusAnalytics)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
