
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
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
      await login({ email, password, isRegister: !isLogin, name: name || undefined });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || err?.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabSwitch = (loginTab: boolean) => {
    setIsLogin(loginTab);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(201,255,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
      />
      {/* Subtle dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* ── LOGO ── */}
      <div style={{ marginBottom: '48px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 900,
            letterSpacing: '-2px',
            color: '#ffffff',
            margin: 0,
            lineHeight: 1,
          }}
        >
          GUIDE
          <span style={{ color: '#c8ff00' }}>.</span>
        </h1>
        <p
          style={{
            marginTop: '10px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.28em',
            color: '#555',
            textTransform: 'uppercase',
          }}
        >
          Productivity Infrastructure
        </p>
      </div>

      {/* ── CARD ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          padding: '36px 36px 40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ── TAB SWITCHER ── */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '5px',
            marginBottom: '32px',
          }}
        >
          <button
            onClick={() => handleTabSwitch(true)}
            style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: '9px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              background: isLogin ? '#c8ff00' : 'transparent',
              color: isLogin ? '#000' : '#555',
              boxShadow: isLogin ? '0 0 16px rgba(200,255,0,0.35)' : 'none',
            }}
          >
            Login
          </button>
          <button
            onClick={() => handleTabSwitch(false)}
            style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: '9px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              background: !isLogin ? '#c8ff00' : 'transparent',
              color: !isLogin ? '#000' : '#555',
              boxShadow: !isLogin ? '0 0 16px rgba(200,255,0,0.35)' : 'none',
            }}
          >
            Register
          </button>
        </div>

        {/* ── FORM ── */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Name field (register only) */}
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <input
                id="register-name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required={!isLogin}
                style={inputStyle}
                onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
                onBlur={e => Object.assign(e.currentTarget.style, inputBlurStyle)}
              />
            </div>
          )}

          {/* Email */}
          <div style={{ position: 'relative' }}>
            <input
              id="login-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => Object.assign(e.currentTarget.style, inputFocusStyle)}
              onBlur={e => Object.assign(e.currentTarget.style, inputBlurStyle)}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative' }}>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ ...inputStyle, paddingRight: '52px' }}
              onFocus={e => Object.assign(e.currentTarget.style, { ...inputFocusStyle, paddingRight: '52px' })}
              onBlur={e => Object.assign(e.currentTarget.style, { ...inputBlurStyle, paddingRight: '52px' })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#555',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8ff00')}
              onMouseLeave={e => (e.currentTarget.style.color = '#555')}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <p
              style={{
                color: '#ff4d4d',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                margin: '4px 0 0',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            id="initialize-session-btn"
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '17px 0',
              background: isLoading ? 'rgba(200,255,0,0.6)' : '#c8ff00',
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 900,
              fontSize: '13px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 28px rgba(200,255,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
            onMouseEnter={e => {
              if (!isLoading) {
                e.currentTarget.style.boxShadow = '0 0 42px rgba(200,255,0,0.5)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 28px rgba(200,255,0,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Authenticating...
              </>
            ) : isLogin ? (
              'Initialize Session'
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>

      {/* ── BACK TO HOME ── */}
      <Link
        to="/"
        style={{
          marginTop: '36px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#444',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
          position: 'relative',
          zIndex: 10,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#c8ff00')}
        onMouseLeave={e => (e.currentTarget.style.color = '#444')}
      >
        <ArrowLeft size={15} />
        Back to Home
      </Link>

      {/* Keyframe for spinner */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// ── shared input styles ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '15px 18px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 500,
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  boxSizing: 'border-box',
};

const inputFocusStyle: React.CSSProperties = {
  borderColor: '#c8ff00',
  boxShadow: '0 0 0 3px rgba(200,255,0,0.1)',
};

const inputBlurStyle: React.CSSProperties = {
  borderColor: 'rgba(255,255,255,0.1)',
  boxShadow: 'none',
};
