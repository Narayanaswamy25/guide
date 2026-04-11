import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string; isRegister?: boolean; name?: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Mock Auth ─────────────────────────────────────────────────────────────────
// Backend is not running — using local mock so all features are accessible.
const MOCK_USER_KEY = 'guide_mock_user';

const createMockUser = (email: string, name?: string): User => ({
  id: `user_${Date.now()}`,
  name: name || email.split('@')[0],
  email,
  role: 'student',
  createdAt: new Date().toISOString(),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MOCK_USER_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(MOCK_USER_KEY);
    }
    setIsAuthReady(true);
  }, []);

  const login = async (credentials: { email: string; password: string; isRegister?: boolean; name?: string }) => {
    // Mock: accept any email + password (min 4 chars)
    if (!credentials.email || !credentials.password || credentials.password.length < 4) {
      throw new Error('Please enter a valid email and password (min 4 characters).');
    }
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    const mockUser = createMockUser(credentials.email, credentials.name);
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem(MOCK_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
