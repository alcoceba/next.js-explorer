import Button, { Variant, Size } from './Button';

export default {
  title: 'Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button label text',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
    },
    variant: {
      control: 'select',
      options: Object.values(Variant),
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: Object.values(Size),
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    title: {
      control: 'text',
      description: 'Tooltip title attribute',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label',
    },
  },
};

export const Default = {
  args: {
    children: 'Click me',
    variant: Variant.DEFAULT,
    size: Size.DEFAULT,
    disabled: false,
  },
};

export const Primary = {
  args: {
    children: 'Primary Button',
    variant: Variant.PRIMARY,
    size: Size.DEFAULT,
  },
};

export const Critical = {
  args: {
    children: 'Delete',
    variant: Variant.CRITICAL,
    size: Size.DEFAULT,
  },
};

export const Secondary = {
  args: {
    children: 'Secondary',
    variant: Variant.SECONDARY,
    size: Size.DEFAULT,
  },
};

export const Accent = {
  args: {
    children: 'Accent Button',
    variant: Variant.ACCENT,
    size: Size.DEFAULT,
  },
};

export const Small = {
  args: {
    children: 'Small',
    variant: Variant.DEFAULT,
    size: Size.SMALL,
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    variant: Variant.DEFAULT,
    size: Size.DEFAULT,
    disabled: true,
  },
};

export const WithTitle = {
  args: {
    children: '?',
    title: 'Help information',
    ariaLabel: 'Help button',
    size: Size.SMALL,
  },
};
