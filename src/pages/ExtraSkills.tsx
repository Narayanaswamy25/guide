import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic, BookOpen, Users, FileText, MessageSquare, Brain, Star,
  Clock, ExternalLink
} from 'lucide-react';

interface SkillModule {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  youtubeId: string;
  tips: string[];
  duration: string;
}

const skillModules: SkillModule[] = [
  {
    id: 'communication',
    title: 'Communication Skills',
    description: 'Speak confidently in interviews, presentations and group discussions. Learn body language, tone, and articulation.',
    icon: Mic,
    color: '#c8ff00',
    youtubeId: 'AykYRO5d_lI',
    duration: '2.5 hrs',
    tips: [
      'Practice speaking in front of a mirror daily for 5–10 minutes',
      'Record yourself and listen back to identify improvement areas',
      'Read English newspapers aloud to improve fluency',
      'Use the STAR method (Situation, Task, Action, Result) in interviews',
      'Maintain eye contact and use open body language',
      'Pause before answering — take a breath to gather thoughts',
    ],
  },
  {
    id: 'aptitude',
    title: 'Aptitude & Reasoning',
    description: 'Master quantitative aptitude, logical reasoning, and verbal ability for campus placement tests like TCS, Infosys, Wipro.',
    icon: Brain,
    color: '#00e5ff',
    youtubeId: 'GTOWMsn_UE4',
    duration: '3 hrs',
    tips: [
      'Practice 20 aptitude questions daily from IndiaBix or PrepInsta',
      'Learn time & work, percentage, profit & loss, and ratio formulas by heart',
      'For logical reasoning — practice syllogisms, blood relations and seating arrangements',
      'Verbal: Learn 10 new vocabulary words daily',
      'Attempt full mock tests in timed conditions every weekend',
      'Analyze mistakes after each mock test — never repeat errors',
    ],
  },
  {
    id: 'group-discussion',
    title: 'Group Discussion (GD)',
    description: 'Learn how to initiate, lead, and conclude group discussions with confidence — a key round in campus placements.',
    icon: Users,
    color: '#f97316',
    youtubeId: 'X6hDh_LKFVQ',
    duration: '1.5 hrs',
    tips: [
      'Initiate the GD if you have good knowledge of the topic — bonus points!',
      'Listen carefully to others and build on their points respectfully',
      'Avoid interrupting speakers; wait for your turn patiently',
      'Use data and examples to support your arguments',
      'Help summarize the discussion at the end — show leadership',
      'Stay calm, avoid getting emotional or aggressive',
    ],
  },
  {
    id: 'resume',
    title: 'Resume Building',
    description: 'Create an ATS-friendly, professional resume that stands out to Indian recruiters at top tech companies.',
    icon: FileText,
    color: '#22c55e',
    youtubeId: 'y8YH0Qbu5h4',
    duration: '1 hr',
    tips: [
      'Keep your resume to 1 page as a fresher — recruiters spend avg 6 seconds on it',
      'Use action verbs: Built, Developed, Designed, Implemented, Optimized...',
      'Quantify achievements: "Improved loading speed by 40%" beats "Made app faster"',
      'List projects with GitHub links — they matter more than marks',
      'Use ATS-friendly templates (no tables, no images, no columns)',
      'Tailor your resume for each company — use keywords from the job description',
    ],
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    description: 'Crack technical and HR interviews at product and service companies with structured preparation strategies.',
    icon: MessageSquare,
    color: '#c8ff00',
    youtubeId: 'HG68Ymazo18',
    duration: '2 hrs',
    tips: [
      'Research the company thoroughly before every interview',
      'Prepare 3–5 strong project stories with technical depth',
      'Practice "Tell me about yourself" — keep it under 2 minutes',
      'For HR: Prepare answers for "Why this company?", "Strengths/Weaknesses", "Where do you see yourself in 5 years?"',
      'DSA is crucial for product companies — solve 150+ LeetCode problems minimum',
      'Ask 2–3 thoughtful questions at the end — it shows genuine interest',
    ],
  },
  {
    id: 'english',
    title: 'English for Engineers',
    description: 'Improve technical writing, email communication, and spoken English for the professional world.',
    icon: BookOpen,
    color: '#a855f7',
    youtubeId: 'MU3rYlMpvHI',
    duration: '2 hrs',
    tips: [
      'Watch English tech YouTube channels (Fireship, Traversy Media) without subtitles',
      'Write a daily journal in English — even 5 sentences helps',
      'Use Grammarly for professional emails and documents',
      'Learn email etiquette: Subject lines, CC/BCC, professional closing',
      'Practice technical documentation with clear, concise sentences',
      'Read tech blogs on Medium and DEV.to to absorb technical writing style',
    ],
  },
  {
    id: 'personality',
    title: 'Personality Development',
    description: 'Build confidence, positive mindset, time management, and emotional intelligence for personal and professional success.',
    icon: Star,
    color: '#ec4899',
    youtubeId: 'Unyw3mnFLOE',
    duration: '1.5 hrs',
    tips: [
      'Build a morning routine: Exercise, reading, and planning your day',
      'Practice gratitude — write 3 things you\'re grateful for each night',
      'Work on one skill deeply (deep work) rather than multitasking',
      'Read books: "Atomic Habits", "The 7 Habits of Highly Effective People", "Think and Grow Rich"',
      'Network on LinkedIn — connect with seniors, attend college tech fests',
      'Embrace failure as feedback, not defeat — every rejection is redirecting you',
    ],
  },
];

