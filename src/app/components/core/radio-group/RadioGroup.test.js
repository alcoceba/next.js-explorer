import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
  const options = [
    { value: 'keys', label: 'Search Keys' },
    { value: 'values', label: 'Search Values' },
    { value: 'both', label: 'Search Keys & Values' },
  ];

  it('renders radio group with options', () => {
    const handleChange = jest.fn();
    render(<RadioGroup options={options} value="both" onChange={handleChange} />);

    expect(screen.getByLabelText('Search Keys')).toBeInTheDocument();
    expect(screen.getByLabelText('Search Values')).toBeInTheDocument();
    expect(screen.getByLabelText('Search Keys & Values')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(<RadioGroup options={options} value="keys" onChange={handleChange} />);

    const valuesOption = screen.getByLabelText('Search Values');
    fireEvent.click(valuesOption);

    expect(handleChange).toHaveBeenCalledWith('values');
  });

  it('shows correct option as selected', () => {
    const handleChange = jest.fn();
    render(<RadioGroup options={options} value="both" onChange={handleChange} />);

    const bothOption = screen.getByLabelText('Search Keys & Values');
    expect(bothOption).toBeChecked();
  });
});
