
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Popup from './Popup';

describe('Popup directory components', () => {
  it('renders App without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('popup-app') || screen.getByRole('main') || screen.getByText(/next\.js/i)).toBeTruthy();
  });

  it('renders Popup without crashing', () => {
    render(<Popup />);
    expect(screen.getByTestId('popup-root') || screen.getByRole('dialog') || screen.getByText(/next\.js/i)).toBeTruthy();
  });
});
