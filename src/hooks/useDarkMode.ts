import { useCallback, useEffect, useState } from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  const toggleTheme = useCallback(() => {
    if (theme === Theme.Light) {
      window.localStorage.setItem('theme', Theme.Dark);
      setTheme(Theme.Dark);
    } else {
      window.localStorage.setItem('theme', Theme.Light);
      setTheme(Theme.Light);
    }
  }, [theme]);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme as Theme);
  }, []);

  return { theme, toggleTheme };
};
