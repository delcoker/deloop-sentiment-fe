import { render, screen } from '@testing-library/react';
import App from './App';

test('remove forgot password', () => {
  render(<App />);
  const linkElement = screen.getByText(/Forgot Password/i);
  expect(linkElement).not.toBeInTheDocument()
});

test('remove register link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).not.toBeInTheDocument();
});
