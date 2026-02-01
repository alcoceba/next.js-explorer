import React from 'react';
import { render } from '@testing-library/react';
import HighlightedText from './HighlightedText';

describe('HighlightedText Component', () => {
  it('should render text without highlighting when search is empty', () => {
    const { container } = render(<HighlightedText text="hello world" search="" />);
    expect(container.textContent).toBe('hello world');
  });

  it('should render text without highlighting when search is not provided', () => {
    const { container } = render(<HighlightedText text="hello world" />);
    expect(container.textContent).toBe('hello world');
  });

  it('should render text without highlighting when text is empty', () => {
    const { container } = render(<HighlightedText text="" search="test" />);
    expect(container.textContent).toBe('');
  });

  it('should highlight matching text', () => {
    const { container } = render(<HighlightedText text="hello world" search="world" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('world');
  });

  it('should highlight case-insensitively', () => {
    const { container } = render(<HighlightedText text="Hello World" search="hello" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('Hello');
  });

  it('should highlight multiple occurrences', () => {
    const { container } = render(<HighlightedText text="hello hello hello" search="hello" />);
    const marks = container.querySelectorAll('mark');
    expect(marks.length).toBe(3);
  });

  it('should not highlight when search does not match', () => {
    const { container } = render(<HighlightedText text="hello world" search="xyz" />);
    const mark = container.querySelector('mark');
    expect(mark).not.toBeInTheDocument();
  });

  it('should preserve non-matching text', () => {
    const { container } = render(<HighlightedText text="hello world" search="world" />);
    expect(container.textContent).toBe('hello world');
  });

  it('should handle partial word matching', () => {
    const { container } = render(<HighlightedText text="hello world" search="llo" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('llo');
  });

  it('should handle special characters in text', () => {
    const { container } = render(<HighlightedText text="test@email.com" search="email" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('email');
  });

  it('should handle numbers in text', () => {
    const { container } = render(<HighlightedText text="test123test" search="123" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('123');
  });

  it('should work with very long text', () => {
    const longText = 'a'.repeat(10000) + 'needle' + 'a'.repeat(10000);
    const { container } = render(<HighlightedText text={longText} search="needle" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('needle');
  });

  it('should handle search term at the beginning', () => {
    const { container } = render(<HighlightedText text="test content" search="test" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('test');
  });

  it('should handle search term at the end', () => {
    const { container } = render(<HighlightedText text="test content" search="content" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('content');
  });

  it('should handle entire text as search term', () => {
    const { container } = render(<HighlightedText text="hello" search="hello" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark.textContent).toBe('hello');
  });

  it('should convert text to string', () => {
    const { container } = render(<HighlightedText text="123" search="2" />);
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
  });
});
