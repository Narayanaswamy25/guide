
import React from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Target, Users, Zap, Shield } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#DFFF00] selection:text-black">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 lg:px-20 max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="text-[#DFFF00] font-black uppercase tracking-[0.3em] text-[10px] mb-6">
              Our Mission
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
              Empowering the next generation of <span className="text-[#DFFF00]">Academic Leaders</span>.
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
              GUIDE is more than just a platform; it&apos;s a movement to redefine how students navigate their academic journey. We combine cutting-edge technology with intuitive design to help you achieve your full potential.
            </p>
          </motion.div>
        </section>

        {/* Values Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-32">
          {[
            {
              icon: <Target className="text-[#DFFF00]" size={32} />,
              title: "Precision",
              desc: "Data-driven insights to guide your every academic decision."
            },
            {
              icon: <Users className="text-[#DFFF00]" size={32} />,
              title: "Community",
              desc: "Built for students, by students, fostering a culture of growth."
            },
            {
              icon: <Zap className="text-[#DFFF00]" size={32} />,
              title: "Velocity",
              desc: "Accelerate your learning with optimized roadmaps and tools."
            },
            {
              icon: <Shield className="text-[#DFFF00]" size={32} />,
              title: "Integrity",
              desc: "Your data is yours. We prioritize privacy and security above all."
            }
          ].map((value, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black p-12 flex flex-col gap-6 hover:bg-white/5 transition-colors group"
            >
              <div className="group-hover:scale-110 transition-transform duration-500">
                {value.icon}
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">{value.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">The Story Behind Guide</h2>
            <div className="space-y-6 text-neutral-400 leading-relaxed">
              <p>
                Founded in 2024, GUIDE started as a simple tool to help university students track their assignments. We quickly realized that the problem wasn&apos;t just tracking tasks—it was navigating the complex landscape of higher education.
              </p>
              <p>
                Today, GUIDE serves thousands of students across India, providing personalized degree roadmaps, skill tracking, and habit formation tools that actually work.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10 relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
              alt="Team working" 
              className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
