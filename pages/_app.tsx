// import '../styles/globals.css'
import type { AppProps } from 'next/app';
import {
  SSRProvider,
  Provider,
  lightTheme,
  ActionButton,
  Flex,
  View,
} from '@adobe/react-spectrum';
import { ColorScheme } from '@react-types/provider';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SSRProvider>
      <Provider theme={lightTheme} colorScheme='light'>
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
}
export default MyApp;
