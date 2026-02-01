import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renders input with placeholder', () => {
    render(<Input placeholder="Test placeholder" value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Test" value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Test');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('renders contentLeft and contentRight', () => {
    render(
      <Input
        placeholder="Test"
        value=""
        onChange={() => {}}
        contentLeft={<span>Left</span>}
        contentRight={<span>Right</span>}
      />
    );

    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('applies focused class when isFocused is true', () => {
    const { container } = render(
      <Input placeholder="Test" value="" onChange={() => {}} isFocused={true} />
    );

    const div = container.querySelector('div');

    expect(div).toBeInTheDocument();
    expect(div.querySelector('input')).toBeInTheDocument();
  });

  it('calls onFocus when input is focused', () => {
    const handleFocus = jest.fn();
    render(<Input placeholder="Test" value="" onChange={() => {}} onFocus={handleFocus} />);

    const input = screen.getByPlaceholderText('Test');
    fireEvent.focus(input);

    expect(handleFocus).toHaveBeenCalled();
  });

  it('calls onBlur when input loses focus', () => {
    const handleBlur = jest.fn();
    render(<Input placeholder="Test" value="" onChange={() => {}} onBlur={handleBlur} />);

    const input = screen.getByPlaceholderText('Test');
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalled();
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef();
    render(<Input ref={ref} placeholder="Test" value="test value" onChange={() => {}} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current.value).toBe('test value');
  });

  it('has correct input type', () => {
    render(<Input placeholder="Test" value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders without contentLeft and contentRight', () => {
    const { container } = render(<Input placeholder="Test" value="" onChange={() => {}} />);
    const spans = container.querySelectorAll('span');
    expect(spans).toHaveLength(0);
  });

  it('displays input value correctly', () => {
    render(<Input placeholder="Test" value="hello" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveValue('hello');
  });
});
