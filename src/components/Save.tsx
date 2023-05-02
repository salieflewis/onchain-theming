import * as React from "react";
import { Web3Storage } from "web3.storage";
import { useThemeContext } from "../context/ThemeProvider";
import { JSONExtensionRegistry } from "../constants";
import { JSONExtensionRegistryAbi } from "../abi";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import { Hex } from "../types";
import { useStore } from "../hooks";
import { useModal } from "connectkit";

export function Save() {
  const { isConnected, address } = useAccount();

  const { setOpen } = useModal();

  const { themingConfig } = useThemeContext();

  const { storeBlob, uri } = useStore(themingConfig);

  const [themeReady, setThemeReady] = React.useState<boolean>(false);

  const { config, error } = usePrepareContractWrite({
    address: JSONExtensionRegistry,
    abi: JSONExtensionRegistryAbi,
    functionName: "setJSONExtension",
    args: [address as Hex, uri],
    onSuccess() {
      setThemeReady(true);
    },
  });

  const { write: setTheme } = useContractWrite(config);

  // React.useEffect(() => {
  //   if (setTheme && themeReady) {
  //     setTheme();
  //   }
  //   setThemeReady(false);
  //   console.log("Theme is ready");
  // }, [themeReady]);

  function handleClick() {
    if (!isConnected) {
      setOpen(true);
    } else storeBlob();
  }

  return (
    <div>
      <button
        className="bg-black text-white mt-8 px-4 py-2 rounded-xl w-full hover:bg-[#282828] disabled:bg-[#E1E3E7] disabled:text-[#ACB1B9]"
        onClick={handleClick}
      >
        <span className="text-lg">Save</span>
      </button>
    </div>
  );
}
