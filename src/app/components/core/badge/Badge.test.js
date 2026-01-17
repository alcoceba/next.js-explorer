import React from 'react';
import { render } from '@testing-library/react';
import Badge, { Variant } from './Badge';

// Mock CSS Module
jest.mock('./Badge.module.css', () => ({
  badge: 'badge',
  badge_default: 'badge_default',
  badge_accent: 'badge_accent',
  label: 'label',
  children: 'children',
}));

describe('Badge', () => {
  it('renders with label and children', () => {
    const { container } = render(<Badge label="Test Label">Test Child</Badge>);
    expect(container.textContent).toContain('Test Label');
    expect(container.textContent).toContain('Test Child');
  });

  it('renders with default variant', () => {
    const { container } = render(<Badge label="Default Label">Default Child</Badge>);
    const badge = container.firstChild;
    expect(badge.className).toContain('badge');
    expect(badge.className).toContain('badge_default');
  });

  it('renders with accent variant', () => {
    const { container } = render(
      <Badge label="Accent Label" variant={Variant.ACCENT}>
        Accent Child
      </Badge>
    );
    const badge = container.firstChild;
    expect(badge.className).toContain('badge');
    expect(badge.className).toContain('badge_accent');
  });

  it('renders with custom component', () => {
    const { container } = render(
      <Badge label="Span Label" component="span">
        Span Child
      </Badge>
    );
    const badge = container.querySelector('span');
    expect(badge).toBeTruthy();
    expect(badge.className).toContain('badge');
  });

  it('passes extra props to the root component', () => {
    const { container } = render(
      <Badge label="Props Label" data-testid="badge-props">
        Props Child
      </Badge>
    );
    const badge = container.querySelector('[data-testid="badge-props"]');
    expect(badge).toBeTruthy();
  });

  it('applies variant class names correctly', () => {
    const { rerender, container } = render(
      <Badge label="Label" variant={Variant.DEFAULT}>
        Child
      </Badge>
    );
    let badge = container.firstChild;
    expect(badge.className).toContain('badge_default');

    rerender(
      <Badge label="Label" variant={Variant.ACCENT}>
        Child
      </Badge>
    );
    badge = container.firstChild;
    expect(badge.className).toContain('badge_accent');
  });
});
