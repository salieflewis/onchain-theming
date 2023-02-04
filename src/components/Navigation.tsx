import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { useWeb3Storage } from '../hooks';
import { Account, EnableTheming } from '../components';
// import { cid } from '../components/Theme'; ??
import * as React from 'react';

export function Navigation() {

  // Connect 
  const { isConnected } = useAccount();

  // Init primaryColor
  const [primaryColor, setPrimaryColor] = React.useState<string | null>(null);
  
  const cid = 'bafybeicdumhupgrxwjp2a5ln6t7qhqhfgwbuy7mrikxoyaves2dztao5j4';
  const { unpackedMetadata } = useWeb3Storage(cid);
  console.log('Unpacked metadata:', unpackedMetadata);

  React.useEffect(() => {
    if (unpackedMetadata) {
      const parsedMetadata = JSON.parse(unpackedMetadata);
      console.log('Parsed metadata:', parsedMetadata);

      // "#e5e5dc"
      setPrimaryColor(parsedMetadata.colors.background);
    }
  }, [unpackedMetadata]);

  document.documentElement.style.setProperty('--primary-color', primaryColor);

  // Layout of Navbar
  return (
    <div className='theming-test__header--component sticky top-0 flex w-full justify-between items-center p-6'>
      <div>Header&nbsp;{primaryColor}</div>
      <div className='flex space-x-6'>
        <EnableTheming />
        <ConnectKitButton />
        {isConnected && <Account />}
      </div>
    </div>
  );
}
