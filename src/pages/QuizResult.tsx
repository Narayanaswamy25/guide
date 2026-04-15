import React from 'react';
import { motion } from 'motion/react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy, ChevronRight, Star } from 'lucide-react';

interface ResultState {
  score: number;
  answers: (number | null)[];
  questions: { question: string; options: string[]; correctIndex: number; explanation: string }[];
  domainTitle: string;
}

export const QuizResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { degreeId, domainId } = useParams<{ degreeId: string; domainId: string }>();
  const state = location.state as ResultState | null;

  // Save completion status
  React.useEffect(() => {
    if (state) {
      const { score, questions } = state;
      const total = questions.length;
      const pct = Math.round((score / total) * 100);
      if (pct >= 50) { // Assuming 50% is passing
        localStorage.setItem(`quiz_completed_${degreeId}_${domainId}`, 'true');
      }
    }
  }, [state, degreeId, domainId]);

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-6xl">🤔</div>
        <h2 className="text-2xl font-black uppercase text-white">No Results Found</h2>
        <Link to="/explore" className="btn-primary">← Back to Explore</Link>
      </div>
    );
  }

  const { score, answers, questions } = state;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);

  const badge = pct >= 90 ? { label: 'Outstanding!', color: '#c8ff00', icon: '🏆', desc: 'Exceptional knowledge — you\'re ready for this domain!' } :
    pct >= 70 ? { label: 'Good Work!', color: '#22c55e', icon: '⭐', desc: 'Solid understanding. Keep practising the missed areas.' } :
    pct >= 50 ? { label: 'Keep Going!', color: '#f97316', icon: '💪', desc: 'You\'re on the right track. Revisit the roadmap modules.' } :
    { label: 'Needs Work', color: '#ef4444', icon: '📚', desc: 'Don\'t give up! Go back to the videos and try again.' };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-600">
        <Link to="/explore" className="hover:text-white">Explore</Link>
        <ChevronRight size={12} />
        <span className="text-[#c8ff00]">Quiz Result</span>
      </div>

      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center relative overflow-hidden"
        style={{ borderColor: `${badge.color}30` }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at center, ${badge.color}10 0%, transparent 70%)`
        }} />
        <div className="relative z-10">
          <div className="text-6xl mb-4">{badge.icon}</div>
          <div
            className="text-8xl font-black mb-2 leading-none"
            style={{ color: badge.color }}
          >
            {pct}%
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">
            {score} / {total} Correct
          </div>
          <div className="text-3xl font-black uppercase tracking-tighter text-white mb-3" style={{ color: badge.color }}>
            {badge.label}
          </div>
          <p className="text-neutral-400 text-sm max-w-sm mx-auto">{badge.desc}</p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5].map(s => (
              <Star
                key={s}
                size={20}
                className={s <= Math.ceil(pct / 20) ? 'text-[#c8ff00]' : 'text-neutral-700'}
                fill={s <= Math.ceil(pct / 20) ? '#c8ff00' : 'none'}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/explore/${degreeId}/${domainId}/quiz`)}
          className="btn-secondary flex items-center gap-2 flex-1 justify-center"
        >
          <RotateCcw size={16} /> Retake Quiz
        </button>
        <button
          onClick={() => navigate(`/explore/${degreeId}/${domainId}`)}
          className="btn-primary flex items-center gap-2 flex-1 justify-center"
        >
          Back to Roadmap <ArrowRight size={16} />
        </button>
      </div>

      {/* Question Review */}
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-4 flex items-center gap-2">
          <Trophy size={12} className="text-[#c8ff00]" /> Question Review
        </div>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const userAns = answers[i];
            const correct = userAns === q.correctIndex;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card p-6"
                style={{ borderColor: correct ? '#c8ff0020' : '#ef444420' }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${correct ? 'bg-[#c8ff00] text-black' : 'bg-red-500/20 text-red-400'}`}>
                    {correct ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-[8px] font-black uppercase tracking-widest text-neutral-600 mb-1">Q{i + 1}</div>
                    <p className="text-white font-bold text-sm">{q.question}</p>
                  </div>
                </div>
                <div className="space-y-2 ml-10">
                  {q.options.map((opt, oi) => {
                    const isCorrect = oi === q.correctIndex;
                    const isUser = oi === userAns;
                    return (
                      <div
                        key={oi}
                        className={`text-xs px-3 py-2 rounded-lg border font-medium ${
                          isCorrect ? 'border-[#c8ff00]/40 text-[#c8ff00] bg-[#c8ff00]/5' :
                          isUser && !isCorrect ? 'border-red-500/40 text-red-400 bg-red-500/5' :
                          'border-white/5 text-neutral-600'
                        }`}
                      >
                        {isCorrect ? '✓ ' : isUser && !isCorrect ? '✗ ' : ''}{opt}
                      </div>
                    );
                  })}
                  <div className="mt-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#c8ff00]">Explanation: </span>
                    <span className="text-xs text-neutral-400">{q.explanation}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
