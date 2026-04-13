
import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface ActivityCalendarProps {
  data: Record<string, number>;
}

export const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ data }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate last 12 weeks of dates
  const weeks = useMemo(() => {
    const result = [];
    const today = new Date();
    
    // Start from 12 weeks ago, aligned to Sunday
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (12 * 7) - today.getDay());
    
    const currentDate = new Date(startDate);
    
    for (let w = 0; w < 13; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        week.push({
          date: new Date(currentDate),
          count: data[dateStr] || 0,
          dateStr
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      result.push(week);
    }
    return result;
  }, [data]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-neutral-900 border-white/5';
    if (count < 2) return 'bg-orange-600/20 border-orange-600/30';
    if (count < 4) return 'bg-orange-600/40 border-orange-600/50';
    if (count < 6) return 'bg-orange-600/70 border-orange-600/80';
    return 'bg-orange-600 border-white/20 shadow-[0_0_10px_rgba(234,88,12,0.4)]';
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-4">
      <div className="flex space-x-4 min-w-max">
        <div className="flex flex-col justify-between py-1 pr-2">
          {days.map((day, i) => (
            <span key={day} className={`text-[8px] font-black uppercase tracking-widest ${i % 2 === 0 ? 'text-neutral-600' : 'opacity-0'}`}>
              {day}
            </span>
          ))}
        </div>
        <div className="flex space-x-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col space-y-1.5">
              {week.map((day, di) => (
                <motion.div
                  key={day.dateStr}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (wi * 7 + di) * 0.005 }}
                  className={`w-3.5 h-3.5 rounded-sm border ${getColor(day.count)} transition-all duration-500 hover:scale-125 hover:z-10 cursor-help relative group`}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 brutal-border transition-opacity">
                    {day.count} nodes validated // {day.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end space-x-3">
        <span className="text-[8px] font-black uppercase tracking-widest text-neutral-600">Less</span>
        <div className="flex space-x-1">
          {[0, 2, 4, 6, 8].map(c => (
            <div key={c} className={`w-3 h-3 rounded-sm border ${getColor(c)}`}></div>
          ))}
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest text-neutral-600">More</span>
      </div>
    </div>
  );
};
