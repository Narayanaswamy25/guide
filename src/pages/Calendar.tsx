
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
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MoreHorizontal,
} from 'lucide-react';

import { useTaskStore } from '../stores/taskStore';

export const Calendar: React.FC = () => {
  const { tasks, subscribeTasks } = useTaskStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = subscribeTasks();
    return () => unsubscribe();
  }, [subscribeTasks]);

  const events = tasks.map(task => ({
    id: task.id,
    title: task.title,
    date: task.dueDate ? new Date(task.dueDate) : new Date(task.createdAt),
    type: 'task',
    priority: task.priority
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
          <button className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)] flex items-center gap-2">
            <Plus size={16} />
            <span>New Event</span>
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
            className={`min-h-[120px] bg-[#000000] border border-white/5 p-3 transition-all cursor-pointer group relative ${
              !isCurrentMonth ? 'opacity-20' : ''
            } ${isSelected ? 'bg-white/[0.02] border-[#DFFF00]/30' : 'hover:bg-white/[0.01]'}`}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                isToday ? 'text-[#DFFF00]' : 'text-neutral-500'
              }`}>
                {formattedDate}
              </span>
              {isToday && <div className="w-1 h-1 rounded-full bg-[#DFFF00] shadow-[0_0_10px_rgba(223,255,0,1)]"></div>}
            </div>
            <div className="space-y-1">
              {dayEvents.map((event, idx) => (
                <div 
                  key={idx} 
                  className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-tight truncate border ${
                    event.priority === 'urgent' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                    event.priority === 'high' ? 'bg-[#FF00FF]/10 border-[#FF00FF]/20 text-[#FF00FF]' :
                    'bg-neutral-900 border-white/5 text-neutral-500'
                  }`}
                >
                  {event.title}
                </div>
              ))}
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
            
            <div className="space-y-6">
              {events.filter(e => isSameDay(e.date, selectedDate)).length > 0 ? (
                events.filter(e => isSameDay(e.date, selectedDate)).map((event, i) => (
                  <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl group hover:border-[#DFFF00]/20 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                        event.priority === 'urgent' ? 'bg-red-500/10 text-red-500' : 'bg-neutral-800 text-neutral-500'
                      }`}>
                        {event.priority}
                      </div>
                      <button className="text-neutral-800 group-hover:text-white transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#DFFF00] transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-3 text-[9px] text-neutral-600 font-black uppercase tracking-widest">
                      <Clock size={12} />
                      <span>09:00 - 10:00</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center border border-dashed border-white/5 rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-700">No events scheduled</p>
                </div>
              )}
            </div>

            <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <Plus size={16} />
              <span>Add Agenda Item</span>
            </button>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <CalendarIcon size={16} className="text-[#DFFF00]" />
              Upcoming
            </h3>
            <div className="space-y-6">
              {events.slice(0, 3).map((event, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="text-center min-w-[40px]">
                    <div className="text-[10px] font-black text-white uppercase">{format(event.date, 'MMM')}</div>
                    <div className="text-xl font-black text-[#DFFF00]">{format(event.date, 'dd')}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-black text-white uppercase tracking-tight">{event.title}</div>
                    <div className="text-[8px] text-neutral-600 font-black uppercase tracking-widest mt-0.5">{event.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
