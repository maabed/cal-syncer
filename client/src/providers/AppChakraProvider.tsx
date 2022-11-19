import {
  ChakraProvider as ChakraProviderOriginal,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';
import type { FC, ReactNode } from 'react';

import { DelayChildRendering } from '@/components/DelayChildRendering';
import appTheme from '@/utils/appTheme';

interface IAppChakraProviderProps {
  cookies?: string;
  children: ReactNode;
}

export const AppChakraProvider: FC<IAppChakraProviderProps> = ({ cookies, children }) => {
  // b) Pass `colorModeManager` prop
  const colorModeManager = typeof cookies === 'string' ? cookieStorageManagerSSR(cookies) : localStorageManager;
  return (
    <ChakraProviderOriginal theme={appTheme} colorModeManager={colorModeManager}>
      <DelayChildRendering>{children}</DelayChildRendering>
    </ChakraProviderOriginal>
  );
};

// also export a reusable function getServerSideProps
export const getServerSideProps: GetServerSideProps<{ cookies: string }> = async ({ req }) => {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
};
