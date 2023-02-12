import * as React from 'react';
import { NFTStorage } from 'nft.storage';
import { useThemeContext } from '../context/ThemeProvider';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { platformThemeRegistryAbi } from '../abi';
import { BigNumber } from 'ethers';

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY as string,
});
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
    try {
      const blobThemeData = new Blob([newMetadata]);
      const cid = await client.storeBlob(blobThemeData);
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

  if (!isConnected) {
    return (
      <div className='flex justify-center mt-4'>
        <ConnectKitButton />
      </div>
    );
  }

  return (
    <div>
      <button
        className='theming-test__button mt-4 px-4 py-2 rounded-xl w-full'
        onClick={handleClick}
      >
        <span className='text-xl'>Save Changes</span>
      </button>
    </div>
  );
}
