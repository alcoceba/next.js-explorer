

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('webextension-polyfill', () => ({
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
  },
}));

describe('Popup/App.js', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
