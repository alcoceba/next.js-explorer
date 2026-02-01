import Tooltip, { Position } from './Tooltip';

export default {
  title: 'Core/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Trigger element (the thing you hover over)',
    },
    content: {
      control: 'text',
      description: 'Tooltip content text',
    },
    position: {
      control: 'select',
      options: Object.values(Position),
      description: 'Tooltip position relative to trigger',
    },
  },
};

export const Top = {
  args: {
    position: Position.TOP,
    content: 'This is a tooltip above',
    children: <span style={{ padding: '10px', border: '1px solid #ccc' }}>Hover me</span>,
  },
};

export const Bottom = {
  args: {
    position: Position.BOTTOM,
    content: 'This is a tooltip below',
    children: <span style={{ padding: '10px', border: '1px solid #ccc' }}>Hover me</span>,
  },
};

export const Left = {
  args: {
    position: Position.LEFT,
    content: 'Tooltip to the left',
    children: <span style={{ padding: '10px', border: '1px solid #ccc' }}>Hover me</span>,
  },
};

export const Right = {
  args: {
    position: Position.RIGHT,
    content: 'Tooltip to the right',
    children: <span style={{ padding: '10px', border: '1px solid #ccc' }}>Hover me</span>,
  },
};

export const WithLongContent = {
  args: {
    position: Position.TOP,
    content: 'This is a longer tooltip message that provides more detailed information',
    children: <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Help Button</button>,
  },
};

export const WithHTML = {
  args: {
    position: Position.BOTTOM,
    content: (
      <div>
        <strong>Info:</strong>
        <p>You can use HTML in tooltips</p>
      </div>
    ),
    children: <span style={{ padding: '10px', border: '1px solid #ccc' }}>Hover me</span>,
  },
};
