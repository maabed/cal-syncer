import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import appConfig from '@/utils/appConfig';

type IMetaProps = {
  title?: string;
  description?: string;
  canonical?: string;
};

const Meta = ({ title, description, canonical }: IMetaProps) => {
  const router = useRouter();

  const seoTitle = title ? `${title} | ${appConfig.siteName}` : appConfig.siteName;
  const seoDescription = description || appConfig.description;
  const seoCanonical = canonical || `${appConfig.siteUrl}${router.asPath}`;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
        <link rel="apple-touch-icon" href={`${router.basePath}/apple-touch-icon.png`} key="apple" />
        <link rel="icon" type="image/png" sizes="32x32" href={`${router.basePath}/favicon-32x32.png`} key="icon32" />
        <link rel="icon" type="image/png" sizes="16x16" href={`${router.basePath}/favicon-16x16.png`} key="icon16" />
        <link rel="icon" href={`${router.basePath}/favicon.ico`} key="favicon" />
        <link rel="manifest" href={`${router.basePath}/site.webmanifest`} />
      </Head>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={seoCanonical}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          url: seoCanonical,
          locale: appConfig.locale,
          site_name: appConfig.siteName,
        }}
      />
    </>
  );
};

export default Meta;
