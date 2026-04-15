
import { create } from 'zustand';
import api from '../lib/api';

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  progress: number;
  grade: string;
  nextDeadline: string;
  status: 'active' | 'completed' | 'upcoming';
  category: string;
  color: string;
}

interface CourseState {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  updateProgress: (id: string, progress: number) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/courses');
      set({ courses: response.data, isLoading: false, error: null });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      set({ error: err.response?.data?.error || 'Failed to fetch courses', isLoading: false });
    }
  },

  addCourse: async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      set(state => ({ courses: [response.data, ...state.courses] }));
    } catch (error) {
      console.error('Add course error:', error);
      throw error;
    }
  },

  updateCourse: async (id, updates) => {
    try {
      const response = await api.patch(`/courses/${id}`, updates);
      set(state => ({
        courses: state.courses.map(c => c.id === id ? response.data : c)
      }));
    } catch (error) {
      console.error('Update course error:', error);
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      await api.delete(`/courses/${id}`);
      set(state => ({
        courses: state.courses.filter(c => c.id !== id)
      }));
    } catch (error) {
      console.error('Delete course error:', error);
      throw error;
    }
  },

  updateProgress: async (id, progress) => {
    const status = progress === 100 ? 'completed' : 'active';
    await get().updateCourse(id, { progress, status });
  },
}));
