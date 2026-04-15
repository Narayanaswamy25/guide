
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Monitor, 
  Database, 
  LogOut,
  Moon,
  Sun,
  Smartphone,
  Shield,
  GraduationCap,
  Mail,
  Camera,
  Trash2,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme, Theme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

type SettingsTab = 'profile' | 'academic' | 'appearance' | 'notifications' | 'security';

export const Settings: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        name,
        bio,
        avatar
      });
      // Show success feedback if needed
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const themeOptions = [
    { id: 'dark', label: 'Deep Black', icon: Moon, desc: 'Optimized for focus and OLED screens' },
    { id: 'light', label: 'High Contrast', icon: Sun, desc: 'Maximum legibility for bright environments' },
    { id: 'system', label: 'System Sync', icon: Smartphone, desc: 'Follows your device preferences' },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ] as const;

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">
            System Configuration // Node: {user?.id}
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white dark:text-white light:text-black">
            Settings
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)] disabled:opacity-50 disabled:scale-100"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2 sticky top-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all group text-left relative ${
                activeTab === tab.id 
                  ? 'text-black' 
                  : 'hover:bg-white/5 text-neutral-500 hover:text-white dark:hover:text-white light:hover:text-black'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#DFFF00] rounded-xl shadow-[0_0_20px_rgba(223,255,0,0.15)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon size={18} className={`relative z-10 ${activeTab === tab.id ? 'text-black' : 'group-hover:text-[#DFFF00]'}`} />
              <span className="relative z-10 text-xs font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
          
          <div className="pt-6 mt-6 border-t border-white/5">
            <button 
              onClick={() => logout()}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-500/10 transition-all group text-left text-red-500"
            >
              <LogOut size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Logout</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <div className="glass-card p-10 dark:bg-white/[0.02] light:bg-white light:border-neutral-200 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'profile' && (
                  <div className="space-y-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white dark:text-white light:text-black">Profile Information</h3>
                      <Link to="/profile" className="text-[10px] font-black uppercase tracking-widest text-[#DFFF00] hover:underline">View Public Profile</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 items-start">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl overflow-hidden">
                          {avatar ? (
                            <img src={avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            user?.name.charAt(0)
                          )}
                        </div>
                        <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#DFFF00] text-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer">
                          <Camera size={18} />
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>

                      <div className="flex-1 grid md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                            <input 
                              type="text" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)}
                              className="input-field pl-12" 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                            <input type="email" value={user?.email} disabled className="input-field pl-12 opacity-50 cursor-not-allowed" />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600">Bio / Academic Interest</label>
                          <textarea 
                            className="input-field min-h-[100px] resize-none" 
                            placeholder="Tell us about your academic goals..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'academic' && (
                  <div className="space-y-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white dark:text-white light:text-black">Academic Preferences</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600 block">Current Degree Program</label>
                        <select className="w-full bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-xl p-4 text-sm text-white light:text-black focus:outline-none focus:border-[#DFFF00]/30 transition-all">
                          <option>B.Tech in Computer Science</option>
                          <option>B.E. in Software Engineering</option>
                          <option>B.Sc in Artificial Intelligence</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600 block">Academic Year</label>
                        <select className="w-full bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-xl p-4 text-sm text-white light:text-black focus:outline-none focus:border-[#DFFF00]/30 transition-all">
                          <option>First Year</option>
                          <option>Second Year</option>
                          <option>Third Year</option>
                          <option>Final Year</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600 block">Research Interests (Tags)</label>
                        <div className="flex flex-wrap gap-2">
                          {['Algorithms', 'ML', 'Web3', 'Cloud'].map(tag => (
                            <div key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2">
                              {tag}
                              <button className="text-neutral-600 hover:text-red-500"><X size={12} /></button>
                            </div>
                          ))}
                          <button className="px-4 py-2 border border-dashed border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-600 hover:border-[#DFFF00]/30 hover:text-[#DFFF00] transition-all">
                            + Add Tag
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white dark:text-white light:text-black">Interface Appearance</h3>
                    
                    <div className="space-y-8">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600 mb-6 block">Theme Mode</label>
                        <div className="grid md:grid-cols-3 gap-4">
                          {themeOptions.map((option) => (
                            <button 
                              key={option.id}
                              onClick={() => setTheme(option.id as Theme)}
                              className={`p-6 rounded-2xl border transition-all flex flex-col items-start text-left gap-4 relative overflow-hidden ${
                                theme === option.id 
                                  ? 'border-[#DFFF00]/30 text-[#DFFF00]' 
                                  : 'bg-white/[0.02] border-white/5 text-neutral-500 hover:border-white/10 light:bg-neutral-50 light:border-neutral-200'
                              }`}
                            >
                              {theme === option.id && (
                                <motion.div 
                                  layoutId="activeTheme"
                                  className="absolute inset-0 bg-[#DFFF00]/5"
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                              )}
                              <option.icon size={24} className={`relative z-10 ${theme === option.id ? 'text-[#DFFF00]' : 'text-neutral-600'}`} />
                              <div className="relative z-10">
                                <div className="text-[10px] font-black uppercase tracking-widest mb-1">{option.label}</div>
                                <div className="text-[8px] font-medium opacity-60 leading-tight">{option.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600 block">Language</label>
                          <select className="w-full bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-xl p-4 text-sm text-white light:text-black focus:outline-none focus:border-[#DFFF00]/30 transition-all">
                            <option>English (India)</option>
                            <option>English (US)</option>
                            <option>Hindi</option>
                          </select>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 light:text-neutral-600 block">Timezone</label>
                          <select className="w-full bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-xl p-4 text-sm text-white light:text-black focus:outline-none focus:border-[#DFFF00]/30 transition-all">
                            <option>UTC+05:30 (IST - Kolkata)</option>
                            <option>UTC+00:00 (GMT)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white dark:text-white light:text-black">Notification Matrix</h3>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'Assignment Deadlines', desc: 'Alerts for upcoming coursework submissions', enabled: true },
                        { label: 'Academic Events', desc: 'Reminders for workshops and seminars', enabled: true },
                        { label: 'System Updates', desc: 'New feature announcements and node status', enabled: false },
                        { label: 'Security Alerts', desc: 'Critical account and access notifications', enabled: true },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-2xl">
                          <div>
                            <div className="text-sm font-black text-white dark:text-white light:text-black uppercase tracking-tight">{item.label}</div>
                            <div className="text-[10px] text-neutral-500 light:text-neutral-600 font-medium mt-0.5">{item.desc}</div>
                          </div>
                          <button className={`w-12 h-6 rounded-full transition-all relative ${item.enabled ? 'bg-[#DFFF00]' : 'bg-neutral-800'}`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? 'left-7' : 'left-1'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white dark:text-white light:text-black">Security & Access</h3>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-neutral-500">
                            <Lock size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-black text-white dark:text-white light:text-black uppercase tracking-tight">Two-Factor Authentication</div>
                            <div className="text-[10px] text-neutral-500 light:text-neutral-600 font-medium mt-0.5">Add an extra layer of security to your node</div>
                          </div>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-[#DFFF00] hover:underline">Enable</button>
                      </div>

                      <div className="p-6 bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-neutral-500">
                            <Database size={18} />
                          </div>
                          <div>
                            <div className="text-sm font-black text-white dark:text-white light:text-black uppercase tracking-tight">Data Export</div>
                            <div className="text-[10px] text-neutral-500 light:text-neutral-600 font-medium mt-0.5">Download all your academic data in JSON format</div>
                          </div>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-[#DFFF00] hover:underline">Download</button>
                      </div>

                      <div className="pt-10 mt-10 border-t border-red-500/20">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-6">Danger Zone</h4>
                        <button className="flex items-center gap-3 p-4 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500/5 transition-all w-full md:w-auto">
                          <Trash2 size={18} />
                          <span className="text-xs font-black uppercase tracking-widest">Deactivate Academic Node</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const X: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
