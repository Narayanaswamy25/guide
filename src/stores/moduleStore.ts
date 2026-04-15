
import { create } from 'zustand';
import api from '../lib/api';

interface ModuleState {
  completedModules: Record<string, number[]>; // key: degreeId_domainId, value: array of completed module indices
  isLoading: boolean;
  fetchCompletedModules: () => Promise<void>;
  markModuleComplete: (degreeId: string, domainId: string, moduleIdx: number) => Promise<void>;
  isQuizCompleted: (degreeId: string, domainId: string) => boolean;
  setQuizCompleted: (degreeId: string, domainId: string) => void;
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  completedModules: {},
  isLoading: false,

  fetchCompletedModules: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/roadmap');
      const modules = response.data;
      const completed: Record<string, number[]> = {};
      
      modules.forEach((m: { degreeId: string; domainId: string; moduleIdx: number }) => {
        const key = `${m.degreeId}_${m.domainId}`;
        if (!completed[key]) completed[key] = [];
        completed[key].push(m.moduleIdx);
      });
      
      set({ completedModules: completed, isLoading: false });
    } catch (error) {
      console.error('Fetch modules error:', error);
      set({ isLoading: false });
    }
  },

  markModuleComplete: async (degreeId, domainId, moduleIdx) => {
    try {
      await api.post('/roadmap/complete', { degreeId, domainId, moduleIdx });
      
      const key = `${degreeId}_${domainId}`;
      const current = get().completedModules[key] || [];
      if (!current.includes(moduleIdx)) {
        set({
          completedModules: {
            ...get().completedModules,
            [key]: [...current, moduleIdx]
          }
        });
      }
    } catch (error) {
      console.error('Mark module complete error:', error);
    }
  },

  isQuizCompleted: (degreeId, domainId) => {
    return localStorage.getItem(`quiz_completed_${degreeId}_${domainId}`) === 'true';
  },

  setQuizCompleted: (degreeId, domainId) => {
    localStorage.setItem(`quiz_completed_${degreeId}_${domainId}`, 'true');
  }
}));
