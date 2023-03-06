import * as React from 'react';
import { Web3Storage } from 'web3.storage';
import { useThemeContext } from '../context/ThemeProvider';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
import { CustomConnect } from './CustomConnect';
import { platformThemeRegistryAbi } from '../abi';
import { BigNumber } from 'ethers';

function getAccessToken() {
  return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() as string });
}
/**
 * Read the registry contract defined as an environment variable
 */
const themeRegistry = process.env
  .NEXT_PUBLIC_REGISTRY_CONTRACT as `0x${string}`;
/**
 * Grab the platform index defined as an environment variable
 */
// @ts-ignore
const platformIndex = process.env.NEXT_PUBLIC_PLATFORM_INDEX as number;

export function SaveChanges() {
  const { isConnected } = useAccount();
  const { newMetadata } = useThemeContext();

  const [uri, setUri] = React.useState<string>('');
  const [themeReady, setThemeReady] = React.useState<boolean>(false);

  const { config, error } = usePrepareContractWrite({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: 'setPlatformTheme',
    args: [BigNumber.from(platformIndex), uri],
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
    console.log('Theme is ready');
  }, [themeReady]);

  async function handleClick() {
    const client = makeStorageClient();
    try {
      const blobThemeData = new Blob([newMetadata]);
      // prettier-ignore
      // @ts-ignore
      const cid = await client.put([blobThemeData], { wrapWithDirectory: false });
      const uri = 'ipfs://' + cid;
      /**
       * Set state variable to cid in uri format
       */
      setUri(uri);
      console.log('Uri:', uri);
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
        className='bg-black text-white mt-8 px-4 py-2 rounded-xl w-full hover:bg-[#282828] disabled:bg-[#E1E3E7] disabled:text-[#ACB1B9]'
        onClick={handleClick}
      >
        <span className='text-lg'>Save changes</span>
      </button>
    </div>
  );
}
