import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { themeRegistryAbi } from '../abi';

export function Theme() {
    
  const themeIndex = BigNumber.from('3');

  const { data : themeURI } = useContractRead({
    address: '0x430C7019F131cC15A0e43DAFf589f9B09a6684FB',
    abi: themeRegistryAbi,
    functionName: 'viewThemeURI',
    args: [themeIndex],
  });
  console.log('Theme URI:', themeURI);

  // To be used by Navigation Test?
  const cid = themeURI.split('ipfs://')[1].split('/')[0];
  console.log('CID:', cid);

  return (
    <div>
      {/* <code>
        <pre>{JSON.stringify(themingData, null, 2)}</pre>
      </code> */}
    </div>
  );
}
