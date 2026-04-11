
export interface StreakData {
  current: number;
  longest: number;
  lastActivity: string;
}

export const getActivityData = (): Record<string, number> => {
  const saved = localStorage.getItem('cc_activity');
  return saved ? JSON.parse(saved) : {};
};

export const getStreakData = (): StreakData => {
  const saved = localStorage.getItem('cc_streak');
  return saved ? JSON.parse(saved) : { current: 0, longest: 0, lastActivity: '' };
};

export const logActivity = () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Update activity count
  const activity = getActivityData();
  activity[today] = (activity[today] || 0) + 1;
  localStorage.setItem('cc_activity', JSON.stringify(activity));
  
  // Update streak
  const streak = getStreakData();
  const lastDate = streak.lastActivity;
  
  if (lastDate === today) {
    // Already logged today, don't increment streak
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    if (lastDate === yesterdayStr) {
      streak.current += 1;
    } else {
      streak.current = 1;
    }
    
    if (streak.current > streak.longest) {
      streak.longest = streak.current;
    }
    
    streak.lastActivity = today;
    localStorage.setItem('cc_streak', JSON.stringify(streak));
  }
};

// Initialize some mock data if empty for demonstration
export const initializeMockActivity = () => {
  if (localStorage.getItem('cc_activity')) return;
  
  const activity: Record<string, number> = {};
  const today = new Date();
  
  for (let i = 0; i < 60; i++) {
    if (Math.random() > 0.4) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      activity[dateStr] = Math.floor(Math.random() * 8) + 1;
    }
  }
  
  localStorage.setItem('cc_activity', JSON.stringify(activity));
  localStorage.setItem('cc_streak', JSON.stringify({
    current: 5,
    longest: 12,
    lastActivity: today.toISOString().split('T')[0]
  }));
};
