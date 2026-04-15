import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { useTaskStore } from '../stores/taskStore';
import { useHabitStore } from '../stores/habitStore';
import { useCourseStore } from '../stores/courseStore';
import { useModuleStore } from '../stores/moduleStore';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  createdAt?: string;
  selectedDegree?: string;
  bio?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  focusHours?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const { fetchTasks } = useTaskStore();
  const { fetchHabits } = useHabitStore();
  const { fetchCourses } = useCourseStore();
  const { fetchCompletedModules } = useModuleStore();

  const initializeData = async () => {
    await Promise.all([
      fetchTasks(),
      fetchHabits(),
      fetchCourses(),
      fetchCompletedModules()
    ]);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/auth/me');
          setUser(response.data);
          initializeData();
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setIsAuthReady(true);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      initializeData();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await api.post('/auth/register', { email, password, name });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      initializeData();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    try {
      const response = await api.patch('/auth/profile', updates);
      setUser(response.data);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
      logout, 
      isAuthenticated: !!user, 
      isAuthReady, 
      updateProfile 
    }}>
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
