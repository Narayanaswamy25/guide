
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Clock, Calendar, 
  AlertCircle, FileText, Video, MessageSquare,
  Search, Plus, MoreVertical, Star, ArrowRight,
  X, CheckCircle2, GraduationCap, Users,
  ExternalLink, Trash2
} from 'lucide-react';

import { useCourseStore, Course } from '../stores/courseStore';
import { useAuth } from '../context/AuthContext';

export const Courses: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { courses, fetchCourses, addCourse, deleteCourse } = useCourseStore();
  const { user } = useAuth();

  const [newCourse, setNewCourse] = useState({
    code: '',
    title: '',
    instructor: '',
    category: 'Computer Science',
    color: '#DFFF00',
    status: 'active' as const,
    progress: 0,
    grade: 'N/A',
    nextDeadline: format(new Date(), 'MMM dd')
  });

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  function format(date: Date, fmt: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (fmt === 'MMM dd') {
      return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, '0')}`;
    }
    return date.toLocaleDateString();
  }

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCourse.title.trim() && user) {
      await addCourse(newCourse);
      setIsAdding(false);
      setNewCourse({
        code: '',
        title: '',
        instructor: '',
        category: 'Computer Science',
        color: '#DFFF00',
        status: 'active',
        progress: 0,
        grade: 'N/A',
        nextDeadline: format(new Date(), 'MMM dd')
      });
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Are you sure you want to unenroll from this course?')) {
      await deleteCourse(id);
      if (selectedCourse?.id === id) setSelectedCourse(null);
    }
  };

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
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white dark:text-white light:text-neutral-900">
            Course <span className="text-neutral-500">Modules.</span>
          </h1>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center gap-3"
        >
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
              onClick={() => setFilter(f as 'all' | 'active' | 'completed')}
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

                <h3 className="text-2xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-2 group-hover:text-[#DFFF00] transition-colors">
                  {course.title}
                </h3>
                <p className="text-neutral-500 text-sm font-medium mb-8">Instructor: {course.instructor}</p>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="text-[10px] font-black uppercase tracking-widest text-neutral-600">Progress</div>
                    <div className="text-xl font-black text-white dark:text-white light:text-neutral-900">{course.progress}%</div>
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
                    <span className="text-white dark:text-white light:text-neutral-900 font-black">{course.grade}</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-widest text-neutral-600">Deadline</span>
                    <span className={`font-black text-[10px] ${course.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                      {course.nextDeadline}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="p-2 bg-white/5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                >
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
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white dark:text-white light:text-neutral-900 mb-2">No Modules Found</h3>
            <p className="text-neutral-500 font-medium">Adjust your filters or enroll in a new module.</p>
          </div>
        )}
      </div>

      {/* Quick Stats / Resources */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass-card p-8">
          <h3 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-8 flex items-center gap-3">
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
                    <span className="text-xl font-black text-white dark:text-white light:text-neutral-900">{event.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div>
                    <h4 className="text-white dark:text-white light:text-neutral-900 font-bold uppercase tracking-tight">{event.title}</h4>
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
          <h3 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-neutral-900 mb-8 flex items-center gap-3">
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
      {/* Enrollment Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl glass-card p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#DFFF00]"></div>
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-10">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">Module Enrollment</div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Enroll in New Course</h2>
              </div>

              <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Course Code</label>
                    <input 
                      type="text" 
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      placeholder="e.g. CS50"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Course Title</label>
                    <input 
                      type="text" 
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      placeholder="e.g. Introduction to Computer Science"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Instructor</label>
                    <input 
                      type="text" 
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                      placeholder="e.g. Prof. David Malan"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Category</label>
                    <select 
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      className="input-field appearance-none"
                    >
                      <option>Computer Science</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Design</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Theme Color</label>
                    <div className="flex gap-3">
                      {['#DFFF00', '#FF00FF', '#00FFFF', '#FF5555', '#55FF55'].map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setNewCourse({ ...newCourse, color: c })}
                          className={`w-8 h-8 rounded-lg transition-all ${newCourse.color === c ? 'scale-125 border-2 border-white' : 'opacity-50 hover:opacity-100'}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Initial Progress (%)</label>
                    <input 
                      type="number" 
                      min="0" max="100"
                      value={newCourse.progress}
                      onChange={(e) => setNewCourse({ ...newCourse, progress: parseInt(e.target.value) })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-6">
                  <button type="submit" className="btn-primary w-full py-5 text-sm">Initialize Enrollment</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Course Detail View */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-end">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-3xl h-full bg-[#09090b] border-l border-white/10 p-12 overflow-y-auto relative"
            >
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-8 left-8 p-3 bg-white/5 rounded-full text-neutral-500 hover:text-white transition-all"
              >
                <X size={20} />
              </button>

              <div className="mt-16 space-y-12">
                <header>
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-black"
                      style={{ backgroundColor: selectedCourse.color }}
                    >
                      {selectedCourse.code}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{selectedCourse.category}</div>
                  </div>
                  <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-4 leading-none">
                    {selectedCourse.title}
                  </h1>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-neutral-600" />
                      <span className="text-sm text-neutral-400 font-medium">{selectedCourse.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-neutral-600" />
                      <span className="text-sm text-neutral-400 font-medium">Grade: {selectedCourse.grade}</span>
                    </div>
                  </div>
                </header>

                <div className="grid grid-cols-3 gap-6">
                  <div className="glass-card p-6 border-white/5">
                    <div className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-2">Progress</div>
                    <div className="text-3xl font-black text-white">{selectedCourse.progress}%</div>
                    <div className="mt-4 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full" style={{ width: `${selectedCourse.progress}%`, backgroundColor: selectedCourse.color }}></div>
                    </div>
                  </div>
                  <div className="glass-card p-6 border-white/5">
                    <div className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-2">Status</div>
                    <div className="text-3xl font-black uppercase text-[#DFFF00]">{selectedCourse.status}</div>
                  </div>
                  <div className="glass-card p-6 border-white/5">
                    <div className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-2">Next Deadline</div>
                    <div className="text-3xl font-black text-red-500">{selectedCourse.nextDeadline}</div>
                  </div>
                </div>

                <section className="space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                    <FileText size={20} className="text-[#DFFF00]" />
                    Course Syllabus & Modules
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "Introduction to the Core Concepts", status: "completed" },
                      { title: "Advanced Methodologies and Frameworks", status: "completed" },
                      { title: "Practical Implementation & Case Studies", status: "active" },
                      { title: "Final Assessment & Project Review", status: "upcoming" }
                    ].map((module, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all group">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                            module.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                            module.status === 'active' ? 'bg-[#DFFF00]/10 text-[#DFFF00]' : 'bg-neutral-800 text-neutral-600'
                          }`}>
                            0{i + 1}
                          </div>
                          <span className={`font-bold uppercase tracking-tight ${module.status === 'completed' ? 'text-neutral-500' : 'text-white'}`}>
                            {module.title}
                          </span>
                        </div>
                        {module.status === 'completed' ? (
                          <CheckCircle2 size={18} className="text-green-500" />
                        ) : (
                          <button className="p-2 text-neutral-600 group-hover:text-white transition-colors">
                            <ArrowRight size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex gap-4 pt-12 border-t border-white/5">
                  <button className="flex-grow btn-primary flex items-center justify-center gap-3 py-5">
                    <ExternalLink size={18} />
                    <span>Launch Course Portal</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteCourse(selectedCourse.id)}
                    className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
