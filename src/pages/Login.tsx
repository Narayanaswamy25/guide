
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

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
    setIsLoading(true);
    try {
      if (isRegistering) {
        await register(formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { error?: string } } };
      const errorMessage = errorResponse.response?.data?.error || 'Authentication failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      <div className="w-full max-w-[460px] bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.07] rounded-[20px] p-12 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative z-10">
        <h2 className="text-white text-xl font-extrabold mb-3 uppercase tracking-[0.1em] text-center">
          {isRegistering ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-[#666] text-xs mb-8 font-medium text-center">
          {isRegistering 
            ? 'Join the platform to start tracking your academic progress.' 
            : 'Sign in to access your academic workspace and track your progress.'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <p className="text-[#ff4d4d] text-[11px] font-semibold text-center">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
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
              isRegistering ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase hover:text-[#c8ff00] transition-colors"
          >
            {isRegistering ? 'Already have an account? Sign In' : 'New here? Create an account'}
          </button>
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
