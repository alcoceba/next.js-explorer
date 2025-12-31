import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Table from './Table';

describe('Table Component', () => {
  const mockRows = [
    { key: 'route1', value: '/api/users', isVisible: true },
    { key: 'route2', value: '/api/posts', isVisible: true },
    { key: 'route3', value: '/admin', isVisible: false },
    { key: 'route4', value: '/settings', isVisible: false },
  ];

  it('should not render when rows array is empty', () => {
    const { container } = render(<Table rows={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when rows is undefined', () => {
    const { container } = render(<Table />);
    expect(container.firstChild).toBeNull();
  });

  it('should render table when rows are provided', () => {
    render(<Table rows={mockRows} />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should render only visible rows initially', () => {
    render(<Table rows={mockRows} />);
    expect(screen.getByText('route1')).toBeInTheDocument();
    expect(screen.getByText('route2')).toBeInTheDocument();
    expect(screen.queryByText('route3')).not.toBeInTheDocument();
    expect(screen.queryByText('route4')).not.toBeInTheDocument();
  });

  it('should render correct key-value pairs', () => {
    render(<Table rows={mockRows} />);
    expect(screen.getByText('/api/users')).toBeInTheDocument();
    expect(screen.getByText('/api/posts')).toBeInTheDocument();
  });

  it('should display show more button initially', () => {
    render(<Table rows={mockRows} />);
    expect(screen.getByText('+ show more')).toBeInTheDocument();
  });

  it('should toggle show more/less when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Table rows={mockRows} />);

    let button = screen.getByText('+ show more');
    expect(button).toBeInTheDocument();

    await user.click(button);
    button = screen.getByText('- show less');
    expect(button).toBeInTheDocument();

    await user.click(button);
    button = screen.getByText('+ show more');
    expect(button).toBeInTheDocument();
  });

  it('should show hidden rows after clicking show more', async () => {
    const user = userEvent.setup();
    render(<Table rows={mockRows} />);

    expect(screen.queryByText('route3')).not.toBeInTheDocument();

    await user.click(screen.getByText('+ show more'));
    expect(screen.getByText('route3')).toBeInTheDocument();
    expect(screen.getByText('route4')).toBeInTheDocument();
  });

  it('should hide all rows when show more is toggled back', async () => {
    const user = userEvent.setup();
    render(<Table rows={mockRows} />);

    await user.click(screen.getByText('+ show more'));
    expect(screen.getByText('route3')).toBeInTheDocument();

    await user.click(screen.getByText('- show less'));
    expect(screen.queryByText('route3')).not.toBeInTheDocument();
  });

  it('should render table rows correctly', () => {
    render(<Table rows={mockRows} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
  });

  it('should have correct structure for table cells', () => {
    render(<Table rows={mockRows} />);
    const cells = screen.getAllByRole('cell');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('should handle single row', () => {
    const singleRow = [{ key: 'single', value: 'value', isVisible: true }];
    render(<Table rows={singleRow} />);
    expect(screen.getByText('single')).toBeInTheDocument();
    expect(screen.getByText('value')).toBeInTheDocument();
  });

  it('should handle all rows visible', () => {
    const allVisible = [
      { key: 'key1', value: 'val1', isVisible: true },
      { key: 'key2', value: 'val2', isVisible: true },
      { key: 'key3', value: 'val3', isVisible: true },
    ];
    render(<Table rows={allVisible} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });

  it('should handle all rows hidden', () => {
    const allHidden = [
      { key: 'key1', value: 'val1', isVisible: false },
      { key: 'key2', value: 'val2', isVisible: false },
    ];
    render(<Table rows={allHidden} />);
    const rows = screen.queryAllByRole('row');
    expect(rows).toHaveLength(0);
  });
});
