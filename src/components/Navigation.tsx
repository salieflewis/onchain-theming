import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

import { Account } from '../components';

export function Navigation() {
  const { isConnected } = useAccount();
  return (
    <div className='theming-test-nav__bg sticky top-0 flex w-full justify-between p-6'>
      <div></div>
      <div>
        <ConnectKitButton />
        {isConnected && <Account />}
      </div>
    </div>
  );
}
