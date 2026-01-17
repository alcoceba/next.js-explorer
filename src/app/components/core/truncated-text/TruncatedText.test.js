import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TruncatedText from './TruncatedText';

describe('TruncatedText Component', () => {
  it('should render short text without truncation', () => {
    render(<TruncatedText text="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.queryByText('show more')).not.toBeInTheDocument();
  });

  it('should render dash when text is not provided', () => {
    render(<TruncatedText text={null} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('should truncate long text and show "show more" button', () => {
    const longText = 'a'.repeat(150);
    render(<TruncatedText text={longText} maxLength={100} />);
    expect(screen.getByText('show more')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('should expand text when "show more" is clicked', async () => {
    const user = userEvent.setup();
    const longText = 'a'.repeat(150);
    render(<TruncatedText text={longText} maxLength={100} />);

    const showMoreButton = screen.getByText('show more');
    await user.click(showMoreButton);

    expect(screen.getByText('show less')).toBeInTheDocument();
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('should collapse text when "show less" is clicked', async () => {
    const user = userEvent.setup();
    const longText = 'a'.repeat(150);
    render(<TruncatedText text={longText} maxLength={100} />);

    const showMoreButton = screen.getByText('show more');
    await user.click(showMoreButton);

    const showLessButton = screen.getByText('show less');
    await user.click(showLessButton);

    expect(screen.getByText('show more')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('should handle JSON strings', () => {
    const jsonString = JSON.stringify({ key: 'value', data: 'test' });
    render(<TruncatedText text={jsonString} maxLength={20} />);
    expect(screen.getByText('show more')).toBeInTheDocument();
  });

  it('should use custom maxLength', () => {
    const text = 'abcdefghij';
    render(<TruncatedText text={text} maxLength={5} />);
    expect(screen.getByText('show more')).toBeInTheDocument();
  });
});