export const ExtraSkills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string>(skillModules[0].id);

  const active = skillModules.find(s => s.id === activeSkill)!;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c8ff00] mb-2">Extra Skills Lab</div>
        <h1 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
          Beyond<br /><span className="text-[#c8ff00]">Technical.</span>
        </h1>
        <p className="mt-4 text-neutral-400 text-sm max-w-2xl leading-relaxed">
          Technical skills get you the interview. <strong className="text-white">Soft skills get you the job.</strong> These modules prepare you for campus placements, HR rounds, group discussions, and professional life in India&apos;s tech industry.
        </p>
      </div>

      {/* Skill Selector Pills */}
      <div className="flex flex-wrap gap-3">
        {skillModules.map(skill => {
          const Icon = skill.icon;
          const isActive = activeSkill === skill.id;
          return (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(skill.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all ${
                isActive
                  ? 'text-black border-transparent'
                  : 'bg-transparent border-white/10 text-neutral-500 hover:border-white/20 hover:text-white'
              }`}
              style={isActive ? { background: skill.color, borderColor: skill.color } : {}}
            >
              <Icon size={12} />
              {skill.title}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSkill}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          {/* Video Panel */}
          <div className="space-y-4">
            <div className="glass-card overflow-hidden" style={{ borderColor: `${active.color}20` }}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: active.color }}>
                  <active.icon size={12} />
                  {active.title}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-neutral-600">
                    <Clock size={8} /> {active.duration}
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${active.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-neutral-600 hover:text-[#c8ff00] transition-colors"
                  >
                    <ExternalLink size={8} /> YouTube
                  </a>
                </div>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  key={active.youtubeId}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${active.youtubeId}?rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-6">
              <p className="text-neutral-400 text-sm leading-relaxed">{active.description}</p>
            </div>
          </div>

          {/* Tips Panel */}
          <div className="space-y-4">
            <div className="glass-card p-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-6 flex items-center gap-2">
                <Star size={12} style={{ color: active.color }} />
                Pro Tips for {active.title}
              </h3>
              <div className="space-y-3">
                {active.tips.map((tip, i) => (
                  <motion.div
                    key={tip}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black text-black mt-0.5"
                      style={{ background: active.color }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors leading-relaxed">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* All Skills Quick Nav */}
            <div className="glass-card p-6">
              <div className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-4">All Skill Modules</div>
              <div className="grid grid-cols-2 gap-2">
                {skillModules.map(skill => {
                  const SIcon = skill.icon;
                  return (
                    <button
                      key={skill.id}
                      onClick={() => setActiveSkill(skill.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                        activeSkill === skill.id
                          ? 'border-[#c8ff00]/30 bg-[#c8ff00]/5'
                          : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <SIcon size={12} style={{ color: activeSkill === skill.id ? skill.color : '#555' }} />
                      <span className={`text-[9px] font-black uppercase tracking-widest ${activeSkill === skill.id ? 'text-white' : 'text-neutral-600'}`}>
                        {skill.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
