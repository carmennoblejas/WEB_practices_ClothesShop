'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      className="rounded-full p-2 text-text-muted dark:text-text-dark-muted hover:text-text-main dark:hover:text-text-dark-main focus:text-text-main dark:focus:text-text-dark-main focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-accent transition"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {currentTheme === 'dark' ? (
        <SunIcon className="h-6 w-6 text-accent" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-6 w-6 text-secondary" aria-hidden="true" />
      )}
    </button>
  );
}

