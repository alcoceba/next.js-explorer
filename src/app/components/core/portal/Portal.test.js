import { render, screen } from '@testing-library/react';
import Portal from './Portal';

describe('Portal Component', () => {
  it('should render children in the document body', () => {
    const testContent = 'Portal Content';
    render(
      <Portal>
        <div data-testid="portal-child">{testContent}</div>
      </Portal>
    );

    const portalChild = screen.getByTestId('portal-child');
    expect(portalChild).toBeInTheDocument();
    expect(portalChild).toHaveTextContent(testContent);
  });

  it('should render portal content outside the root div', () => {
    render(
      <Portal>
        <span data-testid="portal-element">Portal Test</span>
      </Portal>
    );

    const portalElement = screen.getByTestId('portal-element');
    expect(document.body.contains(portalElement)).toBe(true);
  });

  it('should handle multiple children', () => {
    render(
      <Portal>
        <div>
          <span data-testid="span1">First</span>
          <span data-testid="span2">Second</span>
        </div>
      </Portal>
    );

    expect(screen.getByTestId('span1')).toBeInTheDocument();
    expect(screen.getByTestId('span2')).toBeInTheDocument();
  });

  it('should handle null children gracefully', () => {
    const { container } = render(<Portal>{null}</Portal>);

    expect(container).toBeInTheDocument();
  });
});
