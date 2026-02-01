import Badge, { Variant } from './Badge';

export default {
  title: 'Core/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the badge',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
    variant: {
      control: 'select',
      options: Object.values(Variant),
      description: 'Badge variant style',
    },
    component: {
      control: false,
      description: 'Component to render as (div, span, etc)',
    },
  },
};

export const Default = {
  args: {
    label: 'Label',
    children: 'Badge Content',
    variant: Variant.DEFAULT,
  },
};

export const Primary = {
  args: {
    label: 'Label',
    children: 'Badge Content',
    variant: Variant.PRIMARY,
  },
};

export const Accent = {
  args: {
    label: 'Label',
    children: 'Badge Content',
    variant: Variant.ACCENT,
  },
};

export const WithLongText = {
  args: {
    label: 'Long Label Text',
    children: 'This is a badge with longer content to demonstrate text wrapping',
    variant: Variant.PRIMARY,
  },
};
