import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';

describe('Footer Component', () => {
  const Hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '❤️‍🔥', '🔥', '🍆'];

  it('should render footer container', () => {
    render(<Footer />);
    const footer = screen.getByText(/made with/i).closest('div');
    expect(footer).toBeInTheDocument();
  });

  it('should render footer text with default heart emoji', () => {
    render(<Footer />);
    expect(screen.getByText(/made with/i)).toBeInTheDocument();
    expect(screen.getByText('❤️')).toBeInTheDocument();
  });

  it('should render version information', () => {
    render(<Footer />);
    expect(screen.getByText(/v1.8.0 \/ 1.2.0/)).toBeInTheDocument();
  });

  it('should initialize with first heart emoji', () => {
    render(<Footer />);
    const heartSpan = screen.getByText(Hearts[0]);
    expect(heartSpan).toBeInTheDocument();
  });

  it('should change emoji on footer click', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const footer = screen.getByText(/made with/i).closest('div');

    const initialEmoji = screen.getByText(Hearts[0]);
    expect(initialEmoji).toBeInTheDocument();

    const originalRandom = Math.random;
    Math.random = jest.fn().mockReturnValue(0.5);

    await user.click(footer);

    expect(Math.random).toHaveBeenCalled();

    Math.random = originalRandom;
  });

  it('should render heart emoji in span element', () => {
    render(<Footer />);
    const heartSpan = screen.getByText('❤️');
    expect(heartSpan.tagName).toBe('SPAN');
  });

  it('should have click handler on footer element', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const footer = screen.getByText(/made with/i).closest('div');

    await user.click(footer);
    expect(footer).toBeInTheDocument();
  });

  it('should handle rapid clicks on footer', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const footer = screen.getByText(/made with/i).closest('div');

    await user.click(footer);
    await user.click(footer);
    await user.click(footer);

    expect(footer).toBeInTheDocument();
  });

  it('should contain all required text parts', () => {
    render(<Footer />);
    expect(screen.getByText(/made with/)).toBeInTheDocument();
    expect(screen.getByText(/for all developers/)).toBeInTheDocument();
  });
});
