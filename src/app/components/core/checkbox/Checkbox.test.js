import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders checkbox with label', () => {
    render(<Checkbox label="Test Label" checked={false} onChange={() => {}} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('calls onChange when checkbox is clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(<Checkbox label="Test" checked={false} onChange={handleChange} />);

    const checkbox = container.querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('shows checked state', () => {
    const { container } = render(<Checkbox label="Test" checked={true} onChange={() => {}} />);

    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeChecked();
  });
});
