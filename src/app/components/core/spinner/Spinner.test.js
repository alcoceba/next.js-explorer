import React from 'react';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

jest.mock('./Spinner.module.css', () => ({
  spinner: 'spinner',
  small: 'small',
  medium: 'medium',
  large: 'large',
  circle: 'circle',
}));

describe('Spinner Component', () => {
  it('should render spinner container', () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('div');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render SVG element', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 18 18');
  });

  it('should render two circles', () => {
    const { container } = render(<Spinner />);
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(2);
  });

  it('should apply default size class', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild;
    expect(spinner.className).toContain('medium');
  });

  it('should apply small size class', () => {
    const { container } = render(<Spinner size="small" />);
    const spinner = container.firstChild;
    expect(spinner.className).toContain('small');
  });

  it('should apply large size class', () => {
    const { container } = render(<Spinner size="large" />);
    const spinner = container.firstChild;
    expect(spinner.className).toContain('large');
  });

  it('should have circle class on second circle', () => {
    const { container } = render(<Spinner />);
    const circles = container.querySelectorAll('circle');
    expect(circles[1].className.baseVal).toContain('circle');
  });

  it('should render with correct SVG attributes', () => {
    const { container } = render(<Spinner />);
    const circles = container.querySelectorAll('circle');
    circles.forEach((circle) => {
      expect(circle).toHaveAttribute('cx', '9');
      expect(circle).toHaveAttribute('cy', '9');
      expect(circle).toHaveAttribute('r', '7');
      expect(circle).toHaveAttribute('stroke', 'currentColor');
      expect(circle.getAttribute('stroke-width')).toBe('1.5');
      expect(circle).toHaveAttribute('fill', 'none');
    });
  });

  it('should render with stroke-dasharray on animated circle', () => {
    const { container } = render(<Spinner />);
    const circles = container.querySelectorAll('circle');
    expect(circles[1].getAttribute('stroke-dasharray')).toBe('11');
    expect(circles[1].getAttribute('stroke-dashoffset')).toBe('0');
  });
});
