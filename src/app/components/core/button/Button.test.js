import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { Variant } from './Button';

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
    // Check that button renders successfully with default variant
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
    // Check that button renders successfully with critical variant
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Critical');
  });
});
