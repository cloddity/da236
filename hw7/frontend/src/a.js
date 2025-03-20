import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders register, login, and products routes', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  expect(screen.getByText(/register/i)).toBeInTheDocument();
  expect(screen.getByText(/login/i)).toBeInTheDocument();
  expect(screen.getByText(/products/i)).toBeInTheDocument();
});
