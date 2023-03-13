import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Head from 'next/head';
import { store } from '../stores/store';
import { Provider } from 'react-redux';
import '../css/main.css';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const title = `Кішка Стрибає`;

  const description = 'Адміністративна панель';

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Head>
            <meta name="description" content={description} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <link rel="icon" href="/favicon.png" />
          </Head>

          <Component {...pageProps} />
        </>,
      )}
    </Provider>
  );
}

export default MyApp;
