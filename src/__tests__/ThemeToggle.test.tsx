import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

let mockLocalStorage: { [key: string]: string | undefined } = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => mockLocalStorage[key] ?? null,
    setItem: (key: string, value: string) => {
      mockLocalStorage[key] = value;
    },
    removeItem: (key: string) => {
      mockLocalStorage[key] = undefined;
    },
    clear: () => {
      mockLocalStorage = {};
    },
  },
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockLocalStorage = {};
    document.documentElement.removeAttribute('data-theme');
  });

  test('renders theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByText('Theme:')).toBeInTheDocument();
    expect(screen.getByText('🌞 Light')).toBeInTheDocument();
  });

  test('toggles theme when button is clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    expect(screen.getByText('🌞 Light')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('🌙 Dark')).toBeInTheDocument();
  });

  test('saves theme to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockLocalStorage['theme']).toBe('dark');
  });

  test('applies data-theme attribute to document.documentElement', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
