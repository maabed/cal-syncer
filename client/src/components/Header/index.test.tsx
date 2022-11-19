import userEvent from '@testing-library/user-event';

import setupMockServer from '@/msw/setupServer';
import { render, screen } from '@/test-utils';

import Header from '.';

setupMockServer();

describe('Render Header Component', () => {
  it('Toggle Navbar Open and Close button', async () => {
    render(<Header />);
    const openMenu = screen.getByRole('button', {
      name: /open menu/i,
    });
    expect(openMenu).toBeInTheDocument();
    await userEvent.click(openMenu);
    const closeMenu = screen.getByRole('button', {
      name: /close menu/i,
    });
    expect(closeMenu).toBeInTheDocument();
  });
});
