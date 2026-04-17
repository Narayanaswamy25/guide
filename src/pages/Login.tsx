
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    gender: '',
    dob: '',
    educationLevel: '',
    stream: '',
    subjects: [] as string[],
    careerInterests: [] as string[],
    mainGoal: '',
    learningStyle: [] as string[],
    studyLocation: '',
    budgetPreference: '',
    degreeAwareness: [] as string[],
    confusionLevel: 'Somewhat clear',
    excitementFactor: '',
    personalityTrigger: '',
  });

  const [surveyStep, setSurveyStep] = useState(1);
  const totalSurveySteps = 12;

  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering && step === 1) {
      setStep(2);
      return;
    }

    if (isRegistering && step === 2 && surveyStep < totalSurveySteps) {
      setSurveyStep(prev => prev + 1);
      return;
    }

    setIsLoading(true);
    try {
      if (isRegistering) {
        await register(formData.email, formData.password, formData.name, {
          age: formData.age ? parseInt(formData.age) : undefined,
          gender: formData.gender,
          dob: formData.dob,
          educationLevel: formData.educationLevel,
          stream: formData.stream,
          subjects: formData.subjects.join(','),
          careerInterests: formData.careerInterests.join(','),
          mainGoal: formData.mainGoal,
          learningStyle: formData.learningStyle.join(','),
          studyLocation: formData.studyLocation,
          budgetPreference: formData.budgetPreference,
          degreeAwareness: formData.degreeAwareness.join(','),
          confusionLevel: formData.confusionLevel,
          excitementFactor: formData.excitementFactor,
          personalityTrigger: formData.personalityTrigger,
        });
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { error?: string } } };
      const errorMessage = errorResponse.response?.data?.error || 'Authentication failed. Please try again.';
      setError(errorMessage);
      if (isRegistering && step === 2) {
        // Stay on survey if it fails, or go back if it's a critical error
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleMultiSelect = (field: keyof typeof formData, value: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const educationLevels = [
    'High School (8–10)',
    'Higher Secondary (11–12)',
    'Diploma',
    'Undergraduate (UG)',
    'Postgraduate (PG)',
    'Gap Year / Exploring',
  ];

  const streams = {
    school: ['Science', 'Commerce', 'Arts / Humanities', 'Vocational'],
    college: ['Engineering', 'Medical', 'Business', 'Arts', 'Science', 'Other']
  };

  const subjects = [
    'Mathematics', 'Biology', 'Physics', 'Chemistry', 'Computer Science', 
    'Business / Economics', 'History / Civics', 'Literature / Languages', 'Arts / Design'
  ];

  const careerInterests = [
    'Software / IT', 'Doctor / Healthcare', 'Business / Entrepreneurship', 
    'Government Jobs', 'Research / Scientist', 'Design / Creative', 
    'Law', 'Teaching', 'Finance', 'Not Sure Yet'
  ];

  const mainGoals = [
    'Explore different degrees', 'Decide my career path', 
    'Prepare for entrance exams', 'Learn skills', 'Just curious'
  ];

  const learningStyles = [
    { id: 'visual', label: 'Visual (videos, diagrams)', icon: '👀' },
    { id: 'auditory', label: 'Auditory (lectures, podcasts)', icon: '🎧' },
    { id: 'reading', label: 'Reading/Writing', icon: '📖' },
    { id: 'kinesthetic', label: 'Hands-on (practice, projects)', icon: '✋' },
  ];

  const studyLocations = ['India', 'Abroad', 'Either is fine', 'Not decided'];
  
  const budgetPreferences = [
    'Low-cost / Government colleges', 'Medium budget', 
    'Premium / Private / Abroad', 'Not sure'
  ];

  const degrees = ['B.Tech', 'MBBS', 'BBA', 'B.Des', 'B.Sc', 'BA', 'Law (LLB)', 'None / Not sure'];

  const confusionLevels = ['😵 Very confused', '🤔 Somewhat clear', '😎 Very clear'];

  const excitementFactors = ['Solving problems', 'Helping people', 'Creating things', 'Leading teams', 'Analyzing data'];

  const personalityTriggers = [
    'I like logic & numbers', 'I like creativity & design', 
    'I like communication & people', 'I like research & deep thinking'
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-[ellipse_at_center] from-[#c9ff000f] to-transparent pointer-events-none rounded-full" />
      
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.025)_1px,transparent_0)] bg-[length:28px_28px] pointer-events-none" />

      {/* ── LOGO ── */}
      <div className="mb-12 text-center relative z-10">
        <h1 className="text-[56px] font-black tracking-[-2px] text-white m-0 leading-none">
          GUIDE<span className="text-[#c8ff00]">.</span>
        </h1>
        <p className="mt-2.5 text-[10px] font-bold tracking-[0.28em] text-[#555] uppercase">
          Productivity Infrastructure
        </p>
      </div>

      {/* ── CARD ── */}
      <div className="w-full max-w-[520px] bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.07] rounded-[24px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative z-10 min-h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-white text-xl font-extrabold uppercase tracking-[0.1em]">
              {isRegistering ? (step === 1 ? 'Create Account' : 'Academic Profile') : 'Welcome Back'}
            </h2>
            <p className="text-[#666] text-[11px] font-medium mt-1 uppercase tracking-wider">
              {isRegistering 
                ? (step === 1 ? 'Step 01: Credentials' : `Survey: Question ${surveyStep} of ${totalSurveySteps}`) 
                : 'Authentication Required'}
            </p>
          </div>
          {isRegistering && (
            <div className="flex gap-1.5">
              <div className={`w-8 h-1 rounded-full transition-colors ${step === 1 ? 'bg-[#c8ff00]' : 'bg-[#c8ff00]/30'}`} />
              <div className={`w-8 h-1 rounded-full transition-colors ${step === 2 ? 'bg-[#c8ff00]' : 'bg-white/10'}`} />
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <p className="text-[#ff4d4d] text-[11px] font-semibold text-center">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
          {isRegistering && step === 2 ? (
            /* ── STEP 2: SURVEY (12 TABS) ── */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col">
              
              <div className="flex-1">
                {surveyStep === 1 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      🧑🎓 1. Current Education Level
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {educationLevels.map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, educationLevel: level }))}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.educationLevel === level
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 2 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      📚 2. Current Stream / Background
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {(formData.educationLevel.includes('High') || formData.educationLevel.includes('Secondary') ? streams.school : streams.college).map(stream => (
                        <button
                          key={stream}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, stream: stream }))}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.stream === stream
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">{stream}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 3 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      💡 3. Subjects You Enjoy Most (Multi-select)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {subjects.map(subject => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => toggleMultiSelect('subjects', subject)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.subjects.includes(subject)
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider">{subject}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 4 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      🚀 4. Career Interests (Multi-select)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {careerInterests.map(interest => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleMultiSelect('careerInterests', interest)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.careerInterests.includes(interest)
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider">{interest}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 5 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      🎯 5. Main Goal Right Now
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {mainGoals.map(goal => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, mainGoal: goal }))}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.mainGoal === goal
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">{goal}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 6 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      🧠 6. Learning Style (Multi-select)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {learningStyles.map(style => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => toggleMultiSelect('learningStyle', style.id)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            formData.learningStyle.includes(style.id)
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="block text-xl mb-1">{style.icon}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider">{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 7 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      🌍 7. Preferred Study Location
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {studyLocations.map(loc => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, studyLocation: loc }))}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.studyLocation === loc
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">{loc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 8 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      💰 8. Budget Preference
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {budgetPreferences.map(pref => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budgetPreference: pref }))}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.budgetPreference === pref
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">{pref}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 9 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      🏫 9. Degree Awareness Check
                    </label>
                    <p className="text-[10px] text-neutral-500 uppercase mb-4">Which of these degrees have you heard of?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {degrees.map(degree => (
                        <button
                          key={degree}
                          type="button"
                          onClick={() => toggleMultiSelect('degreeAwareness', degree)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.degreeAwareness.includes(degree)
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider">{degree}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 10 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      ❓ 10. Confusion Level
                    </label>
                    <p className="text-[10px] text-neutral-500 uppercase mb-4">How clear are you about your future?</p>
                    <div className="grid grid-cols-1 gap-3">
                      {confusionLevels.map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, confusionLevel: level }))}
                          className={`w-full p-5 rounded-xl border text-left transition-all ${
                            formData.confusionLevel === level
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-sm font-bold uppercase tracking-wider">{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 11 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      🔥 11. What excites you more?
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {excitementFactors.map(factor => (
                        <button
                          key={factor}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, excitementFactor: factor }))}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.excitementFactor === factor
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">{factor}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {surveyStep === 12 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-white uppercase tracking-widest mb-4">
                      🧪 12. Quick Personality Trigger
                    </label>
                    <p className="text-[10px] text-neutral-500 uppercase mb-4">Pick what sounds like you:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {personalityTriggers.map(trigger => (
                        <button
                          key={trigger}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, personalityTrigger: trigger }))}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            formData.personalityTrigger === trigger
                              ? 'bg-[#c8ff00]/10 border-[#c8ff00] text-white'
                              : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">{trigger}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-6 mt-auto">
                <button
                  type="button"
                  onClick={() => surveyStep === 1 ? setStep(1) : setSurveyStep(prev => prev - 1)}
                  className="flex-1 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-[11px] tracking-widest uppercase hover:bg-white/10 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] py-4 bg-[#c8ff00] text-black border-none rounded-xl font-black text-[13px] tracking-[0.15em] uppercase cursor-pointer transition-all shadow-[0_0_20px_rgba(200,255,0,0.2)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : (surveyStep === totalSurveySteps ? 'Complete Setup' : 'Next Question')}
                </button>
              </div>
            </div>
          ) : (
            /* ── STEP 1: BASIC INFO ── */
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isRegistering && (
                <>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        required
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 px-4 text-white text-sm focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <select
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 px-4 text-white text-sm focus:outline-none focus:border-[#c8ff00]/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-[#1a1a1a]">Gender</option>
                        <option value="Male" className="bg-[#1a1a1a]">Male</option>
                        <option value="Female" className="bg-[#1a1a1a]">Female</option>
                        <option value="Other" className="bg-[#1a1a1a]">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      name="dob"
                      placeholder="Date of Birth"
                      required
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 px-4 text-white text-sm focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
                    />
                  </div>
                </>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#c8ff00] text-black border-none rounded-xl font-black text-[13px] tracking-[0.15em] uppercase cursor-pointer transition-all shadow-[0_0_20px_rgba(200,255,0,0.2)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  isRegistering ? 'Next: Academic Survey' : 'Sign In'
                )}
              </button>
            </div>
          )}
        </form>

        <div className="mt-8 text-center">
          {(!isRegistering || step === 1) && (
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setStep(1);
                setError('');
              }}
              className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase hover:text-[#c8ff00] transition-colors"
            >
              {isRegistering ? 'Already have an account? Sign In' : 'New here? Create an account'}
            </button>
          )}
        </div>
      </div>

      {/* ── BACK TO HOME ── */}
      <Link
        to="/"
        className="mt-9 flex items-center gap-2.5 text-[#444] text-[11px] font-bold tracking-[0.18em] uppercase no-underline transition-colors hover:text-[#c8ff00] relative z-10"
      >
        <ArrowLeft size={15} />
        Back to Home
      </Link>
    </div>
  );
};
