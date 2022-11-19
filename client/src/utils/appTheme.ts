import { extendTheme } from '@chakra-ui/react';

import { roboto } from '@/fonts/roboto';

const appTheme = extendTheme({
  fonts: {
    body: roboto.style.fontFamily,
    heading: roboto.style.fontFamily,
  },
  colors: {
    primary: '#209cee',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});

export default appTheme;
