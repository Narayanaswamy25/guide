
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Mail, MessageSquare, Send, CheckCircle2, Plus, Minus, Globe, Cpu, Zap } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-bold group-hover:text-[#DFFF00] transition-colors">{question}</span>
        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${isOpen ? 'bg-[#DFFF00] text-black border-[#DFFF00]' : 'text-white'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    e.currentTarget.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#DFFF00] selection:text-black relative overflow-hidden">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-40 pb-20 px-6 lg:px-20 max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-[#DFFF00]" />
                <span className="text-[#DFFF00] font-black uppercase tracking-[0.4em] text-[10px]">Contact Us</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-0">
                Let&apos;s build the <br />
                <span className="text-[#DFFF00] inline-block hover:skew-x-6 transition-transform duration-500 cursor-default">Future</span> together.
              </h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 pb-4"
            >
              <p className="text-neutral-400 text-lg leading-relaxed border-l-2 border-[#DFFF00] pl-8">
                Have a question or want to collaborate? Our team is here to help you navigate your academic journey.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-40">
          {/* Left: Contact Modules */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <Mail size={20} />, label: "Email Us", value: "hello@guide.io", desc: "General inquiries and feedback" },
                { icon: <MessageSquare size={20} />, label: "Support", value: "support@guide.io", desc: "Technical assistance & help" },
                { icon: <Globe size={20} />, label: "Office", value: "Bangalore, IN", desc: "Tech Hub, India" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="group p-8 bg-white/[0.02] border border-white/10 rounded-sm hover:bg-white/[0.05] hover:border-[#DFFF00]/50 transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-white/5 rounded-sm flex items-center justify-center text-[#DFFF00] group-hover:bg-[#DFFF00] group-hover:text-black transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">{item.label}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-black tracking-tight">{item.value}</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-widest">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* System Status Card */}
            <div className="p-8 bg-[#DFFF00] text-black rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <Cpu size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Response Time</span>
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">Average Response: 2.4h</h4>
                <p className="text-sm font-bold leading-relaxed opacity-80">
                  Our support team is currently active. You can expect a response within a few hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Submission Terminal */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 bg-white/[0.02] border border-white/10 rounded-sm relative"
            >
              <div className="absolute top-0 right-0 p-6">
                <Zap size={24} className="text-[#DFFF00] opacity-20" />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-black border border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:border-[#DFFF00] focus:ring-1 focus:ring-[#DFFF00] transition-all placeholder:text-neutral-700"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-black border border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:border-[#DFFF00] focus:ring-1 focus:ring-[#DFFF00] transition-all placeholder:text-neutral-700"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-1">Subject</label>
                  <div className="relative">
                    <select className="w-full bg-black border border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:border-[#DFFF00] focus:ring-1 focus:ring-[#DFFF00] transition-all appearance-none cursor-pointer">
                      <option className="bg-neutral-900">General Inquiry</option>
                      <option className="bg-neutral-900">Technical Support</option>
                      <option className="bg-neutral-900">Partnership</option>
                      <option className="bg-neutral-900">Feedback</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                      <Plus size={16} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 ml-1">Message</label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full bg-black border border-white/10 rounded-sm px-6 py-4 focus:outline-none focus:border-[#DFFF00] focus:ring-1 focus:ring-[#DFFF00] transition-all resize-none placeholder:text-neutral-700"
                    placeholder="How can we help you?"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full py-6 rounded-sm font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 transition-all active:scale-[0.98] ${
                    isSubmitted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-black hover:bg-[#DFFF00]'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle2 size={18} />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mb-40">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px w-12 bg-[#DFFF00]" />
            <span className="text-[#DFFF00] font-black uppercase tracking-[0.4em] text-[10px]">FAQ</span>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            <FAQItem 
              question="How do I reset my academic roadmap?"
              answer="You can reset your roadmap from the Degree Settings page. Note that this will clear your current progress and allow you to re-select your domain and specialization."
            />
            <FAQItem 
              question="Is the platform free for students?"
              answer="Yes, the core features of GUIDE including roadmap tracking, task management, and basic analytics are completely free for verified students."
            />
            <FAQItem 
              question="Can I collaborate with other students?"
              answer="Currently, we are rolling out community features in beta. You can join study groups and share your progress with peers in the Community tab."
            />
            <FAQItem 
              question="How is my data secured?"
              answer="We use industry-standard encryption for all data transmissions and storage. Your personal academic data is never shared with third parties without your explicit consent."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

