import * as React from "react";
import { Web3Storage } from "web3.storage";
import { useThemeContext } from "../context/ThemeProvider";
import { JSONExtensionRegistry } from "../constants";
import { JSONExtensionRegistryAbi } from "../abi";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import { CustomConnect } from "./CustomConnect";
import { BigNumber } from "ethers";
import { Hex } from "../types";

function getAccessToken() {
  return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() as string });
}

export function SaveChanges({ targetAddress }: { targetAddress: Hex }) {
  const { isConnected } = useAccount();
  // @ts-ignore
  const { themeParameters } = useThemeContext();

  const [uri, setUri] = React.useState<string>("");
  const [themeReady, setThemeReady] = React.useState<boolean>(false);

  const { config, error } = usePrepareContractWrite({
    address: JSONExtensionRegistry,
    abi: JSONExtensionRegistryAbi,
    functionName: "setJSONExtension",
    args: [targetAddress, uri],
    enabled: Boolean(uri),
    onSuccess() {
      setThemeReady(true);
    },
  });

  const { write: setTheme } = useContractWrite(config);

  React.useEffect(() => {
    if (setTheme && themeReady) {
      setTheme();
    }
    setThemeReady(false);
    console.log("Theme is ready");
  }, [themeReady]);

  async function handleClick() {
    const client = makeStorageClient();
    try {
      const blobThemeData = new Blob([themeParameters]);
      // prettier-ignore
      // @ts-ignore
      const cid = await client.put([blobThemeData], { wrapWithDirectory: false });
      // rome-ignore lint: a recommendation
      const uri = "ipfs://" + cid;
      /**
       * Set state variable to cid in uri format
       */
      setUri(uri);
      console.log("Uri:", uri);
    } catch (err) {
      console.error(err);
    }
  }

  // if (!isConnected) {
  //   return (
  //     <div className='flex justify-center mt-8'>
  //       <CustomConnect />
  //     </div>
  //   );
  // }

  return (
    <div>
      <button
        disabled={!isConnected}
        className="bg-black text-white mt-8 px-4 py-2 rounded-xl w-full hover:bg-[#282828] disabled:bg-[#E1E3E7] disabled:text-[#ACB1B9]"
        onClick={handleClick}
      >
        <span className="text-lg">Save changes</span>
      </button>
    </div>
  );
}
