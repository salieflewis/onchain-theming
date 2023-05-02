import { getDefaultClient } from 'connectkit';
import { createClient, configureChains } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [
    publicProvider(),
    // @ts-ignore
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    // @ts-ignore
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY }),
  ]
);

export const client = createClient(
  getDefaultClient({
    appName: 'Onchain Theming',
    autoConnect: true,
    chains: [mainnet, goerli],
    provider,
  })
);
