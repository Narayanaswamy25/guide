
import React from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Monitor, 
  Globe, 
  Database, 
  Key, 
  LogOut,
  ChevronRight,
  Zap,
  Layout,
  Moon,
  Sun,
  Smartphone,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sections = [
  {
    id: 'account',
    label: 'Account Settings',
    items: [
      { label: 'Profile Information', icon: User, desc: 'Update your academic profile and photo' },
      { label: 'Security & Authentication', icon: Shield, desc: 'Manage 2FA and login sessions' },
      { label: 'Billing & Subscription', icon: CreditCard, desc: 'Manage your account subscription' },
    ]
  },
  {
    id: 'workspace',
    label: 'Learning Preferences',
    items: [
      { label: 'Study Integrations', icon: Zap, desc: 'Connect external learning tools' },
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

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#DFFF00] mb-2">
            System Configuration // Node: {user?.id}
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Settings
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
            Reset Defaults
          </button>
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
                        <div className="text-sm font-black text-white uppercase tracking-tight group-hover:text-[#DFFF00] transition-colors">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-neutral-600 font-medium mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-neutral-800 group-hover:text-white transition-colors" />
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
                <div className="text-sm font-black text-white uppercase tracking-tight group-hover:text-red-500 transition-colors">
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
          <section className="glass-card p-10">
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-10 flex items-center gap-3">
              <Monitor className="text-[#DFFF00]" size={20} />
              Appearance
            </h3>
            
            <div className="space-y-12">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-6 block">Theme Mode</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'dark', label: 'Deep Black', icon: Moon, active: true },
                    { id: 'light', label: 'High Contrast', icon: Sun, active: false },
                    { id: 'system', label: 'System Sync', icon: Smartphone, active: false },
                  ].map((theme) => (
                    <button 
                      key={theme.id}
                      className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 ${
                        theme.active ? 'bg-[#DFFF00]/5 border-[#DFFF00]/30 text-[#DFFF00]' : 'bg-white/[0.02] border-white/5 text-neutral-500 hover:border-white/10'
                      }`}
                    >
                      <theme.icon size={24} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-6 block">Accent Color</label>
                <div className="flex items-center gap-4">
                  {['#DFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#4f46e5'].map((color) => (
                    <button 
                      key={color}
                      className={`w-10 h-10 rounded-full border-4 border-black shadow-xl transition-transform hover:scale-110 ${
                        color === '#DFFF00' ? 'ring-2 ring-[#DFFF00] ring-offset-4 ring-offset-black' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-6 border-t border-white/5">
                <div>
                  <div className="text-sm font-black text-white uppercase tracking-tight mb-1">Reduced Motion</div>
                  <div className="text-[10px] text-neutral-600 font-medium">Disable complex animations and transitions</div>
                </div>
                <button className="w-12 h-6 bg-neutral-800 rounded-full relative transition-colors hover:bg-neutral-700">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </section>

          <section className="glass-card p-10">
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-10 flex items-center gap-3">
              <Globe className="text-[#DFFF00]" size={20} />
              Regional
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 block">Language</label>
                <select className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#DFFF00]/30 transition-all">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 block">Timezone</label>
                <select className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#DFFF00]/30 transition-all">
                  <option>UTC-08:00 (Pacific Time)</option>
                  <option>UTC+00:00 (GMT)</option>
                  <option>UTC+01:00 (CET)</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
