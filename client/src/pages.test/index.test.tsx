// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

import { rest } from 'msw';

import setupMockServer from '@/msw/setupServer';
import Index, { getStaticProps } from '@/pages';
import { act, render, screen } from '@/test-utils';

const { server, state } = setupMockServer();

// eslint-disable-next-line no-promise-executor-return
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const ErrorHandling: Parameters<typeof rest.get>[1] = (_req, res, ctx) => {
  return res(ctx.status(500));
};

describe('Index page', () => {
  it('should have h1 tag', async () => {
    render(<Index />);
    expect(screen.getByRole('heading', { name: /welcome to/i })).toBeInTheDocument();
  });

  it('Should data loading successfully', async () => {
    render(<Index />);
    await act(async () => delay(1000));
    const { entities } = state.users;
    const firstName = entities[1]!.first_name;
    const lastName = entities[1]!.last_name;
    expect(screen.getByText(`${firstName} ${lastName}`)).toBeInTheDocument();
  });

  it('Should data loading failed with "No data found" message', async () => {
    server.use(rest.get('/api/users', ErrorHandling));
    render(<Index />);
    await act(async () => delay(1000));
    expect(screen.getByText(/No data found/i)).toBeInTheDocument();
  });

  it('Validate Index page getStaticProps', async () => {
    const { props } = await getStaticProps();
    expect(props).toEqual({ isLoginRedirect: true });
  });
});
