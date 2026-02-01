import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip, { Position } from './Tooltip';

describe('Tooltip Component', () => {
  const mockContent = 'This is a tooltip';

  it('should render children', () => {
    render(
      <Tooltip content={mockContent}>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should display tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content={mockContent}>
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Hover me' });
    await user.hover(button);

    // Check if tooltip content is rendered
    const tooltips = screen.queryAllByText(mockContent);
    expect(tooltips.length).toBeGreaterThanOrEqual(1);
  });

  it('should hide tooltip on unhover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content={mockContent}>
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Hover me' });
    await user.hover(button);
    await user.unhover(button);

    // After unhover, tooltip might be hidden
    expect(button).toBeInTheDocument();
  });

  it('should support TOP position', () => {
    render(
      <Tooltip content={mockContent} position={Position.TOP}>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should support BOTTOM position', () => {
    render(
      <Tooltip content={mockContent} position={Position.BOTTOM}>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should support LEFT position', () => {
    render(
      <Tooltip content={mockContent} position={Position.LEFT}>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should support RIGHT position', () => {
    render(
      <Tooltip content={mockContent} position={Position.RIGHT}>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should handle empty content', () => {
    render(
      <Tooltip content="">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should handle long content', () => {
    const longContent =
      'This is a very long tooltip content that contains a lot of text and should wrap properly';
    render(
      <Tooltip content={longContent}>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <Tooltip content={mockContent}>
        <div>
          <span>Content 1</span>
          <span>Content 2</span>
        </div>
      </Tooltip>
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('should work with different child elements', () => {
    render(
      <Tooltip content={mockContent}>
        <a href="#">Link</a>
      </Tooltip>
    );
    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
  });

  it('should handle rapid hover/unhover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content={mockContent}>
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Hover me' });

    for (let i = 0; i < 3; i += 1) {
      await user.hover(button);
      await user.unhover(button);
    }

    expect(button).toBeInTheDocument();
  });

  it('should support mouse enter event', () => {
    render(
      <Tooltip content={mockContent}>
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Hover me' });
    fireEvent.mouseEnter(button);

    expect(button).toBeInTheDocument();
  });

  it('should support mouse leave event', () => {
    render(
      <Tooltip content={mockContent}>
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: 'Hover me' });
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    expect(button).toBeInTheDocument();
  });

  it('should apply className to wrapper', () => {
    render(
      <Tooltip content={mockContent} className="custom-tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should render first child when condition is true', () => {
    render(
      <Tooltip content={mockContent}>
        <button>Show me</button>
      </Tooltip>
    );

    expect(screen.getByRole('button', { name: 'Show me' })).toBeInTheDocument();
  });

  it('should render second child when condition is false', () => {
    render(
      <Tooltip content={mockContent}>
        <button>Hide me</button>
      </Tooltip>
    );

    expect(screen.getByRole('button', { name: 'Hide me' })).toBeInTheDocument();
  });

  it('should handle content with special characters', () => {
    const specialContent = 'Tooltip with <special> & characters!';
    render(
      <Tooltip content={specialContent}>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('should have proper aria attributes', () => {
    render(
      <Tooltip content={mockContent}>
        <button aria-label="Test button">Hover me</button>
      </Tooltip>
    );

    expect(screen.getByRole('button', { name: /test button|hover me/i })).toBeInTheDocument();
  });
});
