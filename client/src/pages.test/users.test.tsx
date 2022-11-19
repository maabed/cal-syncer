import UsersPage from '@/pages/meetings';
import { render } from '@/test-utils';

describe('Users Page Render', () => {
  it('should render', () => {
    render(<UsersPage />);
    expect(document.title).toBe('Users | Syncer');
  });
});
