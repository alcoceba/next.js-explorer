import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { Variant, Size } from './Button';

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button onClick={() => {}}>✕</Button>);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clear</Button>);

    fireEvent.click(screen.getByText('Clear'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders with title and aria-label', () => {
    render(
      <Button onClick={() => {}} title="Clear search" ariaLabel="Clear search">
        ✕
      </Button>
    );

    const button = screen.getByLabelText('Clear search');
    expect(button).toHaveAttribute('title', 'Clear search');
  });

  it('renders with default variant', () => {
    const { container } = render(
      <Button onClick={() => void 0} variant={Variant.DEFAULT}>
        Default
      </Button>
    );
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Default');
  });

  it('renders with critical variant', () => {
    const { container } = render(
      <Button onClick={() => void 0} variant={Variant.CRITICAL}>
        Critical
      </Button>
    );
    const button = container.querySelector('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Critical');
  });

  it('renders with secondary variant', () => {
    const { container } = render(
      <Button onClick={() => {}} variant={Variant.SECONDARY}>
        Secondary
      </Button>
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Secondary');
  });

  it('renders with accent variant', () => {
    const { container } = render(
      <Button onClick={() => {}} variant={Variant.ACCENT}>
        Accent
      </Button>
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Accent');
  });

  it('renders with small size', () => {
    const { container } = render(
      <Button onClick={() => {}} size={Size.SMALL}>
        Small
      </Button>
    );
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
  });

  it('renders disabled button', () => {
    const { container } = render(
      <Button onClick={() => {}} disabled>
        Disabled
      </Button>
    );
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    const button = screen.getByText('Disabled');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('accepts custom className', () => {
    const { container } = render(
      <Button onClick={() => {}} className="custom-class">
        Button
      </Button>
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });
});
