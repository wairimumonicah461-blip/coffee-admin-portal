import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home page', () => {
  it('renders the welcome heading', () => {
    render(<Home />);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});