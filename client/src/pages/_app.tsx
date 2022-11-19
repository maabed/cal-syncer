import '../styles/global.scss';

import type { AppProps } from 'next/app';
import Router from 'next/router';
import type { Session } from 'next-auth';
import NProgress from 'nprogress';

import { AuthLayout } from '@/layouts/AuthLayout';
import { MainLayout } from '@/layouts/MainLayout';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface MyAppProps<TAppProps> extends AppProps<TAppProps> {
  Component: AppProps['Component'] & { requireAuth?: boolean };
}

interface IMyAppPageProps {
  isLoginRedirect?: boolean;
  session: Session;
  cookies: string;
}

const MyApp = ({ Component, pageProps }: MyAppProps<IMyAppPageProps>) => {
  return (
    <MainLayout session={pageProps.session} cookies={pageProps.cookies}>
      {Component.requireAuth ? (
        <AuthLayout isLoginRedirect={pageProps.isLoginRedirect}>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </MainLayout>
  );
};

export default MyApp;

export { getServerSideProps } from '@/providers/AppChakraProvider';
