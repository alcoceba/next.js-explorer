import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { Context } from '../context/context';
import { ROUTER, THEME } from '../../helpers/constants';
import * as actions from '../context/actions';

describe('Header Component', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = {
    theme: THEME.Dark,
    showSizes: false,
    isCollapsed: false,
    appData: {
      nextjsRouter: ROUTER.App,
      nextjsVersion: '16.0.0',
      reactVersion: '18.0.0',
      nextjsPagePath: '/test',
      nextjsPageQuery: {},
      nextjsPageAssetPrefix: '/',
      pageDataSize: 1000,
      pageDataKeys: 5,
    },
  };

  const renderWithContext = (component, contextValue = mockContextValue) => {
    return render(
      <Context.Provider value={[contextValue, mockDispatch]}>{component}</Context.Provider>
    );
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  describe('Header Rendering', () => {
    it('should render header title', () => {
      renderWithContext(<Header />);
      expect(screen.getByText(/Next.js 🚀 Explorer/i)).toBeInTheDocument();
    });

    it('should render GitHub link with icon and text', () => {
      renderWithContext(<Header />);
      const githubLink = screen.getByTitle('Next.js Explorer GitHub Repository');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/alcoceba/next.js-explorer');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noreferrer');
      expect(screen.getByText('GitHub')).toBeInTheDocument();
    });

    it('should render GitHubIcon with correct attributes', () => {
      const { container } = renderWithContext(<Header />);
      const githubIcon = container.querySelector('svg');
      expect(githubIcon).toBeInTheDocument();
      expect(githubIcon).toHaveAttribute('width', '30');
      expect(githubIcon).toHaveAttribute('height', '30');
    });
  });

  describe('Router Type Badges', () => {
    it('should render App Router badge when router is APP', () => {
      const contextApp = {
        ...mockContextValue,
        appData: {
          ...mockContextValue.appData,
          nextjsRouter: ROUTER.App,
          nextjsVersion: '14.0.0',
          reactVersion: '19.0.0',
        },
      };
      renderWithContext(<Header />, contextApp);
      expect(screen.getByText('Using')).toBeInTheDocument();
      const routerLink = screen.getByText('APP Router');
      expect(routerLink).toBeInTheDocument();
      const linkElement = routerLink.closest('a');
      expect(linkElement).toHaveAttribute('href', expect.stringContaining('app'));
    });

    it('should render Pages Router badge when router is PAGES', () => {
      const contextPages = {
        ...mockContextValue,
        appData: {
          ...mockContextValue.appData,
          nextjsRouter: ROUTER.Pages,
          nextjsVersion: '14.0.0',
          reactVersion: '19.0.0',
        },
      };
      renderWithContext(<Header />, contextPages);
      expect(screen.getByText('Using')).toBeInTheDocument();
      const routerLink = screen.getByText('Pages Router');
      expect(routerLink).toBeInTheDocument();
      const linkElement = routerLink.closest('a');
      expect(linkElement).toHaveAttribute('href', expect.stringContaining('pages'));
    });
  });

  describe('Version Badges', () => {
    it('should render Next.js version badge when provided', () => {
      const contextWithVersion = {
        ...mockContextValue,
        appData: { ...mockContextValue.appData, nextjsVersion: '14.0.0', reactVersion: '19.0.0' },
      };
      renderWithContext(<Header />, contextWithVersion);
      expect(screen.getByText('v14.0.0')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      const versionLink = screen.getByText('v14.0.0').closest('a');
      expect(versionLink).toHaveAttribute('href', 'https://nextjs.org/blog');
    });

    it('should not render Next.js version badge when not provided', () => {
      const contextNoVersion = {
        ...mockContextValue,
        appData: { ...mockContextValue.appData, nextjsVersion: null, reactVersion: '19.0.0' },
      };
      renderWithContext(<Header />, contextNoVersion);
      expect(screen.queryByText('Next.js')).not.toBeInTheDocument();
    });

    it('should render React version badge when provided', () => {
      const contextWithReact = {
        ...mockContextValue,
        appData: { ...mockContextValue.appData, nextjsVersion: '14.0.0', reactVersion: '19.0.0' },
      };
      renderWithContext(<Header />, contextWithReact);
      expect(screen.getByText('v19.0.0')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      const reactLink = screen.getByText('v19.0.0').closest('a');
      expect(reactLink).toHaveAttribute('href', 'https://react.dev/');
    });

    it('should render both version badges when all versions provided', () => {
      const contextBothVersions = {
        ...mockContextValue,
        appData: { ...mockContextValue.appData, nextjsVersion: '14.0.0', reactVersion: '19.0.0' },
      };
      renderWithContext(<Header />, contextBothVersions);
      expect(screen.getByText('v14.0.0')).toBeInTheDocument();
      expect(screen.getByText('v19.0.0')).toBeInTheDocument();
    });

    it('should render only router badge when no version provided', () => {
      const contextNoVersions = {
        ...mockContextValue,
        appData: { ...mockContextValue.appData, nextjsVersion: null, reactVersion: null },
      };
      renderWithContext(<Header />, contextNoVersions);
      const links = screen.getAllByRole('link');
      // GitHub link + Router badge = 2 links
      expect(links.length).toBe(2);
    });
  });

  describe('Theme Toggle', () => {
    it('should toggle theme from light to dark when button is clicked', async () => {
      const user = userEvent.setup();
      const contextValueLight = { ...mockContextValue, theme: THEME.Light };
      renderWithContext(<Header />, contextValueLight);

      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      await user.click(themeButton);

      expect(mockDispatch).toHaveBeenCalledWith(actions.SetTheme(THEME.Dark));
    });

    it('should toggle theme from dark to light when button is clicked', async () => {
      const user = userEvent.setup();
      const contextValueDark = { ...mockContextValue, theme: THEME.Dark };
      renderWithContext(<Header />, contextValueDark);

      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      await user.click(themeButton);

      expect(mockDispatch).toHaveBeenCalledWith(actions.SetTheme(THEME.Light));
    });

    it('should have accessible theme toggle button', () => {
      renderWithContext(<Header />);
      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      expect(themeButton).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('External Links', () => {
    it('should have all external links with target="_blank" and noreferrer', () => {
      const contextWithVersions = {
        ...mockContextValue,
        appData: { ...mockContextValue.appData, nextjsVersion: '14.0.0', reactVersion: '19.0.0' },
      };
      renderWithContext(<Header />, contextWithVersions);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
      });
    });

    it('should have correct link counts for all versions', () => {
      const contextWithVersions = {
        ...mockContextValue,
        appData: { ...mockContextValue.appData, nextjsVersion: '14.0.0', reactVersion: '19.0.0' },
      };
      renderWithContext(<Header />, contextWithVersions);
      const links = screen.getAllByRole('link');
      // GitHub + Router + Next.js + React = 4 links
      expect(links.length).toBe(4);
    });
  });

  describe('PropTypes Validation', () => {
    it('should render without optional version props', () => {
      const { container } = renderWithContext(<Header />);
      expect(container.querySelector('h1')).toBeInTheDocument();
    });

    it('should render with all provided props', () => {
      const contextFull = {
        ...mockContextValue,
        appData: { ...mockContextValue.appData, nextjsVersion: '14.0.0', reactVersion: '19.0.0' },
      };
      const { container } = renderWithContext(<Header />, contextFull);
      expect(container.querySelector('h1')).toBeInTheDocument();
    });
  });
});
