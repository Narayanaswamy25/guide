
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  CheckCircle2, 
  Plus, 
  TrendingUp, 
  Zap, 
  Target,
  Activity,
  X
} from 'lucide-react';
import { useHabitStore } from '../stores/habitStore';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const Habits: React.FC = () => {
  const { habits, addHabit, toggleHabit, deleteHabit, isLoading, fetchHabits } = useHabitStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const filteredHabits = habits.filter(habit => 
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      await addHabit(newHabitName);
      setNewHabitName('');
      setIsAdding(false);
    }
  };

  if (isLoading && habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-8">
        <div className="relative">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center animate-spin-slow">
            <div className="w-10 h-10 bg-[#FF00FF] rounded-xl shadow-[0_0_30px_rgba(255,0,255,0.3)]"></div>
          </div>
          <div className="absolute -inset-4 bg-[#FF00FF]/10 blur-2xl rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <div className="text-[#FF00FF] font-black uppercase tracking-[0.6em] text-sm animate-pulse">
            Calibrating Habits
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
                className="w-1.5 h-1.5 bg-[#FF00FF] rounded-full"
              />
            ))}
          </div>
        </div>

        <div className="text-neutral-600 font-mono text-[9px] uppercase tracking-[0.3em] max-w-xs text-center leading-relaxed">
          Analyzing consistency patterns... <br />
          Rebuilding habit graph...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">
            Study Goals  // Active: {habits.filter(h => h.streak > 0).length}
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white dark:text-white light:text-neutral-900">
            Learning Goals
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Filter habits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-[#DFFF00]/30 transition-all w-48"
            />
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)] flex items-center gap-2"
          >
            <Plus size={16} />
            <span>New Habit</span>
          </button>
        </div>
      </header>

      {/* Add Habit Modal Overlay */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-card p-10 relative"
          >
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">New Study Goal</h2>
            <form onSubmit={handleAddHabit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Habit Name</label>
                <input 
                  type="text" 
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="e.g. Deep Work Architecture"
                  className="input-field"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn-primary w-full">Create Habit</button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Longest Streak', value: `${Math.max(...habits.map(h => h.streak), 0)}d`, icon: Flame, color: 'text-[#DFFF00]' },
          { label: 'Completion Rate', value: `${Math.round((habits.filter(h => h.completedToday).length / (habits.length || 1)) * 100)}%`, icon: CheckCircle2, color: 'text-[#FF00FF]' },
          { label: 'Active Goals', value: habits.length, icon: Zap, color: 'text-[#00FFFF]' },
          { label: 'Consistency Score', value: habits.reduce((acc, h) => acc + h.streak * 10, 0), icon: Target, color: 'text-white' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 group relative overflow-hidden"
          >
            <stat.icon className={`${stat.color} mb-6`} size={24} />
            <div className="text-4xl font-black text-white dark:text-white light:text-neutral-900 mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Habits Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredHabits.map((habit, i) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 group hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center ${habit.completedToday ? 'text-[#DFFF00]' : 'text-neutral-600'}`}>
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 group-hover:text-[#DFFF00] transition-colors">
                    {habit.name}
                  </h3>
                  <div className="text-[9px] text-neutral-600 font-black uppercase tracking-widest mt-1">
                    Status: {habit.completedToday ? 'Synchronized' : 'Pending Sync'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-[#DFFF00]">
                    <Flame size={16} />
                    <span className="text-xl font-black tracking-tighter">{habit.streak}d</span>
                  </div>
                  <div className="text-[8px] text-neutral-700 font-black uppercase tracking-widest">Current Streak</div>
                </div>
                <button 
                  onClick={() => deleteHabit(habit.id)}
                  className="text-neutral-800 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Weekly Grid Visualization */}
            <div className="grid grid-cols-7 gap-2 mb-8">
              {days.map((day, idx) => {
                // For demo purposes, we'll show previous days as completed if they are part of the streak
                const isCurrentDay = idx === 6;
                const isCompleted = isCurrentDay ? habit.completedToday : (idx >= 6 - (habit.streak % 7));
                
                return (
                  <div key={idx} className="text-center">
                    <div className="text-[8px] font-black uppercase tracking-widest text-neutral-700 mb-2">{day}</div>
                    <button 
                      onClick={() => isCurrentDay && toggleHabit(habit.id)}
                      disabled={!isCurrentDay}
                      className={`w-full aspect-square rounded-lg border transition-all flex items-center justify-center ${
                        isCompleted 
                          ? 'bg-[#DFFF00]/10 border-[#DFFF00]/30 text-[#DFFF00]' 
                          : 'bg-white/5 border-white/5 text-transparent hover:border-white/20'
                      } ${!isCurrentDay ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {isCompleted && <CheckCircle2 size={14} />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-neutral-500">Daily Progress</span>
                <span className="text-white">{habit.completedToday ? '100%' : '0%'}</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: habit.completedToday ? '100%' : '0%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r from-transparent to-[#DFFF00]`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Consistency Chart Placeholder */}
      <section className="glass-card p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10">
          <TrendingUp className="text-[#DFFF00]/10" size={120} />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-2">Study Progress Analysis</h2>
          <p className="text-neutral-500 font-medium max-w-md mb-10">
            Your study consistency has improved 14% this week. Learning goals are being tracked efficiently.
          </p>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#DFFF00]/10 rounded-2xl flex items-center justify-center text-[#DFFF00] border border-[#DFFF00]/20 shadow-[0_0_20px_rgba(223,255,0,0.1)]">
                <Zap size={28} />
              </div>
              <div>
                <div className="text-2xl font-black text-white dark:text-white light:text-neutral-900 tracking-tighter">940</div>
                <div className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">Global Score</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#FF00FF]/10 rounded-2xl flex items-center justify-center text-[#FF00FF] border border-[#FF00FF]/20 shadow-[0_0_20px_rgba(255,0,255,0.1)]">
                <Target size={28} />
              </div>
              <div>
                <div className="text-2xl font-black text-white dark:text-white light:text-neutral-900 tracking-tighter">8.5h</div>
                <div className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">Avg Focus</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
