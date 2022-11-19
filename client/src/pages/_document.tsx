import '@/lib/mongodb/init';

import { ColorModeScript } from '@chakra-ui/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import appConfig from '@/utils/appConfig';
import appTheme from '@/utils/appTheme';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={appConfig.locale}>
        <Head />
        <body>
          <ColorModeScript initialColorMode={appTheme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
