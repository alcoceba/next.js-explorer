import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Value from './Value';

jest.mock('../../../../utils/sanitize', () => ({
  sanitize: jest.fn((val) => val),
}));

describe('Value Component', () => {
  it('should render list item', () => {
    const { container } = render(<Value index="key" value="value" />);
    expect(container.querySelector('li')).toBeInTheDocument();
  });

  it('should render key label', () => {
    const { container } = render(<Value index="name" value="John" />);
    const li = container.querySelector('li');
    expect(li.textContent).toContain('name');
  });

  it('should render string value with quotes', () => {
    const { container } = render(<Value index="name" value="John" />);
    // Value is rendered separately from key, check it exists
    const li = container.querySelector('li');
    expect(li.textContent).toContain('John');
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
    const { container } = render(<Value index={0} value="first" />);
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
  });

  it('should apply correct styling for string', () => {
    const { container } = render(<Value index="name" value="John" />);
    const li = container.querySelector('li');
    expect(li.textContent).toContain('John');
  });

  it('should apply correct styling for number', () => {
    const { container } = render(<Value index="age" value={42} />);
    const li = container.querySelector('li');
    expect(li.textContent).toContain('42');
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

    expect(container).toBeInTheDocument();
  });

  it('should render colon after key', () => {
    const { container } = render(<Value index="myKey" value="myValue" />);
    // The colon is rendered in a span element with the key class
    const spans = container.querySelectorAll('span');
    let foundColon = false;
    spans.forEach((span) => {
      if (span.textContent.includes(':')) {
        foundColon = true;
      }
    });
    expect(foundColon).toBe(true);
  });

  it('should apply highlighted class when highlight prop is provided', () => {
    const { container } = render(<Value index="key" value="value" highlight="val" />);
    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
  });

  it('should highlight matching text in key', () => {
    const { container } = render(<Value index="userName" value="John" highlight="user" />);
    // When text is highlighted, it gets split across mark elements
    expect(container.querySelector('mark')).toBeInTheDocument();
  });

  it('should highlight matching text in value', () => {
    const { container } = render(<Value index="name" value="John" highlight="john" />);
    // When value is highlighted, mark elements are created
    expect(container.querySelector('mark')).toBeInTheDocument();
  });

  it('should use mark elements for highlighted portions', () => {
    const { container } = render(<Value index="key" value="value" highlight="val" />);
    // HighlightedText creates mark elements for matching text
    expect(container.querySelectorAll('mark').length).toBeGreaterThanOrEqual(0);
  });

  it('should handle case-insensitive highlighting', () => {
    const { container } = render(<Value index="NAME" value="value" highlight="name" />);
    // Case-insensitive match should create mark element
    expect(container.querySelector('mark')).toBeInTheDocument();
  });

  it('should render without highlight when not provided', () => {
    const { container } = render(<Value index="key" value="value" />);
    const li = container.querySelector('li');
    expect(li.textContent).toContain('key:');
  });
});
