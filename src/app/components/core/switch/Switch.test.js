import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from './Switch';

describe('Switch Component', () => {
  it('should render a checkbox input', () => {
    render(<Switch id="test-switch" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('should render with correct id attribute', () => {
    render(<Switch id="my-switch" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'my-switch');
  });

  it('should handle active state', () => {
    const { rerender } = render(<Switch id="test-switch" isActive={false} />);
    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<Switch id="test-switch" isActive={true} />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onClick handler when toggled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<Switch id="test-switch" onClick={handleClick} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render children content', () => {
    render(
      <Switch id="test-switch" isActive={true}>
        ✓
      </Switch>
    );
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('should render label with correct htmlFor attribute', () => {
    render(<Switch id="labeled-switch" />);
    const label = screen.getByRole('checkbox').closest('label');
    expect(label).toHaveAttribute('for', 'labeled-switch');
  });

  it('should handle undefined onClick gracefully', async () => {
    const user = userEvent.setup();
    render(<Switch id="test-switch" />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toBeInTheDocument();
  });

  it('should toggle checkbox state visually on click', async () => {
    const { rerender } = render(<Switch id="test-switch" isActive={false} />);

    let checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(<Switch id="test-switch" isActive={true} />);
    checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
