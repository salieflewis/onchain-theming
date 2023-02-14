import { DrawerComposition } from '../drawer';
import { useDrawer } from '../drawer/useDrawer';
import { Palette } from './Palette';
import { SaveChanges } from './SaveChanges';
import { ThemingButton } from './ThemingButton';

export function Drawer() {
  const { requestClose } = useDrawer();

  return (
    <DrawerComposition
      trigger={<ThemingButton />}
      closeTrigger={
        <div className='p-4'>
          <button>
            <span className='text-xl'>X</span>
          </button>
        </div>
      }
      content={
        <div className='flex flex-col justify-between h-full p-6'>
          <Palette />
          <SaveChanges />
        </div>
      }
      drawerName={'palette'}
    ></DrawerComposition>
  );
}
