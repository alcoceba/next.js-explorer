import { render, screen } from '@testing-library/react';
import Message from './Message';

describe('Message Component', () => {
  it('should render message container', () => {
    render(<Message>Test Message</Message>);
    const span = screen.getByText('Test Message');
    expect(span).toBeInTheDocument();
    expect(span.tagName).toBe('SPAN');
  });

  it('should render message text content', () => {
    const messageText = 'This is a test message';
    render(<Message>{messageText}</Message>);
    expect(screen.getByText(messageText)).toBeInTheDocument();
  });

  it('should wrap content in span element', () => {
    render(<Message>Content</Message>);
    const span = screen.getByText('Content');
    expect(span.tagName).toBe('SPAN');
  });

  it('should render JSX children', () => {
    render(
      <Message>
        <div data-testid="custom-element">Custom Content</div>
      </Message>
    );
    expect(screen.getByTestId('custom-element')).toBeInTheDocument();
  });

  it('should handle empty children', () => {
    render(<Message></Message>);
    const messageDiv = document.querySelector('div');
    expect(messageDiv).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <Message>
        <span data-testid="first">First</span>
        <span data-testid="second">Second</span>
      </Message>
    );
    expect(screen.getByTestId('first')).toBeInTheDocument();
    expect(screen.getByTestId('second')).toBeInTheDocument();
  });

  it('should handle special characters in message', () => {
    const specialMessage = 'Message with @#$%^&*() special chars!';
    render(<Message>{specialMessage}</Message>);
    expect(screen.getByText(specialMessage)).toBeInTheDocument();
  });

  it('should render numeric content', () => {
    render(<Message>{12345}</Message>);
    expect(screen.getByText('12345')).toBeInTheDocument();
  });

  it('should render message within a wrapper div', () => {
    const { container } = render(<Message>Test</Message>);
    const wrapper = container.firstChild;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.tagName).toBe('DIV');
  });

  it('should handle null content gracefully', () => {
    render(<Message>{null}</Message>);
    const messageDiv = document.querySelector('div');
    expect(messageDiv).toBeInTheDocument();
  });

  it('should render with boolean false as content', () => {
    const { container } = render(<Message>{false}</Message>);
    const messageDiv = container.firstChild;
    expect(messageDiv).toBeInTheDocument();
  });

  it('should render long text content', () => {
    const longText = 'a'.repeat(1000);
    render(<Message>{longText}</Message>);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });
});
