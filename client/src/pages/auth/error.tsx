import type { NextPage } from 'next';
import React from 'react';

import { ErrorPageComponent } from '@/page-components/Error';
import UnAuthTemplate from '@/templates/UnAuthTemplate';

interface IErrorPageProps {
  statusCode: number;
}

const ErrorPage: NextPage<IErrorPageProps> = ({ statusCode }) => {
  return (
    <UnAuthTemplate metaTitle="Authentication Error">
      <ErrorPageComponent statusCode={statusCode} title="Authentication Failed" />
    </UnAuthTemplate>
  );
};

export const getInitialProps = async ({ res, err }: any) => {
  const errorStatusCode = err ? err.statusCode : 404;
  const statusCode = res ? res.statusCode : errorStatusCode;

  return { statusCode };
};

export default ErrorPage;
