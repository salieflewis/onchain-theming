import { ConnectKitButton } from 'connectkit';

export function Navigation() {
  return (
    <div className='theming-test__navigation sticky top-0 flex w-full justify-between items-center p-6'>
      <div className='flex gap-x-4'>
        <button className='bg-white text-black px-8 py-2 rounded-3xl hover:bg-[#E1E1E1]'>
          <span className='text-xl'>Onchain theming</span>
        </button>
      </div>
      <div className='flex space-x-6'>
        <ConnectKitButton />
      </div>
    </div>
  );
}
