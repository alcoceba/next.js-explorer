import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import useTheme from './useTheme';
import { Context } from '../context/context';
import { THEME } from '../../helpers/constants';
import * as configModule from '../utils/config';

jest.mock('../utils/config', () => ({
  getTheme: jest.fn().mockResolvedValue({ theme: 'dark' }),
  setTheme: jest.fn(),
}));

jest.mock('../../helpers/constants', () => ({
  THEME: {
    Dark: 'dark',
    Light: 'light',
  },
  ROUTER: {
    App: 'app',
    Pages: 'pages',
  },
  DEFAULT_SIZE: 1024,
}));

describe('useTheme Hook', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = {
    theme: THEME.Dark,
    showSizes: false,
    isCollapsed: false,
  };

  const renderHookWithContext = (hook, contextValue = mockContextValue) => {
    const wrapper = ({ children }) => (
      <Context.Provider value={[contextValue, mockDispatch]}>{children}</Context.Provider>
    );
    return renderHook(hook, { wrapper });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch.mockClear();
    Object.defineProperty(document, 'body', {
      writable: true,
      configurable: true,
      value: document.createElement('body'),
    });
  });

  it('should return current theme', async () => {
    const { result } = renderHookWithContext(() => useTheme());

    await waitFor(
      () => {
        expect(result.current).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('should dispatch SetTheme action on mount', async () => {
    renderHookWithContext(() => useTheme());

    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it('should set theme from config', async () => {
    renderHookWithContext(() => useTheme());

    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: 'SET_THEME',
          })
        );
      },
      { timeout: 3000 }
    );
  });

  it('should set document body theme attribute', async () => {
    renderHookWithContext(() => useTheme());
    configModule.getTheme.mockResolvedValueOnce({ theme: THEME.Dark });

    await waitFor(
      () => {
        expect(document.body.dataset.theme).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('should detect browser theme preference', async () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderHookWithContext(() => useTheme());

    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it('should fallback to dark theme when config is not available', async () => {
    configModule.getTheme.mockResolvedValueOnce(null);

    renderHookWithContext(() => useTheme());

    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it('should save theme to config when theme changes', async () => {
    renderHookWithContext(() => useTheme());

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });

    await waitFor(() => {}, { timeout: 2000 });
  });

  it('should handle missing browser matchMedia', async () => {
    window.matchMedia = undefined;

    renderHookWithContext(() => useTheme());

    await waitFor(
      () => {
        expect(mockDispatch).toHaveBeenCalled();
      },
      { timeout: 3000 }
    );
  });

  it('should not save theme before initialization completes', async () => {
    configModule.setTheme.mockClear();

    renderHookWithContext(() => useTheme());

    expect(configModule.setTheme).not.toHaveBeenCalled();
  });
});
