import type { NextPage } from 'next';

import { HomeComponent } from '@/page-components/Home';
import MainTemplate from '@/templates/MainTemplate';

const Index: NextPage & { requireAuth: boolean } = () => {
  return (
    <MainTemplate metaTitle="Home">
      <HomeComponent />
    </MainTemplate>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      isLoginRedirect: true,
    },
  };
};

Index.requireAuth = true;

export default Index;
