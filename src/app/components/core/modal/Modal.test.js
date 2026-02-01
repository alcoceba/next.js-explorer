import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal Component', () => {
  it('should not render when open is false', () => {
    render(
      <Modal open={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('should render when open is true', () => {
    render(
      <Modal open={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <Modal open={true} onClose={jest.fn()}>
        <div>Test Children</div>
      </Modal>
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClose = jest.fn();
    render(
      <Modal open={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should handle rapid open/close state changes', () => {
    const { rerender } = render(
      <Modal open={true} onClose={jest.fn()}>
        <div>Modal</div>
      </Modal>
    );

    expect(screen.getByText('Modal')).toBeInTheDocument();

    rerender(
      <Modal open={false} onClose={jest.fn()}>
        <div>Modal</div>
      </Modal>
    );

    expect(screen.queryByText('Modal')).not.toBeInTheDocument();

    rerender(
      <Modal open={true} onClose={jest.fn()}>
        <div>Modal</div>
      </Modal>
    );

    expect(screen.getByText('Modal')).toBeInTheDocument();
  });

  it('should render with form content', () => {
    render(
      <Modal open={true} onClose={jest.fn()}>
        <form>
          <input placeholder="Enter name" />
          <button>Submit</button>
        </form>
      </Modal>
    );

    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should support escape key to close', async () => {
    const mockOnClose = jest.fn();
    render(
      <Modal open={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);

    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should handle empty children', () => {
    render(<Modal open={true} onClose={jest.fn()} />);
  });

  it('should update onClose callback without remounting', () => {
    const firstCallback = jest.fn();
    const { rerender } = render(
      <Modal open={true} onClose={firstCallback}>
        <div>Content</div>
      </Modal>
    );

    const secondCallback = jest.fn();
    rerender(
      <Modal open={true} onClose={secondCallback}>
        <div>Content</div>
      </Modal>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
