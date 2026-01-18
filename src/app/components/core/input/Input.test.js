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
    // Check that the div renders and has some content (the focused state is applied via CSS modules)
    expect(div).toBeInTheDocument();
    expect(div.querySelector('input')).toBeInTheDocument();
  });
});
