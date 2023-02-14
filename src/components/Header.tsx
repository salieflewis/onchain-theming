import { ConnectKitButton } from 'connectkit';
import { Drawer } from './Drawer';

export function Header() {
  return (
    <div className='sticky top-0 flex w-full justify-between items-center p-6'>
      <Drawer />
      <ConnectKitButton />
    </div>
  );
}
