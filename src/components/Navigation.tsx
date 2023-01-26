import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { useWeb3Storage } from '../hooks';
import { Account } from '../components';

export function Navigation() {
  const { isConnected } = useAccount();

  const cid = 'bafybeicdumhupgrxwjp2a5ln6t7qhqhfgwbuy7mrikxoyaves2dztao5j4'

  const { unpackedMetadata } = useWeb3Storage(cid);

  // let stringMetadata = unpackedMetadata as string

  // console.log(JSON.parse(stringMetadata))

  // const parsedMetadata = JSON.parse(unpackedMetadata as string)

  // console.log(parsedMetadata[0])

  const randomHex = '#784569'

  document.documentElement.style.setProperty(
    '--primary-color',
    randomHex
  );

  return (
    <div
      // id='theming-test__header--component'
      // bg-[var():--primary-color]
      className='theming-test__header--component sticky top-0 flex w-full justify-between p-6'
    >
      <div></div>
      <div>
        <ConnectKitButton />
        {isConnected && <Account />}
      </div>
    </div>
  );
}
