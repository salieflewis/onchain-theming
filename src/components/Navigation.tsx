import { ConnectKitButton } from 'connectkit';

export function Navigation() {
  return (
    <div className='theming-test__navigation sticky top-0 flex w-full justify-between items-center p-6'>
      <div className='flex gap-x-4'>
        <span className='text-xl'>Onchain Theming</span>
      </div>
      <div className='flex space-x-6'>
        <ConnectKitButton />
      </div>
    </div>
  );
}
