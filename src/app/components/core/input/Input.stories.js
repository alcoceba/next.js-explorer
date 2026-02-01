import Input from './Input';
import SearchIcon from '../../../icons/SearchIcon';
import React from 'react';

export default {
  title: 'Core/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Input value',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
    onFocus: {
      action: 'focused',
      description: 'Focus handler',
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur handler',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    contentLeft: {
      control: false,
      description: 'Left side content node',
    },
    contentRight: {
      control: false,
      description: 'Right side content node',
    },
    isFocused: {
      control: 'boolean',
      description: 'Focus state styling',
    },
  },
};

export const Default = {
  args: {
    value: '',
    placeholder: 'Enter text...',
    isFocused: false,
  },
};

export const WithValue = {
  args: {
    value: 'Sample text',
    placeholder: 'Enter text...',
    isFocused: false,
  },
};

export const Focused = {
  args: {
    value: '',
    placeholder: 'This input is focused',
    isFocused: true,
  },
};

export const WithLeftContent = {
  args: {
    value: '',
    placeholder: 'Search...',
    contentLeft: <SearchIcon />,
  },
};

export const WithRightContent = {
  args: {
    value: 'Search query',
    placeholder: 'Search...',
    contentRight: <span style={{ cursor: 'pointer' }}>✕</span>,
  },
};

export const WithBothContent = {
  args: {
    value: '',
    placeholder: 'Search files...',
    contentLeft: <SearchIcon />,
    contentRight: <span style={{ cursor: 'pointer' }}>✕</span>,
  },
};
