
import React from 'react';
import { 
  User, 
  Bell, 
  Monitor, 
  Globe, 
  Database, 
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme, Theme } from '../context/ThemeContext';

const sections = [
  {
    id: 'account',
    label: 'Account Settings',
    items: [
      { label: 'Profile Information', icon: User, desc: 'Update your academic profile and photo' },
      { label: 'Data & Privacy', icon: Database, desc: 'Export and manage your academic data' },
    ]
  },
  {
    id: 'system',
    label: 'System Preferences',
    items: [
      { label: 'Notifications', icon: Bell, desc: 'Configure assignment and event reminders' },
      { label: 'Appearance', icon: Monitor, desc: 'Customize your dashboard appearance' },
      { label: 'Language & Region', icon: Globe, desc: 'Set your timezone and language' },
    ]
  }
];

export const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { id: 'dark', label: 'Deep Black', icon: Moon },
    { id: 'light', label: 'High Contrast', icon: Sun },
    { id: 'system', label: 'System Sync', icon: Smartphone },
  ];

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
          <button className="px-6 py-3 bg-[#DFFF00] text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(223,255,0,0.2)]">
            Save Changes
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          {sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-6 px-4">
                {section.label}
              </h2>
              <div className="space-y-1">
                {section.items.map((item, i) => (
                  <button 
                    key={i}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.02] transition-all group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-neutral-500 group-hover:text-[#DFFF00] transition-colors">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-black text-white dark:text-white light:text-black uppercase tracking-tight group-hover:text-[#DFFF00] transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-neutral-600 font-medium mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-neutral-800 group-hover:text-white dark:group-hover:text-white light:group-hover:text-black transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-10 border-t border-white/5">
            <button 
              onClick={() => logout()}
              className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-500/5 transition-all group text-left"
            >
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
                <LogOut size={18} />
              </div>
              <div>
                <div className="text-sm font-black text-white dark:text-white light:text-black uppercase tracking-tight group-hover:text-red-500 transition-colors">
                  Deauthorize Session
                </div>
                <div className="text-[10px] text-neutral-600 font-medium mt-0.5">
                  Logout from this device
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Active Section Content */}
        <div className="lg:col-span-8 space-y-10">
          <section className="glass-card p-10 dark:bg-white/[0.02] light:bg-white light:border-neutral-200">
            <h3 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-black mb-10 flex items-center gap-3">
              <Monitor className="text-[#DFFF00]" size={20} />
              Appearance
            </h3>
            
            <div className="space-y-12">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-6 block">Theme Mode</label>
                <div className="grid grid-cols-3 gap-4">
                  {themeOptions.map((option) => (
                    <button 
                      key={option.id}
                      onClick={() => setTheme(option.id as Theme)}
                      className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 ${
                        theme === option.id 
                          ? 'bg-[#DFFF00]/5 border-[#DFFF00]/30 text-[#DFFF00]' 
                          : 'bg-white/[0.02] border-white/5 text-neutral-500 hover:border-white/10 light:bg-neutral-50 light:border-neutral-200'
                      }`}
                    >
                      <option.icon size={24} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-10 dark:bg-white/[0.02] light:bg-white light:border-neutral-200">
            <h3 className="text-xl font-black uppercase tracking-tight text-white dark:text-white light:text-black mb-10 flex items-center gap-3">
              <Globe className="text-[#DFFF00]" size={20} />
              Regional
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 block">Language</label>
                <select className="w-full bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-xl p-4 text-sm text-white light:text-black focus:outline-none focus:border-[#DFFF00]/30 transition-all">
                  <option>English (India)</option>
                  <option>English (US)</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 block">Timezone</label>
                <select className="w-full bg-white/[0.02] light:bg-neutral-50 border border-white/5 light:border-neutral-200 rounded-xl p-4 text-sm text-white light:text-black focus:outline-none focus:border-[#DFFF00]/30 transition-all">
                  <option>UTC+05:30 (IST - Kolkata)</option>
                  <option>UTC+00:00 (GMT)</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
