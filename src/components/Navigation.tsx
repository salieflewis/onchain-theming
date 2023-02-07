import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { useWeb3Storage } from '../hooks';
import { Account } from '../components';
import { useThemeContext } from '../context/ThemeProvider';
import * as React from 'react';

export function Navigation() {
  const { isConnected } = useAccount();

  const { themeData } = useThemeContext();

  const [primaryColor, setPrimaryColor] = React.useState<string | null>(null);

  const { unpackedMetadata } = useWeb3Storage(themeData);

  console.log('Unpacked metadata:', unpackedMetadata);

  React.useEffect(() => {
    if (unpackedMetadata) {
      const parsedMetadata = JSON.parse(unpackedMetadata);
      setPrimaryColor(parsedMetadata.theme.color.background);
    }
  }, [unpackedMetadata]);

  document.documentElement.style.setProperty('--primary-color', primaryColor);

  return (
    <div className='theming-test__header--component sticky top-0 flex w-full justify-between items-center p-6'>
      <div>Header&nbsp;{primaryColor}</div>
      <div className='flex space-x-6'>
        <ConnectKitButton />
        {isConnected && <Account />}
      </div>
    </div>
  );
}
