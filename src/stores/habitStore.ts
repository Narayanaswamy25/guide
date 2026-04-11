import { create } from 'zustand';
import api from '../lib/api';

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
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
      const res = await api.get('/habits');
      set({ habits: res.data, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch habits', isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  addHabit: async (name) => {
    try {
      const res = await api.post('/habits', { name });
      set((state) => ({ habits: [...state.habits, res.data] }));
    } catch (error) {
      console.error('Add habit error', error);
    }
  },

  toggleHabit: async (id) => {
    try {
      const res = await api.put(`/habits/${id}/toggle`);
      set((state) => ({
        habits: state.habits.map(habit => habit.id === id ? res.data : habit)
      }));
    } catch (error) {
      console.error('Toggle habit error', error);
    }
  },

  deleteHabit: async (id) => {
    try {
      await api.delete(`/habits/${id}`);
      set((state) => ({ habits: state.habits.filter(habit => habit.id !== id) }));
    } catch (error) {
      console.error('Delete habit error', error);
    }
  },
}));

// Poll (fetch on mount)
useHabitStore.getState().fetchHabits();

