
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Shield, 
  ArrowUpRight, 
  Clock, 
  Target,
  Layout, 
  Flame,
  Edit3,
  Github,
  Twitter,
  Linkedin,
  Save,
  X,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTaskStore } from '../stores/taskStore';
import { useHabitStore } from '../stores/habitStore';
import { getDegreeById } from '../data/degreesData';

export const Profile: React.FC = () => {
  const { user, logout, isAuthenticated, updateProfile } = useAuth();
  const { tasks } = useTaskStore();
  const { habits } = useHabitStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    github: user?.github || '',
    twitter: user?.twitter || '',
    linkedin: user?.linkedin || '',
    age: user?.age || '',
    gender: user?.gender || '',
    dob: user?.dob || '',
    educationLevel: user?.educationLevel || '',
    stream: user?.stream || '',
    subjects: user?.subjects || '',
    careerInterests: user?.careerInterests || '',
    mainGoal: user?.mainGoal || '',
    learningStyle: user?.learningStyle || '',
    studyLocation: user?.studyLocation || '',
    budgetPreference: user?.budgetPreference || '',
    degreeAwareness: user?.degreeAwareness || '',
    confusionLevel: user?.confusionLevel || '',
    excitementFactor: user?.excitementFactor || '',
    personalityTrigger: user?.personalityTrigger || '',
  });

  if (!isAuthenticated) return null;

  const selectedDegree = user?.selectedDegree ? getDegreeById(user.selectedDegree) : null;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const maxStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0;

  const stats = [
    { label: 'Tasks Completed', value: completedTasks.toString(), icon: CheckCircle2, color: 'text-[#DFFF00]' },
    { label: 'Focus Hours', value: `${user?.focusHours || 0}h`, icon: Clock, color: 'text-[#FF00FF]' },
    { label: 'Habit Streak', value: `${maxStreak}d`, icon: Flame, color: 'text-[#00FFFF]' },
    { label: 'Efficiency', value: tasks.length > 0 ? `${Math.round((completedTasks / tasks.length) * 100)}%` : '0%', icon: TrendingUp, color: 'text-white' },
  ];

  const educationLevels = [
    'High School (8–10)',
    'Higher Secondary (11–12)',
    'Diploma',
    'Undergraduate (UG)',
    'Postgraduate (PG)',
    'Gap Year / Exploring',
  ];

  const streams = {
    school: ['Science', 'Commerce', 'Arts / Humanities', 'Vocational'],
    college: ['Engineering', 'Medical', 'Business', 'Arts', 'Science', 'Other']
  };

  const learningStyles = [
    { id: 'visual', label: 'Visual', icon: '👀' },
    { id: 'auditory', label: 'Auditory', icon: '🎧' },
    { id: 'reading', label: 'Reading/Writing', icon: '📖' },
    { id: 'kinesthetic', label: 'Kinesthetic', icon: '✋' },
  ];

  const handleSave = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Save profile error:', error);
    }
  };

  const renderMultiSelect = (field: keyof typeof editForm, options: string[]) => {
    const current = (editForm[field] as string).split(',').filter(Boolean);
    return (
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => {
              const next = current.includes(opt) 
                ? current.filter(i => i !== opt) 
                : [...current, opt];
              setEditForm(prev => ({ ...prev, [field]: next.join(',') }));
            }}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all ${
              current.includes(opt)
                ? 'bg-[#DFFF00]/10 border-[#DFFF00] text-white'
                : 'bg-white/5 border-white/10 text-neutral-500'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div className="flex items-center space-x-10">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-2 border-white/10 rounded-none flex items-center justify-center relative overflow-hidden group-hover:border-[#DFFF00]/50 transition-all duration-500 brutal-border">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon size={64} className="text-black" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#DFFF00] rounded-none flex items-center justify-center border-4 border-black shadow-xl brutal-border">
              <Shield size={18} className="text-black" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-4 text-[#DFFF00] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
              <Target size={14} />
              <span>Verified Identity // {user?.email}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none mb-4">
              {isEditing ? (
                <input 
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-transparent border-b-2 border-[#DFFF00] outline-none w-full"
                />
              ) : (
                <>
                  {user?.name?.split(' ')[0] || 'Engineer'} <span className="text-[#DFFF00]">{user?.name?.split(' ')[1] || 'Core'}.</span>
                </>
              )}
            </h1>
            <p className="text-neutral-600 font-black tracking-[0.2em] text-[10px] uppercase">
              {selectedDegree ? `${selectedDegree.shortTitle} // ` : ''}INFRASTRUCTURE_LEVEL_12 // {user?.role === 'admin' ? 'SYS_ADMIN' : 'SR_CANDIDATE'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all flex items-center gap-2"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)] flex items-center gap-2"
              >
                <Save size={16} />
                <span>Save Node</span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </button>
              <button 
                onClick={logout}
                className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-2"
              >
                <X size={16} />
                <span>Logout</span>
              </button>
            </>
          )}
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
            className="glass-card p-8 group overflow-hidden"
          >
            <stat.icon className={`${stat.color} mb-6`} size={24} />
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-[9px] font-black uppercase tracking-widest text-neutral-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Credentials Section */}
          <section className="glass-card p-12 relative overflow-hidden">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Shield className="text-[#DFFF00] mr-4" size={24} />
              Identity Credentials
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={e => setEditForm(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                  />
                ) : (
                  <div className="text-white font-bold">{user?.age || 'Not specified'}</div>
                )}
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    value={editForm.gender}
                    onChange={e => setEditForm(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select</option>
                    <option value="Male" className="bg-[#1a1a1a]">Male</option>
                    <option value="Female" className="bg-[#1a1a1a]">Female</option>
                    <option value="Other" className="bg-[#1a1a1a]">Other</option>
                  </select>
                ) : (
                  <div className="text-white font-bold">{user?.gender || 'Not specified'}</div>
                )}
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">DOB</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editForm.dob}
                    onChange={e => setEditForm(prev => ({ ...prev, dob: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                  />
                ) : (
                  <div className="text-white font-bold">{user?.dob || 'Not specified'}</div>
                )}
              </div>
            </div>
          </section>

          {/* Academic Profile Section */}
          <section className="glass-card p-12 relative overflow-hidden">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <GraduationCap className="text-[#DFFF00] mr-4" size={24} />
              Academic Profile
            </h2>
            
            <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Education Level</label>
                  {isEditing ? (
                    <select
                      value={editForm.educationLevel}
                      onChange={e => setEditForm(prev => ({ ...prev, educationLevel: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                    >
                      {educationLevels.map(level => (
                        <option key={level} value={level} className="bg-[#1a1a1a]">{level}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-white font-bold">{user?.educationLevel || 'Not specified'}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Stream / Background</label>
                  {isEditing ? (
                    <select
                      value={editForm.stream}
                      onChange={e => setEditForm(prev => ({ ...prev, stream: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                    >
                      {(editForm.educationLevel.includes('High') || editForm.educationLevel.includes('Secondary') ? streams.school : streams.college).map(stream => (
                        <option key={stream} value={stream} className="bg-[#1a1a1a]">{stream}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-white font-bold">{user?.stream || 'Not specified'}</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">Subjects Enjoyed</label>
                {isEditing ? (
                  renderMultiSelect('subjects', ['Mathematics', 'Biology', 'Physics', 'Chemistry', 'Computer Science', 'Business / Economics', 'History / Civics', 'Literature / Languages', 'Arts / Design'])
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user?.subjects?.split(',').filter(Boolean).map(s => (
                      <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white uppercase">{s}</span>
                    )) || <span className="text-neutral-500 italic">None specified</span>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">Career Interests</label>
                {isEditing ? (
                  renderMultiSelect('careerInterests', ['Software / IT', 'Doctor / Healthcare', 'Business / Entrepreneurship', 'Government Jobs', 'Research / Scientist', 'Design / Creative', 'Law', 'Teaching', 'Finance', 'Not Sure Yet'])
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user?.careerInterests?.split(',').filter(Boolean).map(s => (
                      <span key={s} className="px-3 py-1 bg-[#DFFF00]/10 border border-[#DFFF00]/20 rounded-full text-[10px] font-bold text-[#DFFF00] uppercase">{s}</span>
                    )) || <span className="text-neutral-500 italic">None specified</span>}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Main Goal</label>
                  {isEditing ? (
                    <select
                      value={editForm.mainGoal}
                      onChange={e => setEditForm(prev => ({ ...prev, mainGoal: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                    >
                      {['Explore different degrees', 'Decide my career path', 'Prepare for entrance exams', 'Learn skills', 'Just curious'].map(g => (
                        <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-white font-bold">{user?.mainGoal || 'Not specified'}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Study Location</label>
                  {isEditing ? (
                    <select
                      value={editForm.studyLocation}
                      onChange={e => setEditForm(prev => ({ ...prev, studyLocation: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                    >
                      {['India', 'Abroad', 'Either is fine', 'Not decided'].map(l => (
                        <option key={l} value={l} className="bg-[#1a1a1a]">{l}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-white font-bold">{user?.studyLocation || 'Not specified'}</div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Budget Preference</label>
                  {isEditing ? (
                    <select
                      value={editForm.budgetPreference}
                      onChange={e => setEditForm(prev => ({ ...prev, budgetPreference: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                    >
                      {['Low-cost / Government colleges', 'Medium budget', 'Premium / Private / Abroad', 'Not sure'].map(b => (
                        <option key={b} value={b} className="bg-[#1a1a1a]">{b}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-white font-bold">{user?.budgetPreference || 'Not specified'}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Confusion Level</label>
                  {isEditing ? (
                    <select
                      value={editForm.confusionLevel}
                      onChange={e => setEditForm(prev => ({ ...prev, confusionLevel: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                    >
                      {['😵 Very confused', '🤔 Somewhat clear', '😎 Very clear'].map(c => (
                        <option key={c} value={c} className="bg-[#1a1a1a]">{c}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-white font-bold">{user?.confusionLevel || 'Not specified'}</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">Learning Style</label>
                {isEditing ? (
                  renderMultiSelect('learningStyle', ['visual', 'auditory', 'reading', 'kinesthetic'])
                ) : (
                  <div className="flex gap-4">
                    {user?.learningStyle?.split(',').filter(Boolean).map(s => {
                      const style = learningStyles.find(ls => ls.id === s);
                      return (
                        <div key={s} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                          <span className="text-lg">{style?.icon}</span>
                          <span className="text-[10px] font-bold text-white uppercase">{style?.label}</span>
                        </div>
                      );
                    }) || <span className="text-neutral-500 italic">None specified</span>}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Excitement Factor</label>
                  {isEditing ? (
                    <select
                      value={editForm.excitementFactor}
                      onChange={e => setEditForm(prev => ({ ...prev, excitementFactor: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                    >
                      {['Solving problems', 'Helping people', 'Creating things', 'Leading teams', 'Analyzing data'].map(f => (
                        <option key={f} value={f} className="bg-[#1a1a1a]">{f}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-white font-bold">{user?.excitementFactor || 'Not specified'}</div>
                  )}
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-2">Personality Trigger</label>
                  {isEditing ? (
                    <select
                      value={editForm.personalityTrigger}
                      onChange={e => setEditForm(prev => ({ ...prev, personalityTrigger: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#DFFF00]/50"
                    >
                      {['I like logic & numbers', 'I like creativity & design', 'I like communication & people', 'I like research & deep thinking'].map(t => (
                        <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-white font-bold">{user?.personalityTrigger || 'Not specified'}</div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Bio Section */}
          <section className="glass-card p-12 relative overflow-hidden">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Zap className="text-[#DFFF00] mr-4" size={24} />
              Productivity Bio
            </h2>
            {isEditing ? (
              <textarea 
                value={editForm.bio}
                onChange={e => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none min-h-[120px]"
                placeholder="Tell us about your productivity focus..."
              />
            ) : (
              <p className="text-lg md:text-xl text-neutral-400 font-medium leading-relaxed italic border-l-4 border-[#DFFF00] pl-8">
                &quot;{user?.bio || "Analytical Systems Architect focused on high-velocity output and scalable productivity frameworks. Currently optimizing deep work cycles and task orchestration."}&quot;
              </p>
            )}
            <div className="mt-10 flex flex-wrap gap-3">
              {["Deep Work", "Systems Design", "Velocity", "Focus"].map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-neutral-500">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Selected Degree Section */}
          {selectedDegree && (
            <section className="glass-card p-12 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center">
                  <GraduationCap className="text-[#DFFF00] mr-4" size={24} />
                  Academic Enrollment
                </h2>
                <Link to="/degree" className="text-[10px] font-black uppercase tracking-widest text-[#DFFF00] hover:underline">View Roadmap</Link>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-4xl border border-white/10">
                  {selectedDegree.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">{selectedDegree.title}</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{selectedDegree.duration} Program</div>
                </div>
              </div>
            </section>
          )}

          {/* Connected Accounts */}
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Layout className="text-[#DFFF00] mr-4" size={24} />
              Connected Nodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'github', label: 'GitHub', icon: Github, value: user?.github || '@saravanaskv', color: 'hover:text-white' },
                { id: 'twitter', label: 'Twitter', icon: Twitter, value: user?.twitter || '@saravana_dev', color: 'hover:text-[#1DA1F2]' },
                { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, value: user?.linkedin || 'saravana-jenkins', color: 'hover:text-[#0A66C2]' },
              ].map((account, i) => (
                <div key={i} className="glass-card p-6 flex flex-col gap-4 group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <account.icon size={20} className={`text-neutral-500 transition-colors ${account.color}`} />
                      <div className="text-[10px] font-black text-white uppercase tracking-tight">{account.label}</div>
                    </div>
                    <ArrowUpRight size={16} className="text-neutral-800 group-hover:text-white transition-colors" />
                  </div>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={editForm[account.id as keyof typeof editForm]}
                      onChange={e => setEditForm(prev => ({ ...prev, [account.id]: e.target.value }))}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white outline-none"
                      placeholder={`Your ${account.label} handle`}
                    />
                  ) : (
                    <div className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">{account.value}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Achievements & Activity */}
        <div className="lg:col-span-4 space-y-12">
          <section className="glass-card p-10">
            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Award className="text-[#DFFF00] mr-4" size={20} />
              Achievements
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center border transition-all ${i <= 3 ? 'bg-[#DFFF00]/10 border-[#DFFF00]/20 text-[#DFFF00]' : 'bg-white/5 border-white/5 text-neutral-800'}`}>
                  <Award size={24} className={i <= 3 ? 'animate-pulse' : ''} />
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-neutral-600 hover:text-white hover:bg-white/5 transition-all">
              View All Badges
            </button>
          </section>

          <section className="glass-card p-10">
            <h2 className="text-xl font-black uppercase tracking-tight text-white mb-8 flex items-center">
              <Clock className="text-[#DFFF00] mr-4" size={20} />
              Activity Log
            </h2>
            <div className="space-y-8">
              {[
                { action: 'Completed Task', target: 'UI Refactor', time: '2h ago' },
                { action: 'Updated Habit', target: 'Deep Work', time: '5h ago' },
                { action: 'Synced Data', target: 'Cloud Node', time: '1d ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-[#DFFF00] mt-1.5 shadow-[0_0_10px_rgba(223,255,0,0.5)]"></div>
                  <div>
                    <div className="text-[11px] font-black text-white uppercase tracking-tight">{activity.action}</div>
                    <div className="text-[10px] text-neutral-500 font-medium mb-1">{activity.target}</div>
                    <div className="text-[8px] text-neutral-700 font-black uppercase tracking-widest">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
