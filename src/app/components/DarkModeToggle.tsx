"use client"; 

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.theme) {
      setTheme(localStorage.theme);
      document.documentElement.classList.add(localStorage.theme);
    } else {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemPreference);
      document.documentElement.classList.add(systemPreference);
    }
  }, []);


  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
