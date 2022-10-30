import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Home } from '@/components/home';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: 'Haderman',
    });


    expect(heading).toBeInTheDocument();
  });
});
