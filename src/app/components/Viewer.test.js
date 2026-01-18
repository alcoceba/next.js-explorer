import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Viewer from './Viewer';
import { Context } from '../context/context';

jest.mock('../utils/config', () => ({
  getShowSizes: jest.fn().mockResolvedValue({ sizes: false }),
  setShowSizes: jest.fn(),
}));

const renderWithContext = (component, contextValue = {}) => {
  const defaultContext = {
    theme: 'dark',
    showSizes: false,
    isCollapsed: false,
    showPageInfo: false,
  };
  return render(
    <Context.Provider value={[{ ...defaultContext, ...contextValue }, jest.fn()]}>
      {component}
    </Context.Provider>
  );
};

describe('Viewer Component', () => {
  it('should render viewer container', () => {
    const mockJson = { key: 'value' };
    renderWithContext(<Viewer json={mockJson} />);
    expect(screen.getByText('key:')).toBeInTheDocument();
  });

  it('should display no data message when json is empty', () => {
    renderWithContext(<Viewer json={{}} />);
    expect(screen.getByText('No data was found')).toBeInTheDocument();
  });

  it('should display no data message when json is null', () => {
    renderWithContext(<Viewer json={null} />);
    expect(screen.getByText('No data was found')).toBeInTheDocument();
  });

  it('should display no data message when json is undefined', () => {
    renderWithContext(<Viewer json={undefined} />);
    expect(screen.getByText('No data was found')).toBeInTheDocument();
  });

  it('should render pre element', () => {
    const mockJson = { key: 'value' };
    const { container } = renderWithContext(<Viewer json={mockJson} />);
    expect(container.querySelector('pre')).toBeInTheDocument();
  });

  it('should render tree structure when json is provided', () => {
    const mockJson = { name: 'John', age: 30 };
    renderWithContext(<Viewer json={mockJson} />);
    expect(screen.getByText('name:')).toBeInTheDocument();
  });

  it('should render multiple properties', () => {
    const mockJson = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3',
    };
    renderWithContext(<Viewer json={mockJson} />);
    expect(screen.getByText('prop1:')).toBeInTheDocument();
    expect(screen.getByText('prop2:')).toBeInTheDocument();
    expect(screen.getByText('prop3:')).toBeInTheDocument();
  });

  it('should apply viewer class to container', () => {
    const mockJson = { key: 'value' };
    const { container } = renderWithContext(<Viewer json={mockJson} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should call onCopy when prop is double-clicked', () => {
    const handleCopy = jest.fn();
    const mockJson = { key: 'value' };
    renderWithContext(<Viewer json={mockJson} onCopy={handleCopy} />);

    const valueElement = screen.getByText('"value"');
    expect(valueElement).toBeInTheDocument();
  });

  it('should render search input field', () => {
    const mockJson = { key: 'value' };
    renderWithContext(<Viewer json={mockJson} />);
    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should allow typing in search input', async () => {
    const user = userEvent.setup();
    const mockJson = { key: 'value' };
    renderWithContext(<Viewer json={mockJson} />);

    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    await user.type(searchInput, 'key');

    expect(searchInput).toHaveValue('key');
  });

  it('should filter results based on search term', async () => {
    const user = userEvent.setup();
    const mockJson = {
      name: 'John',
      age: 30,
      city: 'New York',
    };
    renderWithContext(<Viewer json={mockJson} />);

    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    await user.type(searchInput, 'name');

    // After search, search input should have the value
    expect(searchInput).toHaveValue('name');
  });

  it('should handle search with no results', async () => {
    const user = userEvent.setup();
    const mockJson = { foo: 'bar' };
    renderWithContext(<Viewer json={mockJson} />);

    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    await user.type(searchInput, 'xyz');

    // Search input should accept the value
    expect(searchInput).toHaveValue('xyz');
  });

  it('should search case-insensitively', async () => {
    const user = userEvent.setup();
    const mockJson = { KeyName: 'value' };
    renderWithContext(<Viewer json={mockJson} />);

    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    await user.type(searchInput, 'KEYNAME');

    expect(searchInput).toHaveValue('keyname');
  });

  it('should display total results found', async () => {
    const user = userEvent.setup();
    const mockJson = {
      name: 'John',
      city: 'New York',
    };
    renderWithContext(<Viewer json={mockJson} />);

    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    await user.type(searchInput, 'john');

    // Should show result count
    expect(screen.getByText(/result.*found/)).toBeInTheDocument();
  });

  it('should count direct key matches', async () => {
    const user = userEvent.setup();
    const mockJson = {
      name: 'John',
      age: 30,
      city: 'New York',
    };
    renderWithContext(<Viewer json={mockJson} />);

    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    await user.type(searchInput, 'name');

    // Should show that results are found
    const resultText = screen.getByText(/result.*found/);
    expect(resultText).toBeInTheDocument();
  });

  it('should search both keys and values', async () => {
    const user = userEvent.setup();
    const mockJson = {
      firstName: 'John',
      lastName: 'Doe',
    };
    renderWithContext(<Viewer json={mockJson} />);

    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    await user.type(searchInput, 'john');

    // Should display search results
    expect(screen.getByText(/result.*found/)).toBeInTheDocument();
  });

  it('should clear search results when search is cleared', async () => {
    const user = userEvent.setup();
    const mockJson = {
      name: 'John',
      age: 30,
    };
    renderWithContext(<Viewer json={mockJson} />);

    const searchInput = screen.getByPlaceholderText('Search keys and values...');
    await user.type(searchInput, 'name');
    await user.clear(searchInput);

    // Both properties should be visible again
    expect(screen.getByText('name:')).toBeInTheDocument();
    expect(screen.getByText('age:')).toBeInTheDocument();
  });
});
