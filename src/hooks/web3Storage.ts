import { useState, useEffect } from "react";
import { Web3Storage } from "web3.storage";
import { ThemingConfig } from "../types";

function getAccessToken() {
  return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() as string });
}

const client = makeStorageClient();

export function useRetrieve(cid: string) {
  const [unpackedMetadata, setUnpackedMetadata] = useState<string>("");

  useEffect(() => {
    async function retrieve() {
      if (cid) {
        const res = await client.get(cid);
        console.log(`Got a response! [${res?.status}] ${res?.statusText}`);
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
  }, [cid]);

  return unpackedMetadata;
}

export function useStore(themeParameters: ThemingConfig) {
  const [uri, setUri] = useState<string>("");

  async function storeBlob() {
    try {
      // @ts-ignore
      const blobThemeData = new Blob([themeParameters]);
      // @ts-ignore
      const cid = await client.put([blobThemeData], {
        wrapWithDirectory: false,
      });
      const uri = `ipfs://${cid}`;
      /**
       * Set state variable to cid in uri format
       */
      setUri(uri);
      console.log("Uri:", uri);
    } catch (err) {
      console.error(err);
    }
  }

  return { storeBlob, uri };
}
