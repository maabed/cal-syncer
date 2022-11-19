import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import { ErrorPageComponent } from '@/page-components/Error';
import MainTemplate from '@/templates/MainTemplate';
import UnAuthTemplate from '@/templates/UnAuthTemplate';

const Custom404Page: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <UnAuthTemplate metaTitle="404">
        <ErrorPageComponent statusCode={404} title="Page Not Found" />
      </UnAuthTemplate>
    );
  }

  return (
    <MainTemplate metaTitle="404 Page">
      <ErrorPageComponent statusCode={404} title="Page Not Found" />
    </MainTemplate>
  );
};

export default Custom404Page;
