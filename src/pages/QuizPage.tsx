import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
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
  const quiz = getQuiz(degreeId || '', domainId || '');

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleConfirm = useCallback(() => {
    if (!quiz) return;
    if (confirmed) return;
    setConfirmed(true);
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQ < quiz.questions.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
        setConfirmed(false);
        setTimeLeft(30);
      } else {
        // Go to result
        const score = newAnswers.reduce((acc, ans, i) => {
          return acc + (ans === quiz.questions[i].correctIndex ? 1 : 0);
        }, 0);
        navigate(`/explore/${degreeId}/${domainId}/result`, {
          state: { score, answers: newAnswers, questions: quiz.questions, domainTitle: domain?.title },
        });
      }
    }, 1200);
  }, [confirmed, quiz, answers, selected, currentQ, navigate, degreeId, domainId, domain]);

  useEffect(() => {
    setTimeLeft(30);
  }, [currentQ]);

  useEffect(() => {
    if (confirmed) return;
    if (timeLeft <= 0) {
      handleConfirm();
      return;
    }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, confirmed, handleConfirm]);

  if (!quiz || !degree || !domain) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-6xl">📝</div>
        <h2 className="text-2xl font-black uppercase text-white">Quiz Not Available</h2>
        <p className="text-neutral-500 text-sm">No quiz found for this domain yet.</p>
        <Link to={`/explore/${degreeId}/${domainId}`} className="btn-primary">← Back to Roadmap</Link>
      </div>
    );
  }

  const question = quiz.questions[currentQ];
  const overallProgress = ((currentQ) / quiz.questions.length) * 100;
  const timerPct = (timeLeft / 30) * 100;
  const timerColor = timeLeft > 10 ? '#c8ff00' : '#ff4444';

  const optionStyle = (optIdx: number): string => {
    if (!confirmed) {
      return selected === optIdx
        ? 'border-[#c8ff00] bg-[#c8ff00]/10 text-white'
        : 'border-white/10 text-neutral-400 hover:border-white/20 hover:text-white';
    }
    if (optIdx === question.correctIndex) return 'border-green-500 bg-green-500/10 text-green-400';
    if (optIdx === selected && selected !== question.correctIndex) return 'border-red-500 bg-red-500/10 text-red-400';
    return 'border-white/5 text-neutral-600';
  };

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
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c8ff00] mb-2">Assessment Module</div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">{quiz.title}</h1>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-2">
          <span>Question {currentQ + 1} of {quiz.questions.length}</span>
          <span className="text-[#c8ff00]">{Math.round(overallProgress)}% Complete</span>
        </div>
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
                onClick={() => !confirmed && setSelected(i)}
                disabled={confirmed}
                className={`w-full text-left px-6 py-5 border rounded-2xl font-bold text-sm transition-all flex items-center gap-4 ${optionStyle(i)}`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black flex-shrink-0 ${
                  confirmed && i === question.correctIndex ? 'bg-green-500 text-black' :
                  confirmed && i === selected && selected !== question.correctIndex ? 'bg-red-500 text-white' :
                  selected === i ? 'bg-[#c8ff00] text-black' : 'bg-white/5'
                }`}>
                  {confirmed && i === question.correctIndex ? <CheckCircle2 size={14} /> :
                   confirmed && i === selected && selected !== question.correctIndex ? <XCircle size={14} /> :
                   String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {/* Explanation (after confirm) */}
          {confirmed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white/[0.03] border border-white/10 rounded-xl"
            >
              <div className="text-[8px] font-black uppercase tracking-widest text-[#c8ff00] mb-2">Explanation</div>
              <p className="text-sm text-neutral-300 leading-relaxed">{question.explanation}</p>
            </motion.div>
          )}

          {/* Confirm Button */}
          {!confirmed && (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-40"
            >
              {currentQ < quiz.questions.length - 1 ? 'Confirm & Next' : 'Submit Quiz'}
              <ArrowRight size={16} />
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
