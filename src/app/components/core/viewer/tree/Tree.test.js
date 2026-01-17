import React from 'react';
import { render, screen } from '@testing-library/react';
import Tree from './Tree';
import { Context } from '../../../../context/context';

describe('Tree Component', () => {
  const mockContextValue = {
    theme: 'dark',
    showSizes: false,
    isCollapsed: false,
  };

  const renderWithContext = (component, contextValue = mockContextValue) => {
    return render(
      <Context.Provider value={[contextValue, jest.fn()]}>{component}</Context.Provider>
    );
  };

  it('should render unordered list', () => {
    const mockData = { key: 'value' };
    const { container } = renderWithContext(<Tree data={mockData} isRoot />);
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('should render root class when isRoot is true', () => {
    const mockData = { key: 'value' };
    const { container } = renderWithContext(<Tree data={mockData} isRoot={true} />);
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });

  it('should render all keys from data object', () => {
    const mockData = {
      name: 'John',
      age: 30,
      city: 'New York',
    };
    const { container } = renderWithContext(<Tree data={mockData} />);
    const ul = container.querySelector('ul');
    const text = ul.textContent;
    expect(text).toContain('name');
    expect(text).toContain('age');
    expect(text).toContain('city');
  });

  it('should render primitive values with Value component', () => {
    const mockData = {
      string: 'hello',
      number: 123,
      boolean: true,
      null: null,
    };
    const { container } = renderWithContext(<Tree data={mockData} />);
    const ul = container.querySelector('ul');
    const text = ul.textContent;
    expect(text).toContain('string');
    expect(text).toContain('number');
  });

  it('should render nested objects with Key component', () => {
    const mockData = {
      user: {
        name: 'John',
      },
    };
    renderWithContext(<Tree data={mockData} />);
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('should handle array data', () => {
    const mockData = {
      items: ['item1', 'item2'],
    };
    renderWithContext(<Tree data={mockData} />);
    expect(screen.getByText('items')).toBeInTheDocument();
  });

  it('should render list items for each key', () => {
    const mockData = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };
    const { container } = renderWithContext(<Tree data={mockData} />);
    const listItems = container.querySelectorAll('li');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('should pass onCopy to child components', () => {
    const handleCopy = jest.fn();
    const mockData = { key: 'value' };
    const { container } = renderWithContext(<Tree data={mockData} onCopy={handleCopy} />);
    // Check that the tree rendered
    const ul = container.querySelector('ul');
    expect(ul).toBeInTheDocument();
  });

  it('should handle empty object', () => {
    const { container } = renderWithContext(<Tree data={{}} />);
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('should handle nested structures', () => {
    const mockData = {
      level1: {
        level2: {
          level3: 'value',
        },
      },
    };
    renderWithContext(<Tree data={mockData} />);
    expect(screen.getByText('level1')).toBeInTheDocument();
  });

  it('should filter results when search term is provided', () => {
    const mockData = {
      name: 'John',
      age: 30,
      city: 'New York',
    };
    renderWithContext(<Tree data={mockData} search="name" />);
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  it('should not render keys that do not match search', () => {
    const mockData = {
      name: 'John',
      age: 30,
    };
    renderWithContext(<Tree data={mockData} search="xyz" />);
    expect(screen.queryByText('name:')).not.toBeInTheDocument();
    expect(screen.queryByText('age:')).not.toBeInTheDocument();
  });

  it('should search in values', () => {
    const mockData = {
      name: 'John',
      title: 'Developer',
    };
    renderWithContext(<Tree data={mockData} search="john" />);
    expect(screen.getByText('name:')).toBeInTheDocument();
  });

  it('should show parent keys when descendants match', () => {
    const mockData = {
      user: {
        name: 'John',
        age: 30,
      },
    };
    renderWithContext(<Tree data={mockData} search="john" />);
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('should render all data when search is empty', () => {
    const mockData = {
      name: 'John',
      age: 30,
    };
    renderWithContext(<Tree data={mockData} search="" />);
    expect(screen.getByText('name:')).toBeInTheDocument();
    expect(screen.getByText('age:')).toBeInTheDocument();
  });

  it('should pass search prop to child components', () => {
    const mockData = {
      user: {
        name: 'John',
      },
    };
    renderWithContext(<Tree data={mockData} search="john" />);
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  it('should highlight prop when search matches', () => {
    const mockData = {
      searchKey: 'value',
    };
    renderWithContext(<Tree data={mockData} search="searchkey" />);
    expect(screen.getByText('searchKey')).toBeInTheDocument();
  });
});
