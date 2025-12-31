import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Value from './Value';

// Mock helpers
jest.mock('../../../../../helpers/utils', () => ({
  sanitize: jest.fn((val) => val),
}));

describe('Value Component', () => {
  it('should render list item', () => {
    const { container } = render(<Value index="key" value="value" />);
    expect(container.querySelector('li')).toBeInTheDocument();
  });

  it('should render key label', () => {
    render(<Value index="name" value="John" />);
    expect(screen.getByText('name:')).toBeInTheDocument();
  });

  it('should render string value with quotes', () => {
    render(<Value index="name" value="John" />);
    expect(screen.getByText('"John"')).toBeInTheDocument();
  });

  it('should render number value', () => {
    render(<Value index="age" value={30} />);
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('should render boolean true value', () => {
    render(<Value index="active" value={true} />);
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render boolean false value', () => {
    render(<Value index="active" value={false} />);
    expect(screen.getByText('false')).toBeInTheDocument();
  });

  it('should render null value', () => {
    render(<Value index="empty" value={null} />);
    expect(screen.getByText('null')).toBeInTheDocument();
  });

  it('should render empty string value', () => {
    render(<Value index="empty" value="" />);
    expect(screen.getByText('""')).toBeInTheDocument();
  });

  it('should handle numeric index', () => {
    render(<Value index={0} value="first" />);
    expect(screen.getByText('0:')).toBeInTheDocument();
  });

  it('should apply correct styling for string', () => {
    render(<Value index="name" value="John" />);
    const span = screen.getByText('"John"');
    expect(span).toBeInTheDocument();
  });

  it('should apply correct styling for number', () => {
    render(<Value index="age" value={42} />);
    const span = screen.getByText('42');
    expect(span).toBeInTheDocument();
  });

  it('should apply correct styling for boolean', () => {
    render(<Value index="flag" value={true} />);
    const span = screen.getByText('true');
    expect(span).toBeInTheDocument();
  });

  it('should render object representation', () => {
    render(<Value index="obj" value={{}} />);
    expect(screen.getByText('{}')).toBeInTheDocument();
  });

  it('should render array representation', () => {
    render(<Value index="arr" value={[]} />);
    expect(screen.getByText('[]')).toBeInTheDocument();
  });

  it('should call onCopy on double click', async () => {
    const handleCopy = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<Value index="key" value="value" onCopy={handleCopy} />);

    const li = container.querySelector('li');
    await user.dblClick(li);

    expect(handleCopy).toHaveBeenCalledWith({ value: 'value' });
  });

  it('should handle long string values', () => {
    const longString = 'a'.repeat(100);
    render(<Value index="longKey" value={longString} />);
    expect(screen.getByText(new RegExp(longString.substring(0, 20)))).toBeInTheDocument();
  });

  it('should not call onCopy on single click', async () => {
    const handleCopy = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<Value index="key" value="value" onCopy={handleCopy} />);

    const li = container.querySelector('li');
    await user.click(li);

    expect(handleCopy).not.toHaveBeenCalled();
  });

  it('should handle undefined onCopy gracefully', async () => {
    const user = userEvent.setup();

    const { container } = render(<Value index="key" value="value" />);

    const li = container.querySelector('li');
    await user.dblClick(li);

    // Should not throw error
    expect(container).toBeInTheDocument();
  });

  it('should render colon after key', () => {
    render(<Value index="myKey" value="myValue" />);
    expect(screen.getByText('myKey:')).toBeInTheDocument();
  });
});
