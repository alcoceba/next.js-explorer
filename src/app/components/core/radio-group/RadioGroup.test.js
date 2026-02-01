import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
  const options = [
    { value: 'keys', label: 'Search Keys' },
    { value: 'values', label: 'Search Values' },
    { value: 'both', label: 'Search Keys & Values' },
  ];

  it('renders radio group with options', () => {
    const handleChange = jest.fn();
    render(<RadioGroup options={options} value="both" onChange={handleChange} />);

    expect(screen.getByLabelText('Search Keys')).toBeInTheDocument();
    expect(screen.getByLabelText('Search Values')).toBeInTheDocument();
    expect(screen.getByLabelText('Search Keys & Values')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(<RadioGroup options={options} value="keys" onChange={handleChange} />);

    const valuesOption = screen.getByLabelText('Search Values');
    fireEvent.click(valuesOption);

    expect(handleChange).toHaveBeenCalledWith('values');
  });

  it('shows correct option as selected', () => {
    const handleChange = jest.fn();
    render(<RadioGroup options={options} value="both" onChange={handleChange} />);

    const bothOption = screen.getByLabelText('Search Keys & Values');
    expect(bothOption).toBeChecked();
  });

  it('renders label when provided', () => {
    const handleChange = jest.fn();
    render(
      <RadioGroup options={options} value="both" onChange={handleChange} label="Search Type" />
    );

    expect(screen.getByText('Search Type')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <RadioGroup options={options} value="both" onChange={handleChange} />
    );

    const labels = container.querySelectorAll('span.label');
    expect(labels.length).toBe(0);
  });

  it('renders options with tooltips', () => {
    const optionsWithTooltip = [
      { value: 'keys', label: 'Search Keys', tooltip: 'Search by keys only' },
      { value: 'values', label: 'Search Values' },
    ];
    const handleChange = jest.fn();

    render(<RadioGroup options={optionsWithTooltip} value="keys" onChange={handleChange} />);

    expect(screen.getByText('Search Keys')).toBeInTheDocument();
  });

  it('only unselects other options when one is selected', () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <RadioGroup options={options} value="keys" onChange={handleChange} />
    );

    let keysOption = screen.getByLabelText('Search Keys');
    let valuesOption = screen.getByLabelText('Search Values');
    expect(keysOption).toBeChecked();
    expect(valuesOption).not.toBeChecked();

    rerender(<RadioGroup options={options} value="values" onChange={handleChange} />);

    keysOption = screen.getByLabelText('Search Keys');
    valuesOption = screen.getByLabelText('Search Values');
    expect(keysOption).not.toBeChecked();
    expect(valuesOption).toBeChecked();
  });

  it('handles single option', () => {
    const singleOption = [{ value: 'single', label: 'Single Option' }];
    const handleChange = jest.fn();
    render(<RadioGroup options={singleOption} value="single" onChange={handleChange} />);

    expect(screen.getByLabelText('Single Option')).toBeInTheDocument();
  });

  it('updates selected option when value prop changes', () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <RadioGroup options={options} value="keys" onChange={handleChange} />
    );

    expect(screen.getByLabelText('Search Keys')).toBeChecked();

    rerender(<RadioGroup options={options} value="both" onChange={handleChange} />);

    expect(screen.getByLabelText('Search Keys & Values')).toBeChecked();
  });
});
