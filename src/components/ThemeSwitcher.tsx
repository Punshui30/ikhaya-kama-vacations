import React, { useState, useEffect } from 'react';
import styles from './ThemeSwitcher.module.scss';

type Theme = 'safari' | 'coastal' | 'luxury';

const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('safari');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('ikhaya-theme') as Theme;
    if (savedTheme && ['safari', 'coastal', 'luxury'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'safari');
    }
  }, []);

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ikhaya-theme', theme);
  };

  const themes = [
    { id: 'safari', name: 'Safari', description: 'Earthy tones inspired by the savanna' },
    { id: 'coastal', name: 'Coastal', description: 'Ocean blues and sunset oranges' },
    { id: 'luxury', name: 'Luxury', description: 'Sophisticated golds and deep blues' }
  ] as const;

  return (
    <div className={styles.themeSwitcher}>
      <div className={styles.themeSelector}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`${styles.themeButton} ${currentTheme === theme.id ? styles.active : ''}`}
            onClick={() => changeTheme(theme.id)}
            aria-label={`Switch to ${theme.name} theme`}
            title={theme.description}
          >
            <div className={`${styles.themePreview} ${styles[theme.id]}`}>
              <div className={styles.color1}></div>
              <div className={styles.color2}></div>
              <div className={styles.color3}></div>
              <div className={styles.color4}></div>
            </div>
            <span className={styles.themeName}>{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
