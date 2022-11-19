import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { ErrorPageComponent } from '@/page-components/Error';
import { SignInPageComponent } from '@/page-components/SignIn';
import UnAuthTemplate from '@/templates/UnAuthTemplate';

const OAuthCallbackErrorComponent: FC = () => {
  return (
    <ErrorPageComponent
      statusCode={500}
      title="Authentication Failed"
      message="Something went wrong in while Authentication. Please try again later."
    />
  );
};

const SignInPage: NextPage = () => {
  const router = useRouter();
  const { error } = router.query;

  const isAuthError = error === 'OAuthCallback' || error === 'Callback';
  const title = isAuthError ? 'Authentication Error' : 'Sign In';
  const Component = isAuthError ? OAuthCallbackErrorComponent : SignInPageComponent;

  return (
    <UnAuthTemplate metaTitle={title}>
      <Component />
    </UnAuthTemplate>
  );
};

export default SignInPage;
