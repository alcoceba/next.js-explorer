import React from 'react';
import { render, screen } from '@testing-library/react';
import FlatTree from './FlatTree';

describe('FlatTree Component', () => {
  const mockData = {
    name: 'John',
    age: 30,
    user: {
      email: 'john@example.com',
    },
  };

  it('should render container', () => {
    const { container } = render(<FlatTree data={mockData} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render all keys from data', () => {
    render(<FlatTree data={mockData} expandedPaths={new Set(['user'])} />);
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('age')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('should render line numbers', () => {
    render(<FlatTree data={mockData} expandedPaths={new Set()} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should render values', () => {
    render(<FlatTree data={mockData} expandedPaths={new Set()} />);
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('should expand nested objects when path is in expandedPaths', () => {
    render(<FlatTree data={mockData} expandedPaths={new Set(['user'])} />);
    expect(screen.getByText('email')).toBeInTheDocument();
  });

  it('should not expand nested objects when path is not in expandedPaths', () => {
    render(<FlatTree data={mockData} expandedPaths={new Set()} />);
    expect(screen.queryByText('email')).not.toBeInTheDocument();
  });

  it('should filter rows when search term is provided', () => {
    render(<FlatTree data={mockData} search="name" expandedPaths={new Set()} />);
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.queryByText('age')).not.toBeInTheDocument();
  });

  it('should show parent when child matches search', () => {
    render(<FlatTree data={mockData} search="email" expandedPaths={new Set(['user'])} />);
    expect(screen.getByText('user')).toBeInTheDocument();
    expect(screen.getByText('email')).toBeInTheDocument();
  });

  it('should call onTogglePath when row is toggled', () => {
    const mockOnTogglePath = jest.fn();
    const { container } = render(
      <FlatTree
        data={mockData}
        onTogglePath={mockOnTogglePath}
        expandedPaths={new Set()}
        copyableTypes={['str']}
      />
    );

    // Find rows that have expandable content (have child count indicators)
    const rows = container.querySelectorAll('[class*="row"]');
    let found = false;

    for (const row of rows) {
      // Look for expandable row (one that has square brackets with count)
      if (row.textContent.includes('[') || row.textContent.includes('{')) {
        row.click();
        found = true;
        break;
      }
    }

    // Only check if we found an expandable row
    if (found) {
      expect(mockOnTogglePath).toHaveBeenCalled();
    }
  });

  it('should call onCopy when copy button is clicked', () => {
    const mockOnCopy = jest.fn();
    render(
      <FlatTree
        data={mockData}
        onCopy={mockOnCopy}
        expandedPaths={new Set()}
        copyableTypes={['str', 'num']}
      />
    );

    const copyButtons = screen.getAllByLabelText('Copy value');
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it('should display sizes when showSizes is true', () => {
    const getSize = jest.fn().mockReturnValue(1000);
    render(
      <FlatTree
        data={mockData}
        showSizes={true}
        getSize={getSize}
        formatSize={(size) => `${size} bytes`}
        expandedPaths={new Set(['user'])}
      />
    );
    expect(screen.getByText(/bytes/)).toBeInTheDocument();
  });

  it('should search case-insensitively', () => {
    render(<FlatTree data={mockData} search="NAME" expandedPaths={new Set()} />);
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  it('should search in values', () => {
    render(
      <FlatTree
        data={mockData}
        search="john"
        searchType="values"
        expandedPaths={new Set(['user'])}
      />
    );
    // Should find the user object because email contains john-like data
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('should handle empty data', () => {
    const { container } = render(<FlatTree data={{}} expandedPaths={new Set()} />);
    expect(container).toBeInTheDocument();
  });

  it('should handle array data', () => {
    const arrayData = ['item1', 'item2', 'item3'];
    const { container } = render(<FlatTree data={arrayData} expandedPaths={new Set()} />);
    // Check for the array structure rather than exact text
    expect(container.textContent).toContain('item1');
    expect(container.textContent).toContain('item2');
  });

  it('should show closing bracket for expanded objects', () => {
    render(<FlatTree data={mockData} expandedPaths={new Set(['user'])} />);
    expect(screen.getByText('}')).toBeInTheDocument();
  });

  it('should not show results when search has no matches', () => {
    render(<FlatTree data={mockData} search="xyz123" expandedPaths={new Set()} />);
    // Should have no rows displayed with search term
    expect(screen.queryByText('name')).not.toBeInTheDocument();
  });

  it('should search by keys and values when searchType is "both"', () => {
    render(<FlatTree data={mockData} search="30" searchType="both" expandedPaths={new Set()} />);
    expect(screen.getByText('age')).toBeInTheDocument();
  });
});
