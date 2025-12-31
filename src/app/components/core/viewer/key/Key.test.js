import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Key from './Key';
import { Context } from '../../../../context/context';

jest.mock('../../../../utils/object', () => ({
  getObjSize: jest.fn().mockReturnValue(500),
  isObjectAndNotEmpty: jest.fn(
    (val) => typeof val === 'object' && val !== null && Object.keys(val).length > 0
  ),
}));

jest.mock('../../../../utils/classNames', () => ({
  classNames: jest.fn((...args) => {
    return args
      .filter((arg) => {
        if (typeof arg === 'string') return !!arg;
        if (typeof arg === 'object') {
          return Object.keys(arg).some((key) => arg[key]);
        }
        return false;
      })
      .flatMap((arg) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'object') {
          return Object.keys(arg).filter((key) => arg[key]);
        }
        return [];
      })
      .join(' ');
  }),
}));

describe('Key Component', () => {
  const mockContextValue = {
    theme: 'dark',
    showSizes: false,
    isCollapsed: false,
  };

  const mockDispatch = jest.fn();

  const renderWithContext = (component, contextValue = mockContextValue) => {
    return render(
      <Context.Provider value={[contextValue, mockDispatch]}>{component}</Context.Provider>
    );
  };

  const mockChildren = <div data-testid="mock-children">Nested Content</div>;

  it('should render list item', () => {
    const mockTree = { nested: 'value' };
    const { container } = renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    expect(container.querySelector('li')).toBeInTheDocument();
  });

  it('should render collapsible index', () => {
    const mockTree = { nested: 'value' };
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    expect(screen.getByText('testKey')).toBeInTheDocument();
  });

  it('should render opening bracket for object', () => {
    const mockTree = { nested: 'value' };
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    expect(screen.getByText('{')).toBeInTheDocument();
  });

  it('should render opening bracket for array', () => {
    const mockTree = ['item1', 'item2'];
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    expect(screen.getByText('[')).toBeInTheDocument();
  });

  it('should render closing bracket for object', () => {
    const mockTree = { nested: 'value' };
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    expect(screen.getByText('}')).toBeInTheDocument();
  });

  it('should render closing bracket for array', () => {
    const mockTree = ['item1', 'item2'];
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    expect(screen.getByText(']')).toBeInTheDocument();
  });

  it('should render ellipsis', () => {
    const mockTree = { nested: 'value' };
    const { container } = renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    const ellipsis = container.textContent.includes('...');
    expect(ellipsis).toBe(true);
  });

  it('should render children content', () => {
    const mockTree = { nested: 'value' };
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });

  it('should toggle hidden state on click', async () => {
    const user = userEvent.setup();
    const mockTree = { nested: 'value' };
    const { container } = renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );

    const li = container.querySelector('li');
    await user.click(li);
    expect(li).toBeInTheDocument();
  });

  it('should show sizes when showSizes is true', () => {
    const contextValue = { ...mockContextValue, showSizes: true };
    const mockTree = { nested: 'value' };
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>,
      contextValue
    );
    expect(screen.getByText(/keys/)).toBeInTheDocument();
  });

  it('should not show sizes when showSizes is false', () => {
    const mockTree = { nested: 'value' };
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>
    );
    expect(screen.queryByText(/keys/)).not.toBeInTheDocument();
  });

  it('should display size in bytes for small sizes', () => {
    const contextValue = { ...mockContextValue, showSizes: true };
    const mockTree = { nested: 'value' };
    renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>,
      contextValue
    );
    expect(screen.getByText(/bytes/)).toBeInTheDocument();
  });

  it('should respect collapsed state from context', () => {
    const contextValue = { ...mockContextValue, isCollapsed: 2 };
    const mockTree = { nested: 'value' };
    const { container } = renderWithContext(
      <Key index="testKey" tree={mockTree}>
        {mockChildren}
      </Key>,
      contextValue
    );
    expect(container.querySelector('li')).toBeInTheDocument();
  });
});
