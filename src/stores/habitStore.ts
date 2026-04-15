import { create } from 'zustand';
import api from '../lib/api';

export interface Habit {
  id: string;
  userId: string;
  name: string;
  streak: number;
  completedToday: boolean;
  lastCompletedDate: string | null;
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
  fetchHabits: () => Promise<void>;
  addHabit: (name: string) => Promise<void>;
  toggleHabit: (id: string) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  habits: [],
  isLoading: false,
  error: null,

  fetchHabits: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/habits');
      set({ habits: response.data, isLoading: false, error: null });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      set({ error: err.response?.data?.error || 'Failed to fetch habits', isLoading: false });
    }
  },

  addHabit: async (name) => {
    try {
      const response = await api.post('/habits', { name });
      set(state => ({ habits: [response.data, ...state.habits] }));
    } catch (error: unknown) {
      console.error('Add habit error:', error);
      throw error;
    }
  },

  toggleHabit: async (id) => {
    try {
      const habit = get().habits.find(h => h.id === id);
      if (!habit) return;

      const isCompleting = !habit.completedToday;
      const response = await api.patch(`/habits/${id}`, {
        completedToday: isCompleting,
        streak: isCompleting ? habit.streak + 1 : Math.max(0, habit.streak - 1),
        lastCompletedDate: isCompleting ? new Date().toISOString().split('T')[0] : habit.lastCompletedDate,
      });

      set(state => ({
        habits: state.habits.map(h => h.id === id ? response.data : h)
      }));
    } catch (error: unknown) {
      console.error('Toggle habit error:', error);
      throw error;
    }
  },

  deleteHabit: async (id) => {
    try {
      await api.delete(`/habits/${id}`);
      set(state => ({
        habits: state.habits.filter(h => h.id !== id)
      }));
    } catch (error: unknown) {
      console.error('Delete habit error:', error);
      throw error;
    }
  },
}));

