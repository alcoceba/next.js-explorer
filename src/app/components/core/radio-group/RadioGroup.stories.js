import RadioGroup from './RadioGroup';

export default {
  title: 'Core/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler function',
    },
    options: {
      control: false,
      description: 'Array of radio option objects with value, label, and optional tooltip',
    },
    label: {
      control: 'text',
      description: 'Group label',
    },
  },
};

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const optionsWithTooltips = [
  { value: 'keys', label: 'Keys', tooltip: 'Search in keys only' },
  { value: 'values', label: 'Values', tooltip: 'Search in values only' },
  { value: 'both', label: 'Keys & Values', tooltip: 'Search in both keys and values' },
];

export const Default = {
  args: {
    options: defaultOptions,
    value: 'option1',
    label: 'Choose an option',
  },
};

export const WithoutLabel = {
  args: {
    options: defaultOptions,
    value: 'option2',
  },
};

export const WithTooltips = {
  args: {
    options: optionsWithTooltips,
    value: 'keys',
    label: 'Search Type',
  },
};

export const SingleOption = {
  args: {
    options: [{ value: 'only', label: 'Only Option' }],
    value: 'only',
    label: 'Single Choice',
  },
};

export const ManyOptions = {
  args: {
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'xlarge', label: 'Extra Large' },
      { value: 'xxlarge', label: 'Extra Extra Large' },
    ],
    value: 'medium',
    label: 'Size Selection',
  },
};
