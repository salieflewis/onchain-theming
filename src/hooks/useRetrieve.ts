import { useState, useEffect } from 'react';
// import { NFTStorage } from 'nft.storage';

// export function useRetrieve(cid: string) {
//   const [unpackedMetadata, setUnpackedMetadata] = useState<string>('');

//   function getAccessToken() {
//     return process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
//   }

//   function makeStorageClient() {
//     // @ts-ignore
//     return new NFTStorage({ token: getAccessToken() });
//   }

//   useEffect(() => {
//     async function retrieve() {
//       const client = makeStorageClient();
//       if (cid) {
//         const res = await client.get(cid);
//         console.log(`Got a response! [${res?.status}] ${res?.statusText}`);
//         if (!res?.ok) {
//           throw new Error(`failed to get ${cid}`);
//         }
//         const files = await res.files();
//         for (const file of files) {
//           setUnpackedMetadata(await file.text());
//         }
//       }
//     }
//     retrieve();
//   }, [cid]);

//   return { unpackedMetadata };
// }
