
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Clock, Calendar, CheckCircle2, 
  AlertCircle, FileText, Video, MessageSquare,
  Search, Filter, Plus, MoreVertical, Star, ArrowRight
} from 'lucide-react';

interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  progress: number;
  grade: string;
  nextDeadline: string;
  status: 'active' | 'completed' | 'upcoming';
  category: string;
  color: string;
}

export const Courses: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const courses: Course[] = [
    {
      id: '1',
      code: 'CS401',
      title: 'Advanced Algorithms',
      instructor: 'Dr. Alan Turing',
      progress: 65,
      grade: 'A',
      nextDeadline: '2026-04-10',
      status: 'active',
      category: 'Computer Science',
      color: '#DFFF00'
    },
    {
      id: '2',
      code: 'SE302',
      title: 'Software Architecture',
      instructor: 'Grace Hopper',
      progress: 42,
      grade: 'B+',
      nextDeadline: '2026-04-15',
      status: 'active',
      category: 'Software Engineering',
      color: '#FF00FF'
    },
    {
      id: '3',
      code: 'AI205',
      title: 'Neural Networks',
      instructor: 'Geoffrey Hinton',
      progress: 88,
      grade: 'A-',
      nextDeadline: '2026-04-05',
      status: 'active',
      category: 'Artificial Intelligence',
      color: '#00FFFF'
    },
    {
      id: '4',
      code: 'MATH201',
      title: 'Discrete Mathematics',
      instructor: 'Ada Lovelace',
      progress: 100,
      grade: 'A+',
      nextDeadline: 'Completed',
      status: 'completed',
      category: 'Mathematics',
      color: '#BFFF00'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === 'all' || course.status === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#DFFF00] mb-2">Course Catalog</div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Course <span className="text-neutral-500">Modules.</span>
          </h1>
        </div>
        <button className="btn-primary flex items-center gap-3">
          <Plus size={18} />
          <span>Enroll New Module</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-card p-4">
        <div className="flex bg-white/[0.02] p-1 rounded-xl border border-white/5 w-full md:w-auto">
          {['active', 'completed', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${
                filter === f ? 'bg-[#DFFF00] text-black shadow-[0_0_15px_rgba(223,255,0,0.3)]' : 'text-neutral-500 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
          <input 
            type="text" 
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course, i) => (
            <motion.div
              layout
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-8 flex flex-col justify-between group hover:border-white/10 transition-all relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none -mr-8 -mt-8 rotate-12"
                style={{ color: course.color }}
              >
                <BookOpen size={128} />
              </div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-black text-xs"
                      style={{ backgroundColor: course.color }}
                    >
                      {course.code.substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{course.code}</div>
                      <div className="text-white font-bold text-sm">{course.category}</div>
                    </div>
                  </div>
                  <button className="text-neutral-600 hover:text-white transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-[#DFFF00] transition-colors">
                  {course.title}
                </h3>
                <p className="text-neutral-500 text-sm font-medium mb-8">Instructor: {course.instructor}</p>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Progress</div>
                    <div className="text-xl font-black text-white">{course.progress}%</div>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      style={{ backgroundColor: course.color }}
                      className="h-full shadow-[0_0_10px_rgba(223,255,0,0.2)]"
                    ></motion.div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-600">Grade</span>
                    <span className="text-white font-black">{course.grade}</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-600">Deadline</span>
                    <span className={`font-black text-[10px] ${course.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                      {course.nextDeadline}
                    </span>
                  </div>
                </div>
                <button className="p-2 bg-white/5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State / Add Card */}
        {filteredCourses.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center glass-card border-dashed border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-neutral-600 mb-6">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">No Modules Found</h3>
            <p className="text-neutral-500 font-medium">Adjust your filters or enroll in a new module.</p>
          </div>
        )}
      </div>

      {/* Quick Stats / Resources */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass-card p-8">
          <h3 className="text-xl font-black uppercase tracking-tight text-white mb-8 flex items-center gap-3">
            <Calendar size={20} className="text-[#DFFF00]" />
            Upcoming Academic Events
          </h3>
          <div className="space-y-4">
            {[
              { title: "Algorithm Midterm Exam", date: "April 12, 2026", time: "10:00 AM", type: "Exam", color: "#FF0000" },
              { title: "Software Design Workshop", date: "April 15, 2026", time: "02:00 PM", type: "Workshop", color: "#DFFF00" },
              { title: "Neural Networks Project Due", date: "April 20, 2026", time: "11:59 PM", type: "Deadline", color: "#FF00FF" }
            ].map((event, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-black border border-white/10 rounded-xl">
                    <span className="text-[10px] font-black uppercase text-neutral-500">{event.date.split(' ')[0]}</span>
                    <span className="text-xl font-black text-white">{event.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-tight">{event.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-600 flex items-center gap-1">
                        <Clock size={10} /> {event.time}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                        {event.type}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-neutral-600 hover:text-white transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-black uppercase tracking-tight text-white mb-8 flex items-center gap-3">
            <Star size={20} className="text-[#00FFFF]" />
            Quick Access
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FileText, label: "Syllabus", color: "#DFFF00" },
              { icon: Video, label: "Lectures", color: "#FF00FF" },
              { icon: MessageSquare, label: "Forums", color: "#00FFFF" },
              { icon: AlertCircle, label: "Grades", color: "#FF5555" }
            ].map((item, i) => (
              <button key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                <item.icon size={24} style={{ color: item.color }} className="group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-neutral-500 group-hover:text-white">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 p-4 bg-[#DFFF00]/5 border border-[#DFFF00]/10 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle size={16} className="text-[#DFFF00]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#DFFF00]">Course Alert</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-medium leading-relaxed">
              Course registration for Fall 2026 opens in 12 days. Review your degree trajectory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
