import Portal from './Portal';
import React from 'react';

export default {
  title: 'Core/Portal',
  component: Portal,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Content to render in the portal (typically a single React element)',
    },
  },
  decorators: [
    (Story) => (
      <div>
        <p>Content rendered through portal (check in document.body):</p>
        <Story />
      </div>
    ),
  ],
};

export const Simple = {
  args: {
    children: (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          border: '2px solid #333',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}
      >
        <h3>Portaled Content</h3>
        <p>This element is rendered outside the component tree at document.body</p>
      </div>
    ),
  },
};

export const Toast = {
  args: {
    children: (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#4CAF50',
          color: 'white',
          padding: '16px',
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
        }}
      >
        ✓ Toast notification via Portal
      </div>
    ),
  },
};

export const Tooltip = {
  args: {
    children: (
      <div
        style={{
          position: 'fixed',
          top: '100px',
          left: '100px',
          background: '#333',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1000,
        }}
      >
        Tooltip via Portal
      </div>
    ),
  },
};
