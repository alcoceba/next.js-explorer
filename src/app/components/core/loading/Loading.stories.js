import React from 'react';
import Loading from './Loading';

export default {
  title: 'Core/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    children: {
      control: false,
      description: 'Content to display when not loading',
    },
  },
};

export const Loading_State = {
  args: {
    isLoading: true,
    children: React.createElement(
      'div',
      { style: { padding: '100px 50px', textAlign: 'center' } },
      'This content is hidden while loading'
    ),
  },
};
