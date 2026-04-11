
import React from 'react';
import { Link } from 'react-router-dom';
import { Command, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-24 px-6 lg:px-20 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-32">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#DFFF00] rounded-lg flex items-center justify-center text-black group-hover:rotate-12 transition-transform">
                <Command size={24} />
              </div>
              <span className="text-white font-black tracking-tighter text-2xl uppercase">
                GUIDE
              </span>
            </Link>
            <p className="text-neutral-500 font-medium leading-relaxed max-w-xs">
              Comprehensive learning platform designed to help students achieve academic excellence.
            </p>
            <div className="flex gap-6">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-neutral-600 hover:text-[#DFFF00] transition-colors">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Platform",
              links: ["Features", "Courses", "Dashboard", "Analytics", "Support"]
            },
            {
              title: "Company",
              links: ["About", "Careers", "Blog", "Press", "Contact"]
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security", "Cookies", "Licenses"]
            }
          ].map((column) => (
            <div key={column.title} className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white underline decoration-[#DFFF00] decoration-2 underline-offset-8">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">
            © 2026 GUIDE LEARNING. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-12">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#DFFF00] rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">PLATFORM_ACTIVE</span>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
