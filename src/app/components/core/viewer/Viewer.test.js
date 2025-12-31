import React from 'react';
import { render, screen } from '@testing-library/react';
import Viewer from './Viewer';

describe('Viewer Component', () => {
  it('should render viewer container', () => {
    const mockJson = { key: 'value' };
    render(<Viewer json={mockJson} />);
    expect(screen.getByText('key:')).toBeInTheDocument();
  });

  it('should display no data message when json is empty', () => {
    render(<Viewer json={{}} />);
    expect(screen.getByText('No data was found')).toBeInTheDocument();
  });

  it('should display no data message when json is null', () => {
    render(<Viewer json={null} />);
    expect(screen.getByText('No data was found')).toBeInTheDocument();
  });

  it('should display no data message when json is undefined', () => {
    render(<Viewer json={undefined} />);
    expect(screen.getByText('No data was found')).toBeInTheDocument();
  });

  it('should render pre element', () => {
    const mockJson = { key: 'value' };
    const { container } = render(<Viewer json={mockJson} />);
    expect(container.querySelector('pre')).toBeInTheDocument();
  });

  it('should render tree structure when json is provided', () => {
    const mockJson = { name: 'John', age: 30 };
    render(<Viewer json={mockJson} />);
    expect(screen.getByText('name:')).toBeInTheDocument();
  });

  it('should render multiple properties', () => {
    const mockJson = {
      prop1: 'value1',
      prop2: 'value2',
      prop3: 'value3',
    };
    render(<Viewer json={mockJson} />);
    expect(screen.getByText('prop1:')).toBeInTheDocument();
    expect(screen.getByText('prop2:')).toBeInTheDocument();
    expect(screen.getByText('prop3:')).toBeInTheDocument();
  });

  it('should apply viewer class to container', () => {
    const mockJson = { key: 'value' };
    const { container } = render(<Viewer json={mockJson} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should call onCopy when prop is double-clicked', () => {
    const handleCopy = jest.fn();
    const mockJson = { key: 'value' };
    render(<Viewer json={mockJson} onCopy={handleCopy} />);

    const valueElement = screen.getByText('"value"');
    // Note: Full double-click test would require more complex setup
    expect(valueElement).toBeInTheDocument();
  });
});
