import { create } from 'zustand';
import api from '../lib/api';

export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  userId: string;
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
  addTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
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
      const response = await api.get('/tasks');
      set({ tasks: response.data, isLoading: false, error: null });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      set({ error: err.response?.data?.error || 'Failed to fetch tasks', isLoading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      set(state => ({ tasks: [response.data, ...state.tasks] }));
    } catch (error: unknown) {
      console.error('Add task error:', error);
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    try {
      const response = await api.patch(`/tasks/${id}`, updates);
      set(state => ({
        tasks: state.tasks.map(t => t.id === id ? response.data : t)
      }));
    } catch (error: unknown) {
      console.error('Update task error:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      set(state => ({
        tasks: state.tasks.filter(t => t.id !== id)
      }));
    } catch (error: unknown) {
      console.error('Delete task error:', error);
      throw error;
    }
  },

  moveTask: async (id, newStatus) => {
    await get().updateTask(id, { status: newStatus });
  },
}));

// Initial fetch after auth (called from AuthContext)

