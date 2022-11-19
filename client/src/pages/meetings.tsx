import type { NextPage } from 'next';

import { MeetingsComponent } from '@/page-components/Users';
import MainTemplate from '@/templates/MainTemplate';

const MeetingsPage: NextPage & { requireAuth: boolean } = () => {
  return (
    <MainTemplate metaTitle="Meetings">
      <MeetingsComponent />
    </MainTemplate>
  );
};

MeetingsPage.requireAuth = true;

export default MeetingsPage;
