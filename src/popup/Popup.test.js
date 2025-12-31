import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Popup from './Popup';

jest.mock('webextension-polyfill', () => ({
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
  },
}));

describe('Popup directory components', () => {
  it('renders App without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders Popup without crashing', () => {
    render(<Popup />);
    expect(screen.getByTestId('popup-root')).toBeInTheDocument();
  });
});
