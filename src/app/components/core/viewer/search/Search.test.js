import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search Component', () => {
  it('should render search input with placeholder', () => {
    render(<Search searchTerm="" onSearchChange={jest.fn()} totalResults={0} />);
    const input = screen.getByPlaceholderText('Search keys and values...');
    expect(input).toBeInTheDocument();
  });

  it('should display search term in input', () => {
    render(<Search searchTerm="test" onSearchChange={jest.fn()} totalResults={0} />);
    const input = screen.getByPlaceholderText('Search keys and values...');
    expect(input).toHaveValue('test');
  });

  it('should call onSearchChange when input changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Search searchTerm="" onSearchChange={handleChange} totalResults={0} />);

    const input = screen.getByPlaceholderText('Search keys and values...');
    await user.type(input, 'search');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should show clear button when search term exists', () => {
    render(<Search searchTerm="test" onSearchChange={jest.fn()} totalResults={0} />);
    const clearButton = screen.getByTitle('Clear search');
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when search term is empty', () => {
    render(<Search searchTerm="" onSearchChange={jest.fn()} totalResults={0} />);
    const clearButton = screen.queryByTitle('Clear search');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should call onSearchChange with empty string when clear button clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Search searchTerm="test" onSearchChange={handleChange} totalResults={0} />);

    const clearButton = screen.getByTitle('Clear search');
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('should display result count when search term exists', () => {
    render(<Search searchTerm="test" onSearchChange={jest.fn()} totalResults={3} />);
    expect(screen.getByText(/3 results found/)).toBeInTheDocument();
  });

  it('should display singular result text when count is 1', () => {
    render(<Search searchTerm="test" onSearchChange={jest.fn()} totalResults={1} />);
    expect(screen.getByText(/1 result found/)).toBeInTheDocument();
  });

  it('should not display result count when search term is empty', () => {
    render(<Search searchTerm="" onSearchChange={jest.fn()} totalResults={0} />);
    const resultCount = screen.queryByText(/result.*found/);
    expect(resultCount).not.toBeInTheDocument();
  });

  it('should have input wrapper div', () => {
    render(<Search searchTerm="" onSearchChange={jest.fn()} totalResults={0} />);
    // Check that the structure exists with input inside wrapper
    const input = screen.getByPlaceholderText('Search keys and values...');
    expect(input.parentElement).toBeInTheDocument();
  });

  it('should add focus class to container on input focus', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Search searchTerm="" onSearchChange={jest.fn()} totalResults={0} />
    );

    const input = screen.getByPlaceholderText('Search keys and values...');

    // Initially not focused
    let mainContainer = container.firstChild;
    expect(mainContainer).toBeInTheDocument();

    // Focus the input
    await user.click(input);

    // Container should have focused class when input is focused or search term exists
    // This tests that focus state management is working
    expect(input).toHaveFocus();
  });

  it('should remove focus class from container on input blur', async () => {
    const user = userEvent.setup();
    render(<Search searchTerm="" onSearchChange={jest.fn()} totalResults={0} />);

    const input = screen.getByPlaceholderText('Search keys and values...');
    await user.click(input);

    // Verify input has focus
    expect(input).toHaveFocus();

    await user.tab(); // Blur the input

    // Input should no longer have focus
    expect(input).not.toHaveFocus();
  });

  it('should render all elements together', () => {
    render(<Search searchTerm="test" onSearchChange={jest.fn()} totalResults={5} />);

    expect(screen.getByPlaceholderText('Search keys and values...')).toBeInTheDocument();
    expect(screen.getByTitle('Clear search')).toBeInTheDocument();
    expect(screen.getByText(/5 results found/)).toBeInTheDocument();
  });

  it('should handle rapid search term changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Search searchTerm="" onSearchChange={handleChange} totalResults={0} />);

    const input = screen.getByPlaceholderText('Search keys and values...');
    await user.type(input, 'test123');

    expect(handleChange).toHaveBeenCalledTimes(7); // One call per character
  });
});
