import { Web3Storage } from 'web3.storage';
import * as React from 'react';

export function Storage() {
  const [unpackedJSON, setUnpackedJSON] = React.useState<string>();

  function getAccessToken() {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() as string });
  }

  async function retrieve(cid: string) {
    const client = makeStorageClient();
    const res = await client.get(cid);
    console.log(`Got a response! [${res?.status}] ${res?.statusText}`);
    if (!res?.ok) {
      throw new Error(`failed to get ${cid}`);
    }
    const files = await res.files();
    for (const file of files) {
      console.log(`${file.cid} -- ${file.size}`);
      setUnpackedJSON(await file.text());
    }
  }

  retrieve('bafybeicdumhupgrxwjp2a5ln6t7qhqhfgwbuy7mrikxoyaves2dztao5j4');

  return (
    <div>
      <code>
        {/* <pre>{JSON.stringify(unpackedJSON, null, 2)}</pre> */}
        {JSON.stringify(unpackedJSON, null, 2)}
      </code>
    </div>
  );
}
