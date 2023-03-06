import '../styles/globals.css';
import * as React from 'react';
import { ConnectKitProvider } from 'connectkit';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { WagmiConfig } from 'wagmi';
import { client } from '../wagmi';
import { DrawerContextProvider } from '../drawer';
import '@fontsource/unifont';

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme='auto' mode='light'>
        <DrawerContextProvider>
          <NextHead>
            <title>Onchain Theming</title>
          </NextHead>
          {mounted && <Component {...pageProps} />}
        </DrawerContextProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
