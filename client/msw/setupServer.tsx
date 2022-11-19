import { mockServer } from './server';

const setupMockServer = () => {
  const { server, state } = mockServer();

  // Enable API mocking before tests.
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  return { server, state };
};

export default setupMockServer;
