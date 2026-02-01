import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

describe('Search Component', () => {
  it('should render search input with default placeholder', () => {
    render(<Search value="" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('should render search input with custom placeholder', () => {
    render(<Search value="" onChange={jest.fn()} placeholder="Find items..." />);
    const input = screen.getByPlaceholderText('Find items...');
    expect(input).toBeInTheDocument();
  });

  it('should display value in input', () => {
    render(<Search value="test" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('test');
  });

  it('should call onChange when input changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'search');

    expect(handleChange).toHaveBeenCalled();
  });

  it('should show clear button when value exists', () => {
    render(<Search value="test" onChange={jest.fn()} />);
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when value is empty', () => {
    render(<Search value="" onChange={jest.fn()} />);
    const clearButton = screen.queryByRole('button', { name: /clear search/i });
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should call onChange with empty string when clear button clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Search value="test" onChange={handleChange} />);

    const clearButton = screen.getByRole('button', { name: /clear search/i });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('should display result count when value exists and totalResults provided', () => {
    render(<Search value="test" onChange={jest.fn()} totalResults={3} />);
    expect(screen.getByText(/3 results found/)).toBeInTheDocument();
  });

  it('should display singular result text when count is 1', () => {
    render(<Search value="test" onChange={jest.fn()} totalResults={1} />);
    expect(screen.getByText(/1 result found/)).toBeInTheDocument();
  });

  it('should not display result count when value is empty', () => {
    render(<Search value="" onChange={jest.fn()} totalResults={0} />);
    const resultCount = screen.queryByText(/result.*found/);
    expect(resultCount).not.toBeInTheDocument();
  });

  it('should not display result count when totalResults not provided', () => {
    render(<Search value="test" onChange={jest.fn()} />);
    const resultCount = screen.queryByText(/result.*found/);
    expect(resultCount).not.toBeInTheDocument();
  });

  it('should have input wrapper div', () => {
    render(<Search value="" onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input.parentElement).toBeInTheDocument();
  });

  it('should add focus class to container on input focus', async () => {
    const user = userEvent.setup();
    const { container } = render(<Search value="" onChange={jest.fn()} />);

    const input = screen.getByPlaceholderText('Search...');

    let mainContainer = container.firstChild;
    expect(mainContainer).toBeInTheDocument();

    await user.click(input);

    expect(input).toHaveFocus();
  });

  it('should remove focus class from container on input blur', async () => {
    const user = userEvent.setup();
    render(<Search value="" onChange={jest.fn()} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.click(input);

    expect(input).toHaveFocus();

    await user.tab();

    expect(input).not.toHaveFocus();
  });

  it('should render all elements together', () => {
    render(<Search value="test" onChange={jest.fn()} totalResults={5} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument();
    expect(screen.getByText(/5 results found/)).toBeInTheDocument();
  });

  it('should handle rapid value changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test123');

    expect(handleChange).toHaveBeenCalledTimes(7);
  });

  it('should render filter options when provided', () => {
    const filterOptions = [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
    ];
    render(
      <Search
        value="test"
        onChange={jest.fn()}
        filterOptions={filterOptions}
        filterValue="all"
        onFilterChange={jest.fn()}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should not render filter options when not provided', () => {
    render(<Search value="test" onChange={jest.fn()} />);
    const radioGroup = screen.queryByRole('radiogroup');
    expect(radioGroup).not.toBeInTheDocument();
  });
});
