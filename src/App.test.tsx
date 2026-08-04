import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import App from './App'
import { initializeTheme, THEME_STORAGE_KEY } from './theme'

const setRoute = (path: string) => window.history.replaceState({}, '', path);

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
  Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: vi.fn(),
  });
});

describe('portfolio routes', () => {
  test('initializes and switches the theme from the homepage', async () => {
    setRoute('/');
    initializeTheme();
    render(<App />);

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');

    await userEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  test('uses a complete heading hierarchy on the project archive', () => {
    setRoute('/work');
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Builds, experiments, and working evidence.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Project case files' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Systems in motion.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Runtime Atlas' })).toBeInTheDocument();
  });

  test('contains mobile-menu focus and restores it after Escape', async () => {
    setRoute('/work');
    render(<App />);
    const trigger = screen.getByRole('button', { name: 'Open navigation' });

    await userEvent.click(trigger);
    expect(within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', { name: 'Home' })).toHaveFocus();

    await userEvent.keyboard('{Escape}');
    await act(async () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('keeps videos deferred until manually played and pauses the previous reel', () => {
    setRoute('/work');
    render(<App />);
    const videos = screen.getAllByLabelText(/product demonstration/) as HTMLVideoElement[];
    videos.forEach((video) => {
      Object.defineProperty(video, 'play', { configurable: true, value: vi.fn().mockResolvedValue(undefined) });
      Object.defineProperty(video, 'pause', { configurable: true, value: vi.fn() });
    });
    videos.forEach((video) => {
      expect(video).toHaveAttribute('preload', 'none');
      expect(video.play).not.toHaveBeenCalled();
    });

    fireEvent.play(videos[0]);
    fireEvent.play(videos[1]);
    expect(videos[0].pause).toHaveBeenCalled();
  });
});
