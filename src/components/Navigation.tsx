import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import { Account } from '../components';

export function Navigation() {
  const { isConnected } = useAccount();

  return (
    <div className='theming-test__navigation sticky top-0 flex w-full justify-between items-center p-6'>
      <div className='flex gap-x-4'>
        <div>About</div>
        <div>Contact</div>
      </div>
      <div className='flex space-x-6'>
        <ConnectKitButton />
        {isConnected && <Account />}
      </div>
    </div>
  );
}
