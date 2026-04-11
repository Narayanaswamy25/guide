
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded text-neutral-400 hover:text-white transition-all focus:outline-none"
      aria-label="Toggle Theme"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
