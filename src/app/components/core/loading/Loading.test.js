import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading Component', () => {
  it('should not render loading indicator when isLoading is false', () => {
    render(
      <Loading isLoading={false}>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    expect(screen.queryByText('loading ...')).not.toBeInTheDocument();
  });

  it('should render loading indicator when isLoading is true', () => {
    render(
      <Loading isLoading={true}>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    expect(screen.getByText('loading ...')).toBeInTheDocument();
  });

  it('should always render children regardless of isLoading', () => {
    const { rerender } = render(
      <Loading isLoading={false}>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();

    rerender(
      <Loading isLoading={true}>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <Loading isLoading={false}>
        <div data-testid="child1">First</div>
        <div data-testid="child2">Second</div>
      </Loading>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  it('should handle undefined isLoading', () => {
    render(
      <Loading>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('should have correct loading indicator structure', () => {
    render(
      <Loading isLoading={true}>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    const loadingText = screen.getByText('loading ...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText.tagName).toBe('DIV');
  });

  it('should display loading text in correct element', () => {
    render(
      <Loading isLoading={true}>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    const textElement = screen.getByText('loading ...');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent('loading');
  });

  it('should render rocket emoji when loading', () => {
    render(
      <Loading isLoading={true}>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    const rocket = screen.getByLabelText('Rocket');
    expect(rocket).toBeInTheDocument();
    expect(rocket).toHaveTextContent('🚀');
  });

  it('should not render rocket emoji when not loading', () => {
    render(
      <Loading isLoading={false}>
        <div data-testid="child-content">Content</div>
      </Loading>
    );

    const rocket = screen.queryByLabelText('Rocket');
    expect(rocket).not.toBeInTheDocument();
  });
});
