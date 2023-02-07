import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  memo,
} from 'react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { themeRegistryAbi } from '../abi';
import { useWeb3Storage } from '../hooks';

const ThemeContext = createContext({
  themeData: '',
});

const THEME_REGISTRY = '0x430C7019F131cC15A0e43DAFf589f9B09a6684FB';

type ThemeDataProps = {
  children?: ReactNode;
  themeIndex?: number;
};

export const ThemeProvider = memo(function ThemeProvider({
  children,
  themeIndex,
}: ThemeDataProps) {
  const [themeData, setThemeData] = useState<string>('');

  /**
   * Parameters derived from IPFS stored theme object
   */
  const [background, setBackground] = React.useState<string | null>(null);
  const [text, setText] = React.useState<string | null>(null);

  const contractRead = useContractRead({
    address: THEME_REGISTRY,
    abi: themeRegistryAbi,
    functionName: 'viewThemeURI',
    args: [BigNumber.from(themeIndex)],
    onSuccess(data) {
      setThemeData(data.substring('ipfs://'.length));
    },
    onError(error: any) {
      console.log(error);
    },
  });

  const { unpackedMetadata } = useWeb3Storage(themeData);

  React.useEffect(() => {
    if (unpackedMetadata) {
      const parsedMetadata = JSON.parse(unpackedMetadata);
      setBackground(parsedMetadata.theme.color.background);
      setText(parsedMetadata.theme.color.text);
    }
  }, [unpackedMetadata]);

  document.documentElement.style.setProperty('--background', background);
  document.documentElement.style.setProperty('--text', text);

  //   const safeThemeData = themeData as string;
  //   const safeThemeData = (themeData as string).substring('ipfs://'.length);

  return (
    <ThemeContext.Provider value={{ themeData }}>
      {children}
    </ThemeContext.Provider>
  );
});

// Access the context value of the ThemeProvider
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error('useThemeContext hook must be used within a ThemeProvider');
  }
  return context;
};
