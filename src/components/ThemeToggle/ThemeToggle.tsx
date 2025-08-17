import { useTheme } from '../../contexts/ThemeContext';
import { Theme } from '../../types/theme';
import styles from './ThemeToggle.module.scss';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeToggle}>
      <span className={styles.themeText}>Theme: </span>
      <button
        onClick={toggleTheme}
        className={`${styles.themeButton} ${styles[theme]}`}
      >
        {theme === Theme.LIGHT ? '🌞 Light' : '🌙 Dark'}
      </button>
    </div>
  );
}

export default ThemeToggle;
