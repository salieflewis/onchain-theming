import * as React from 'react';
import { NFTStorage } from 'nft.storage';
import { useThemeContext } from '../context/ThemeProvider';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
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
  const { newMetadata } = useThemeContext();

  const [uri, setUri] = React.useState<string>('');

  const { config, error } = usePrepareContractWrite(
    uri !== undefined
      ? {
          address: themeRegistry,
          abi: platformThemeRegistryAbi,
          functionName: 'setPlatformTheme',
          args: [BigNumber.from(platformIndex), uri],
        }
      : undefined
  );

  const { write: setTheme } = useContractWrite(config);

  React.useEffect(() => {
    console.log('How often am I changing?');
    setTheme?.();
  }, [uri]);

  async function handleClick() {
    try {
      /**
       * Blob constructor can create blobs from other objects
       */
      const blobThemeData = new Blob([newMetadata]);
      const cid = await client.storeBlob(blobThemeData);
      console.log('Theme data stored at:', cid);
      /**
       * Set state variable to cid
       */
      const uri = 'ipfs://' + cid;
      setUri(uri);
    } catch (err) {
      console.error(err);
    }
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
