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
      closeTrigger={<button>Close drawer</button>}
      content={
        <>
          <Palette />
          <SaveChanges />
        </>
      }
      drawerName={'palette'}
    ></DrawerComposition>
  );
}
