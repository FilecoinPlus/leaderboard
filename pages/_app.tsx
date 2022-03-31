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
import Moon from '@spectrum-icons/workflow/Moon';
import Light from '@spectrum-icons/workflow/Light';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<ColorScheme>('light');

  let themeIcons = { dark: <Moon />, light: <Light /> };
  let otherTheme: ColorScheme = theme === 'light' ? 'dark' : 'light';

  return (
    <SSRProvider>
      <Provider theme={lightTheme} colorScheme={theme}>
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
}
export default MyApp;
