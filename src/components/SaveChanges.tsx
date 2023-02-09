import { NFTStorage } from 'nft.storage';
import { useThemeContext } from '../context/ThemeProvider';

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY as string,
});

export function SaveChanges() {
  const { newMetadata } = useThemeContext();
  console.log('Theme data before blob:', newMetadata);
  async function handleClick() {
    try {
      /**
       * Blob constructor can create blobs from other objects
       */
      const blobThemeData = new Blob([newMetadata]);
      const cid = await client.storeBlob(blobThemeData);
      console.log('Theme data stored at:', cid);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button
        className='theming-test__button mt-4 px-4 py-2 rounded-xl w-full'
        onClick={() => handleClick()}
      >
        <span className='text-xl'>Save Changes</span>
      </button>
    </div>
  );
}
