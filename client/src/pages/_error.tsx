import type { NextPage } from 'next';
import React from 'react';

import { ErrorPageComponent } from '@/page-components/Error';
import MainTemplate from '@/templates/MainTemplate';

interface IErrorPageProps {
  statusCode: number;
}

const ErrorPage: NextPage<IErrorPageProps> = ({ statusCode }) => {
  return (
    <MainTemplate metaTitle="Error Page">
      <ErrorPageComponent statusCode={statusCode} />
    </MainTemplate>
  );
};

export const getInitialProps = async ({ res, err }: any) => {
  const errorStatusCode = err ? err.statusCode : 404;
  const statusCode = res ? res.statusCode : errorStatusCode;

  return { statusCode };
};

export default ErrorPage;
