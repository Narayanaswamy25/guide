
import React, { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
} from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

import { useTaskStore, TaskPriority, TaskStatus } from '../stores/taskStore';
import { useAuth } from '../context/AuthContext';

export const Calendar: React.FC = () => {
  const { tasks, fetchTasks, addTask, updateTask, deleteTask } = useTaskStore();
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    status: 'TODO' as TaskStatus,
    dueDate: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim() && user) {
      await addTask({
        ...newTask,
        dueDate: new Date(newTask.dueDate).toISOString()
      });
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        status: 'TODO',
        dueDate: format(selectedDate, 'yyyy-MM-dd')
      });
      setIsAdding(false);
    }
  };

  const toggleTaskStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';
    await updateTask(id, { status: newStatus as TaskStatus });
  };

  const events = tasks.map(task => ({
    ...task,
    date: task.dueDate ? new Date(task.dueDate) : new Date(task.createdAt),
  }));

  const renderHeader = () => {
    return (
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">
            Academic Calendar // {format(currentMonth, 'MMMM yyyy')}
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            The Calendar
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-lg text-neutral-500 hover:text-white transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => setCurrentMonth(new Date())}
              className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all"
            >
              Today
            </button>
            <button 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-lg text-neutral-500 hover:text-white transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <button 
            onClick={() => {
              setNewTask(prev => ({ ...prev, dueDate: format(selectedDate, 'yyyy-MM-dd') }));
              setIsAdding(true);
            }}
            className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)] flex items-center gap-2"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </header>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-t-2xl overflow-hidden">
        {days.map((day, i) => (
          <div key={i} className="bg-[#09090b] py-4 text-center text-[10px] font-black uppercase tracking-widest text-neutral-600">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const dayEvents = events.filter(e => isSameDay(e.date, cloneDay));
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day.toString()}
            className={`min-h-[120px] bg-[#000000] border border-white/5 p-3 transition-all cursor-pointer group relative overflow-hidden ${
              !isCurrentMonth ? 'opacity-20' : ''
            } ${isSelected ? 'bg-white/[0.02] border-[#DFFF00]/30' : 'hover:bg-white/[0.01]'}`}
            onClick={() => {
              setSelectedDate(cloneDay);
              setNewTask(prev => ({ ...prev, dueDate: format(cloneDay, 'yyyy-MM-dd') }));
            }}
          >
            {isSelected && (
              <motion.div 
                layoutId="calendar-select"
                className="absolute inset-0 border-2 border-[#DFFF00]/20 pointer-events-none"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                isToday ? 'text-[#DFFF00]' : 'text-neutral-500'
              }`}>
                {formattedDate}
              </span>
              {isToday && <div className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] shadow-[0_0_10px_rgba(223,255,0,1)]"></div>}
            </div>
            <div className="space-y-1 relative z-10">
              {dayEvents.slice(0, 3).map((event, idx) => (
                <div 
                  key={idx} 
                  className={`px-2 py-1 rounded text-[7px] font-black uppercase tracking-tight truncate border ${
                    event.status === 'DONE' ? 'opacity-40 line-through bg-neutral-900 border-white/5 text-neutral-500' :
                    event.priority === 'urgent' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                    event.priority === 'high' ? 'bg-[#FF00FF]/10 border-[#FF00FF]/20 text-[#FF00FF]' :
                    'bg-white/5 border-white/5 text-neutral-400'
                  }`}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-[7px] font-black text-neutral-600 uppercase tracking-widest pl-1">
                  + {dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-px" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="bg-white/5 border-x border-b border-white/5 rounded-b-2xl overflow-hidden">{rows}</div>;
  };

  return (
    <div className="space-y-10">
      {renderHeader()}

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-9">
          {renderDays()}
          {renderCells()}
        </div>

        {/* Sidebar: Selected Date Details */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card p-8">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#DFFF00] mb-2">
              Selected // {format(selectedDate, 'MMM dd, yyyy')}
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">
              Agenda
            </h2>
            
            <div className="space-y-4">
              {events.filter(e => isSameDay(e.date, selectedDate)).length > 0 ? (
                events.filter(e => isSameDay(e.date, selectedDate)).map((event, i) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-[#DFFF00]/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleTaskStatus(event.id, event.status)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            event.status === 'DONE' ? 'bg-[#DFFF00] border-[#DFFF00] text-black' : 'border-neutral-800 text-transparent hover:border-white'
                          }`}
                        >
                          <CheckCircle2 size={12} />
                        </button>
                        <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                          event.priority === 'urgent' ? 'bg-red-500/10 text-red-500' : 
                          event.priority === 'high' ? 'bg-[#FF00FF]/10 text-[#FF00FF]' :
                          'bg-neutral-800 text-neutral-500'
                        }`}>
                          {event.priority}
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteTask(event.id)}
                        className="text-neutral-800 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <h3 className={`text-sm font-black uppercase tracking-tight mb-3 transition-all ${
                      event.status === 'DONE' ? 'text-neutral-600 line-through' : 'text-white group-hover:text-[#DFFF00]'
                    }`}>
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[9px] text-neutral-600 font-black uppercase tracking-widest">
                      <Clock size={12} />
                      <span>{event.status}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-16 text-center border border-dashed border-white/5 rounded-[2rem]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-800">No tasks for this date</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsAdding(true)}
              className="w-full mt-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <Plus size={18} />
              <span>Add Task</span>
            </button>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-8 flex items-center gap-3">
              <CalendarIcon size={18} className="text-[#DFFF00]" />
              Upcoming Deadlines
            </h3>
            <div className="space-y-8">
              {events
                .filter(e => e.status !== 'DONE' && e.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 4)
                .map((event, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="text-center min-w-[45px] py-2 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-[9px] font-black text-neutral-500 uppercase">{format(event.date, 'MMM')}</div>
                      <div className="text-lg font-black text-[#DFFF00]">{format(event.date, 'dd')}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-white uppercase tracking-tight leading-tight mb-1">{event.title}</div>
                      <div className={`text-[8px] font-black uppercase tracking-widest ${
                        event.priority === 'urgent' ? 'text-red-500' : 'text-neutral-600'
                      }`}>{event.priority}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Task Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass-card p-12 relative"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-8 right-8 text-neutral-500 hover:text-white transition-colors"
              >
                <Plus className="rotate-45" size={24} />
              </button>
              
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">
                Task Creation // Node: {user?.id?.slice(0, 8)}
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-10">New Assignment</h2>
              
              <form onSubmit={handleAddTask} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Assignment Title</label>
                  <input 
                    type="text" 
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g. Neural Network Implementation"
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Description</label>
                  <textarea 
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Define the scope of this task..."
                    className="input-field min-h-[120px] py-5 resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Priority Level</label>
                    <select 
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#DFFF00]/30 transition-all appearance-none"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent Priority</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Target Date</label>
                    <input 
                      type="date" 
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <button type="submit" className="btn-primary w-full py-5 text-sm">
                  Initialize Task
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
