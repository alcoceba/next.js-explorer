import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FlatRow from './FlatRow';

describe('FlatRow Component', () => {
  const mockRow = {
    path: 'test.key',
    key: 'test',
    value: 'test value',
    depth: 0,
    type: 'str',
    expandable: false,
    childCount: 0,
    isExpanded: false,
    isClosing: false,
  };

  const mockExpandableRow = {
    path: 'test.obj',
    key: 'obj',
    value: { nested: 'data' },
    depth: 0,
    type: 'object',
    expandable: true,
    childCount: 1,
    isExpanded: false,
    isClosing: false,
  };

  it('should render row with line number', () => {
    render(<FlatRow lineNumber={1} row={mockRow} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should render key text', () => {
    render(<FlatRow lineNumber={1} row={mockRow} />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should render value for string type', () => {
    render(<FlatRow lineNumber={1} row={mockRow} />);
    expect(screen.getByText('"test value"')).toBeInTheDocument();
  });

  it('should render colon separator', () => {
    const { container } = render(<FlatRow lineNumber={1} row={mockRow} />);
    expect(container.textContent).toContain(':');
  });

  it('should render expandable row with arrow', () => {
    render(<FlatRow lineNumber={1} row={mockExpandableRow} />);
    expect(screen.getByText('▶')).toBeInTheDocument();
  });

  it('should call onToggle when expandable row is clicked', async () => {
    const user = userEvent.setup();
    const mockOnToggle = jest.fn();
    const { container } = render(
      <FlatRow lineNumber={1} row={mockExpandableRow} onToggle={mockOnToggle} />
    );

    const row = container.querySelector('div');
    await user.click(row);

    expect(mockOnToggle).toHaveBeenCalledWith(mockExpandableRow.path);
  });

  it('should show copy button for copyable types', () => {
    render(<FlatRow lineNumber={1} row={mockRow} copyableTypes={['str']} onCopy={jest.fn()} />);
    expect(screen.getByLabelText('Copy value')).toBeInTheDocument();
  });

  it('should call onCopy when copy button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnCopy = jest.fn();
    render(<FlatRow lineNumber={1} row={mockRow} copyableTypes={['str']} onCopy={mockOnCopy} />);

    const copyButton = screen.getByLabelText('Copy value');
    await user.click(copyButton);

    expect(mockOnCopy).toHaveBeenCalledWith({ value: mockRow.value });
  });

  it('should render object opening bracket', () => {
    const objectRow = {
      ...mockExpandableRow,
      type: 'object',
      isExpanded: true,
    };
    render(<FlatRow lineNumber={1} row={objectRow} />);
    expect(screen.getByText('{')).toBeInTheDocument();
  });

  it('should render array opening bracket', () => {
    const arrayRow = {
      ...mockExpandableRow,
      type: 'array',
      isExpanded: true,
    };
    render(<FlatRow lineNumber={1} row={arrayRow} />);
    expect(screen.getByText('[')).toBeInTheDocument();
  });

  it('should display child count when not expanded', () => {
    const collapsedRow = {
      ...mockExpandableRow,
      childCount: 5,
      isExpanded: false,
    };
    const { container } = render(<FlatRow lineNumber={1} row={collapsedRow} />);
    expect(container.textContent).toContain('{5');
  });

  it('should render closing bracket row', () => {
    const closingRow = {
      path: 'test.obj.__closing',
      key: '',
      value: null,
      depth: 0,
      type: 'objectClose',
      expandable: false,
      childCount: 0,
      isExpanded: false,
      isClosing: true,
      closingBracket: '}',
    };
    render(<FlatRow lineNumber={4} row={closingRow} />);
    expect(screen.getByText('}')).toBeInTheDocument();
  });

  it('should render size info when showSizes is true and expandable', () => {
    const { container } = render(
      <FlatRow
        lineNumber={1}
        row={mockExpandableRow}
        showSizes={true}
        getSize={() => 1500}
        formatSize={(size) => `${(size / 1000).toFixed(1)} Kb`}
      />
    );
    expect(container.textContent).toContain('keys');
    expect(container.textContent).toContain('1.5 Kb');
  });

  it('should not render copy button for non-copyable types', () => {
    render(<FlatRow lineNumber={1} row={mockRow} copyableTypes={['obj']} onCopy={jest.fn()} />);
    expect(screen.queryByLabelText('Copy value')).not.toBeInTheDocument();
  });

  it('should highlight text when search matches key', () => {
    const { container } = render(
      <FlatRow lineNumber={1} row={mockRow} search="test" searchType="keys" />
    );
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
  });

  it('should not highlight when search does not match', () => {
    const { container } = render(
      <FlatRow lineNumber={1} row={mockRow} search="xyz" searchType="keys" />
    );
    const mark = container.querySelector('mark');
    expect(mark).not.toBeInTheDocument();
  });
});
