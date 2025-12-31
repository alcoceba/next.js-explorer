
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Popup/App.js', () => {
  it('renders without crashing', () => {
    render(<App />);
    const main = screen.queryByRole('main');
    expect(main || screen.getByText(/next\.js/i)).toBeTruthy();
  });
});
