import { Web3Storage } from 'web3.storage';
import * as React from 'react';

export function useWeb3Storage(cid?: string) {
  const [unpackedMetadata, setUnpackedMetadata] = React.useState<
    string | undefined
  >();

  function getAccessToken() {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() as string });
  }

  async function retrieve() {
    const client = makeStorageClient();
    if (cid) {
      const res = await client.get(cid);
      // console.log(`Got a response! [${res?.status}] ${res?.statusText}`);
      if (!res?.ok) {
        throw new Error(`failed to get ${cid}`);
      }
      const files = await res.files();
      for (const file of files) {
        setUnpackedMetadata(await file.text());
      }
    }
  }
  retrieve();

  return { unpackedMetadata };
}
