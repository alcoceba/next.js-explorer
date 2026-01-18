import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { Context } from '../context/context';
import { ROUTER, THEME } from '../../helpers/constants';

describe('Header Component', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = {
    theme: THEME.Dark,
    showSizes: false,
    isCollapsed: false,
  };

  const renderWithContext = (component, contextValue = mockContextValue) => {
    return render(
      <Context.Provider value={[contextValue, mockDispatch]}>{component}</Context.Provider>
    );
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render header title', () => {
    renderWithContext(<Header router={ROUTER.App} />);
    expect(screen.getByText(/Next.js 🚀 Explorer/i)).toBeInTheDocument();
  });

  it('should render App Router link when router is APP', () => {
    renderWithContext(<Header router={ROUTER.App} version="14.0.0" react="19.0.0" />);
    const routerLink = screen.getByText('APP Router');
    expect(routerLink).toBeInTheDocument();
    const linkElement = routerLink.closest('a');
    expect(linkElement).toHaveAttribute('href', expect.stringContaining('app'));
  });

  it('should render Pages Router link when router is PAGES', () => {
    renderWithContext(<Header router={ROUTER.Pages} version="14.0.0" react="19.0.0" />);
    const routerLink = screen.getByText('Pages Router');
    expect(routerLink).toBeInTheDocument();
    const linkElement = routerLink.closest('a');
    expect(linkElement).toHaveAttribute('href', expect.stringContaining('pages'));
  });

  it('should render Next.js version when provided', () => {
    renderWithContext(<Header router={ROUTER.App} version="14.0.0" react="19.0.0" />);
    expect(screen.getByText('v14.0.0')).toBeInTheDocument();
  });

  it('should not render version when not provided', () => {
    renderWithContext(<Header router={ROUTER.App} react="19.0.0" />);
    // Check that Next.js version badge is not rendered (there should be exactly 2 badges: router and react)
    const badges = screen.getAllByRole('link');
    // badges[0] = APP/Pages Router, badges[1] = React (no Next.js version)
    expect(badges.length).toBe(2);
    expect(badges[1]).toHaveAttribute('href', expect.stringContaining('react.dev'));
  });

  it('should render React version when provided', () => {
    renderWithContext(<Header router={ROUTER.App} version="14.0.0" react="19.0.0" />);
    expect(screen.getByText('v19.0.0')).toBeInTheDocument();
  });

  it('should toggle theme when theme button is clicked', async () => {
    const user = userEvent.setup();
    renderWithContext(<Header router={ROUTER.App} />);

    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(themeButton);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should have external links with target="_blank"', () => {
    renderWithContext(<Header router={ROUTER.App} version="14.0.0" react="19.0.0" />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });

  it('should render both version links when provided', () => {
    renderWithContext(<Header router={ROUTER.App} version="14.0.0" react="19.0.0" />);

    const versionLink = screen.getByText('v14.0.0');
    const reactLink = screen.getByText('v19.0.0');

    expect(versionLink).toBeInTheDocument();
    expect(reactLink).toBeInTheDocument();
  });
});
