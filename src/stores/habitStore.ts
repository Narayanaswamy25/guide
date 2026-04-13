import { create } from 'zustand';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  orderBy,
  increment
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export interface Habit {
  id: string;
  userId: string;
  name: string;
  streak: number;
  completedToday: boolean;
  lastCompletedDate: string | null;
  createdAt: unknown;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  error: string | null;
  subscribeHabits: () => () => void;
  addHabit: (name: string) => Promise<void>;
  toggleHabit: (id: string) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  habits: [],
  isLoading: false,
  error: null,

  subscribeHabits: () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return () => {};

    set({ isLoading: true });
    const q = query(
      collection(db, 'habits'), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const habits = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Habit[];
      set({ habits, isLoading: false, error: null });
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'habits');
    });

    return unsubscribe;
  },

  addHabit: async (name) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      await addDoc(collection(db, 'habits'), {
        name,
        userId,
        streak: 0,
        completedToday: false,
        lastCompletedDate: null,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'habits');
    }
  },

  toggleHabit: async (id) => {
    try {
      const habit = get().habits.find(h => h.id === id);
      if (!habit) return;

      const habitRef = doc(db, 'habits', id);
      const today = new Date().toISOString().split('T')[0];
      const isCompleting = !habit.completedToday;

      await updateDoc(habitRef, {
        completedToday: isCompleting,
        streak: isCompleting ? increment(1) : increment(-1),
        lastCompletedDate: isCompleting ? today : habit.lastCompletedDate,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `habits/${id}`);
    }
  },

  deleteHabit: async (id) => {
    try {
      await deleteDoc(doc(db, 'habits', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `habits/${id}`);
    }
  },
}));

