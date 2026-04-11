import { create } from 'zustand';
import api from '../lib/api';

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'done' | 'canceled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (id: string, newStatus: TaskStatus) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get('/tasks');
      set({ tasks: res.data, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const res = await api.post('/tasks', taskData);
      set((state) => ({ tasks: [...state.tasks, res.data] }));
    } catch (error) {
      console.error('Add task error', error);
    }
  },

  updateTask: async (id, updates) => {
    try {
      await api.put(`/tasks/${id}`, updates);
      set((state) => ({
        tasks: state.tasks.map(task => task.id === id ? { ...task, ...updates } : task)
      }));
    } catch (error) {
      console.error('Update task error', error);
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      set((state) => ({ tasks: state.tasks.filter(task => task.id !== id) }));
    } catch (error) {
      console.error('Delete task error', error);
    }
  },

  moveTask: async (id, newStatus) => {
    await get().updateTask(id, { status: newStatus });
  },
}));

// Initial fetch after auth (called from AuthContext)

