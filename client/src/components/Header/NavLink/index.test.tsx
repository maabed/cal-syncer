import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';

import { act, render, renderHook, screen } from '@/test-utils';

import { NavLink } from '.';

describe('Render NavLink Component', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/initial');
  });

  it('NonActive NavLink', async () => {
    const { result } = renderHook(() => {
      return useRouter();
    });

    act(() => {
      result.current.push('/unknown');
    });

    render(
      <NavLink href="/users">
        <div>Link</div>
      </NavLink>,
    );
    const link = screen.getByRole('link', {
      name: /link/i,
    });
    expect(link).toBeInTheDocument();
    expect(result.current).toMatchObject({ asPath: '/unknown' });
  });

  it('Active NavLink', async () => {
    const { result } = renderHook(() => {
      return useRouter();
    });

    act(() => {
      result.current.push('/users');
    });

    render(
      <NavLink href="/users">
        <div>Link</div>
      </NavLink>,
    );
    const link = screen.getByRole('link', {
      name: /link/i,
    });
    expect(link).toBeInTheDocument();
    expect(result.current).toMatchObject({ asPath: '/users' });
  });
});
