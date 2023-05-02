import { DrawerComposition } from "../drawer";
import { useDrawer } from "../drawer/useDrawer";
import { Palette } from "./Palette";
import { Save } from "./Save";
import { ThemingButton } from "./ThemingButton";

export function Drawer() {
  return (
    <DrawerComposition
      trigger={<ThemingButton />}
      closeTrigger={
        <button type="button">
          <span className="text-sm text-[#ACB1B9]">Close</span>
        </button>
      }
      content={
        <div className="flex flex-col justify-between px-6 pt-2">
          <Palette />
          <Save />
        </div>
      }
      drawerName={"palette"}
    />
  );
}
