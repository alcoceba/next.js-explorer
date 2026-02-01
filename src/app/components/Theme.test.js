import { render } from '@testing-library/react';
import Theme from './Theme';
import { Context } from '../context/context';

jest.mock('../hooks/useTheme', () => {
  return jest.fn();
});

describe('Theme Component', () => {
  const mockDispatch = jest.fn();
  const mockContextValue = {
    theme: 'dark',
    showSizes: false,
    isCollapsed: false,
  };

  it('should render children', () => {
    const { container } = render(
      <Context.Provider value={[mockContextValue, mockDispatch]}>
        <Theme>
          <div data-testid="theme-child">Test Child</div>
        </Theme>
      </Context.Provider>
    );

    expect(container.querySelector('[data-testid="theme-child"]')).toBeInTheDocument();
  });

  it('should pass through multiple children', () => {
    const { container } = render(
      <Context.Provider value={[mockContextValue, mockDispatch]}>
        <Theme>
          <div>
            <span data-testid="child1">First</span>
            <span data-testid="child2">Second</span>
          </div>
        </Theme>
      </Context.Provider>
    );

    expect(container.querySelector('[data-testid="child1"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="child2"]')).toBeInTheDocument();
  });

  it('should render children properly with context', () => {
    const { container } = render(
      <Context.Provider value={[mockContextValue, mockDispatch]}>
        <Theme>
          <div data-testid="child">Content</div>
        </Theme>
      </Context.Provider>
    );

    expect(container.querySelector('[data-testid="child"]')).toBeInTheDocument();
  });
});
