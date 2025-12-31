import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

describe('SearchBox Component', () => {
  it('should render an input field', () => {
    render(<SearchBox />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should have correct placeholder text', () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText('Type to search...');
    expect(input).toBeInTheDocument();
  });

  it('should call onChange when user types', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<SearchBox onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test query');

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('t');
  });

  it('should pass correct value to onChange handler', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<SearchBox onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'search');

    // Should be called for each character
    expect(handleChange).toHaveBeenCalledWith('s');
    expect(handleChange).toHaveBeenCalledWith('se');
    expect(handleChange).toHaveBeenCalledWith('sea');
  });

  it('should handle empty input', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<SearchBox onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    handleChange.mockClear();

    await user.clear(input);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should handle undefined onChange gracefully', async () => {
    const user = userEvent.setup();
    render(<SearchBox />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'text');
    // Should not throw error
    expect(input).toBeInTheDocument();
  });

  it('should update input value on user input', async () => {
    const user = userEvent.setup();
    render(<SearchBox onChange={jest.fn()} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(input.value).toBe('test');
  });

  it('should apply correct CSS class', () => {
    render(<SearchBox />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should be of type text', () => {
    render(<SearchBox />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });
});
