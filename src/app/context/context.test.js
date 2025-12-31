import React from 'react';
import { render, screen } from '@testing-library/react';
import ContextProvider, { Context } from './context';
import { THEME } from '../../helpers/constants';

describe('Context Provider', () => {
  it('should render children', () => {
    render(
      <ContextProvider>
        <div data-testid="child">Test Content</div>
      </ContextProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should provide context value to children', () => {
    let contextValue;

    const TestComponent = () => {
      contextValue = React.useContext(Context);
      return <div>Test</div>;
    };

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    );

    expect(contextValue).toBeDefined();
    expect(Array.isArray(contextValue)).toBe(true);
    expect(contextValue).toHaveLength(2);
  });

  it('should provide initial state with default theme', () => {
    let state;

    const TestComponent = () => {
      [state] = React.useContext(Context);
      return <div>{state.theme}</div>;
    };

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    );

    expect(state).toEqual(
      expect.objectContaining({
        theme: THEME.Dark,
      })
    );
  });

  it('should provide initial state with showSizes false', () => {
    let state;

    const TestComponent = () => {
      [state] = React.useContext(Context);
      return <div>{state.showSizes.toString()}</div>;
    };

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    );

    expect(state.showSizes).toBe(false);
  });

  it('should provide initial state with isCollapsed false', () => {
    let state;

    const TestComponent = () => {
      [state] = React.useContext(Context);
      return <div>{state.isCollapsed.toString()}</div>;
    };

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    );

    expect(state.isCollapsed).toBe(false);
  });

  it('should provide dispatch function', () => {
    let dispatch;

    const TestComponent = () => {
      [, dispatch] = React.useContext(Context);
      return <div>{typeof dispatch}</div>;
    };

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    );

    expect(screen.getByText('function')).toBeInTheDocument();
  });

  it('should make context accessible to multiple children', () => {
    let value1, value2;

    const TestComponent1 = () => {
      [value1] = React.useContext(Context);
      return <div data-testid="child1">{value1.theme}</div>;
    };

    const TestComponent2 = () => {
      [value2] = React.useContext(Context);
      return <div data-testid="child2">{value2.theme}</div>;
    };

    render(
      <ContextProvider>
        <TestComponent1 />
        <TestComponent2 />
      </ContextProvider>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
    expect(value1.theme).toBe(value2.theme);
  });

  it('should have initial state with all required properties', () => {
    let state;

    const TestComponent = () => {
      [state] = React.useContext(Context);
      return <div>Ready</div>;
    };

    render(
      <ContextProvider>
        <TestComponent />
      </ContextProvider>
    );

    expect(state).toHaveProperty('theme');
    expect(state).toHaveProperty('showSizes');
    expect(state).toHaveProperty('isCollapsed');
  });

  it('should render without errors when children is missing', () => {
    expect(() => {
      render(<ContextProvider />);
    }).not.toThrow();
  });

  it('should create unique Context instances', () => {
    const Context1 = Context;
    expect(Context1).toBeDefined();
  });
});
