import Message from './Message';

export default {
  title: 'Core/Message',
  component: Message,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Message content',
    },
  },
};

export const Default = {
  args: {
    children: 'This is a message notification',
  },
};

export const Success = {
  args: {
    children: '✓ Operation completed successfully',
  },
};

export const Info = {
  args: {
    children: 'ℹ This is an informational message',
  },
};

export const Warning = {
  args: {
    children: '⚠ Warning: Please review this information',
  },
};

export const Error = {
  args: {
    children: '✕ Error: Something went wrong',
  },
};

export const LongMessage = {
  args: {
    children:
      'This is a longer message that spans multiple words. Messages can contain any content you need to display to users.',
  },
};
