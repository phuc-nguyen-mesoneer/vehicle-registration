import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login link', () => {
  render(<App />);
  const linkElement = screen.getByText(/log in/i);
  expect(linkElement).toBeInTheDocument();
});
