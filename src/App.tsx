
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Habits } from './pages/Habits';
import { Analytics } from './pages/Analytics';
import { Calendar } from './pages/Calendar';
import { Degree } from './pages/Degree';
import { Courses } from './pages/Courses';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { ExploreDegrees } from './pages/ExploreDegrees';
import { DomainsList } from './pages/DomainsList';
import { RoadmapPage } from './pages/RoadmapPage';
import { QuizPage } from './pages/QuizPage';
import { QuizResult } from './pages/QuizResult';
import { ExtraSkills } from './pages/ExtraSkills';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isAuthReady } = useAuth();
  const [showRetry, setShowRetry] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthReady) setShowRetry(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [isAuthReady]);
  
  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-10 border-2 border-[#DFFF00]/20 border-t-[#DFFF00] rounded-full animate-spin"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#DFFF00] font-black uppercase tracking-[0.3em] text-[10px]">
              Initializing Platform
            </div>
            {showRetry && (
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
              >
                Platform Timeout - Retry Loading
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" />;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
      <Route path="/habits" element={<ProtectedRoute><Habits /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      <Route path="/degree" element={<ProtectedRoute><Degree /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      {/* ── India College Guide ── */}
      <Route path="/explore" element={<ProtectedRoute><ExploreDegrees /></ProtectedRoute>} />
      <Route path="/explore/:degreeId" element={<ProtectedRoute><DomainsList /></ProtectedRoute>} />
      <Route path="/explore/:degreeId/:domainId" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
      <Route path="/explore/:degreeId/:domainId/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/explore/:degreeId/:domainId/result" element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />
      <Route path="/extra-skills" element={<ProtectedRoute><ExtraSkills /></ProtectedRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#000000] selection:bg-[#DFFF00] selection:text-black">
            <AnimatedRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
