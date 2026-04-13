import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Clock, ArrowRight, ArrowLeft, Loader2, Zap, Brain, Target } from 'lucide-react';
import { getDegreeById, getDomainById } from '../data/degreesData';
import { getQuiz } from '../data/quizData';

export interface QuizState {
  score: number;
  answers: (number | null)[];
  totalQuestions: number;
}

export const QuizPage: React.FC = () => {
  const { degreeId, domainId } = useParams<{ degreeId: string; domainId: string }>();
  const navigate = useNavigate();
  const degree = getDegreeById(degreeId || '');
  const domain = getDomainById(degreeId || '', domainId || '');
  const rawQuiz = getQuiz(degreeId || '', domainId || '');

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  // Shuffle questions once on load
  const shuffledQuestions = useMemo(() => {
    if (!rawQuiz) return [];
    return [...rawQuiz.questions].sort(() => Math.random() - 0.5);
  }, [rawQuiz]);

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
  };

  const handleSubmit = useCallback(() => {
    const score = answers.reduce((acc, ans, i) => {
      return acc + (ans === shuffledQuestions[i].correctIndex ? 1 : 0);
    }, 0);

    navigate(`/explore/${degreeId}/${domainId}/result`, {
      state: { 
        score, 
        answers, 
        questions: shuffledQuestions, 
        domainTitle: domain?.title 
      },
    });
  }, [answers, shuffledQuestions, navigate, degreeId, domainId, domain]);

  const handleNext = useCallback(() => {
    if (currentQ < shuffledQuestions.length - 1) {
      setCurrentQ(q => q + 1);
    } else {
      handleSubmit();
    }
  }, [currentQ, shuffledQuestions.length, handleSubmit]);

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(q => q - 1);
    }
  };

  // Loading timer (15 seconds)
  useEffect(() => {
    const duration = 15000; // 15 seconds
    const interval = 100;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoading(false);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeLeft(30);
    }
  }, [currentQ, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, isLoading, handleNext]);

  if (!rawQuiz || !degree || !domain) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-6xl">📝</div>
        <h2 className="text-2xl font-black uppercase text-white">Quiz Not Available</h2>
        <p className="text-neutral-500 text-sm">No quiz found for this domain yet.</p>
        <Link to={`/explore/${degreeId}/${domainId}`} className="btn-primary">← Back to Roadmap</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 rounded-full border-t-2 border-r-2 border-[#c8ff00] border-l-2 border-l-transparent border-b-2 border-b-transparent"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain size={40} className="text-[#c8ff00] animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-4 max-w-md">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c8ff00]">
            Initializing Neural Assessment
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            Calibrating Questions
          </h2>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#c8ff00]"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-[9px] font-black uppercase tracking-widest text-neutral-600">
            Shuffling nodes // Generating unique sequence // {Math.round(loadingProgress)}%
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 opacity-40">
          <div className="flex flex-col items-center gap-2">
            <Zap size={20} className="text-[#c8ff00]" />
            <div className="text-[8px] font-black uppercase tracking-widest text-white">Dynamic</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Target size={20} className="text-[#c8ff00]" />
            <div className="text-[8px] font-black uppercase tracking-widest text-white">Precise</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={20} className="text-[#c8ff00] animate-spin" />
            <div className="text-[8px] font-black uppercase tracking-widest text-white">Secure</div>
          </div>
        </div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQ];
  const selected = answers[currentQ];
  const overallProgress = ((currentQ) / shuffledQuestions.length) * 100;
  const timerPct = (timeLeft / 30) * 100;
  const timerColor = timeLeft > 10 ? '#c8ff00' : '#ff4444';

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
        <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
        <ChevronRight size={12} />
        <Link to={`/explore/${degreeId}`} className="hover:text-white transition-colors">{degree.shortTitle}</Link>
        <ChevronRight size={12} />
        <Link to={`/explore/${degreeId}/${domainId}`} className="hover:text-white transition-colors">{domain.title}</Link>
        <ChevronRight size={12} />
        <span className="text-[#c8ff00]">Quiz</span>
      </div>

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c8ff00] mb-2">Assessment Module</div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">{rawQuiz.title}</h1>
        </div>
        <div className="text-right">
          <div className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-1">Question</div>
          <div className="text-2xl font-black text-white">{currentQ + 1}<span className="text-neutral-700">/{shuffledQuestions.length}</span></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${overallProgress}%` }}
            className="h-full bg-[#c8ff00] rounded-full"
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: timerColor }}>
          <Clock size={12} />
          {timeLeft}s remaining
        </div>
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${timerPct}%` }}
            className="h-full rounded-full transition-all"
            style={{ backgroundColor: timerColor }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-10 space-y-8"
        >
          <h2 className="text-2xl font-black text-white leading-snug">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-6 py-5 border rounded-2xl font-bold text-sm transition-all flex items-center gap-4 ${
                  selected === i
                    ? 'border-[#c8ff00] bg-[#c8ff00]/10 text-white'
                    : 'border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                  selected === i ? 'bg-[#c8ff00] text-black' : 'bg-white/5'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleBack}
              disabled={currentQ === 0}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selected === undefined || selected === null}
              className="flex-[2] btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-40"
            >
              {currentQ < shuffledQuestions.length - 1 ? 'Next Question' : 'Submit Assessment'}
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
