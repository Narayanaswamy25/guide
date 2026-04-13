import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: unknown): string {
  if (!timestamp) return 'Just now';
  
  // Handle Firestore Timestamp
  if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp && typeof (timestamp as { toDate: () => Date }).toDate === 'function') {
    return (timestamp as { toDate: () => Date }).toDate().toLocaleDateString();
  }
  
  // Handle JS Date or string
  const date = new Date(timestamp as string | number | Date);
  if (isNaN(date.getTime())) return 'Just now';
  
  return date.toLocaleDateString();
}
