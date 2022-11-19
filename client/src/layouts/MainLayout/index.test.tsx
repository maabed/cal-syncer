import { render, screen, waitFor } from '@/test-utils';

import { MainLayout } from '.';

describe('MainLayout component', () => {
  describe('Render method', () => {
    it('should a render base layout', async () => {
      render(
        <MainLayout>
          <h1>Hello World</h1>
        </MainLayout>,
      );

      await waitFor(() => {
        expect(screen.getByText('Hello World')).toBeInTheDocument();
      });
    });
  });
});
