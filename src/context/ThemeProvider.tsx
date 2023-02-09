import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  memo,
} from 'react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { stringStorageRegistryAbi } from '../abi';
import { useWeb3Storage } from '../hooks';

const ThemeContext = createContext({
  themeData: '',
  text: '',
});

const THEME_REGISTRY = '0xD86dA3d1406Eff4F7147B0035F778CB5258CeBf8';

type ThemeDataProps = {
  children?: ReactNode;
  platformIndex?: number;
};

export const ThemeProvider = memo(function ThemeProvider({
  children,
  platformIndex,
}: ThemeDataProps) {
  /**
   * State variable for theme data object
   */
  const [themeData, setThemeData] = useState<string>('');
  /**
   * Parameters derived from IPFS stored theme object
   */
  const [background, setBackground] = React.useState<string | null>(null);
  const [text, setText] = React.useState<string>('');
  const [accent, setAccent] = React.useState<string | null>(null);
  const [accentText, setAccentText] = React.useState<string | null>(null);
  const [border, setBorder] = React.useState<string | null>(null);

  const contractRead = useContractRead({
    address: THEME_REGISTRY,
    abi: stringStorageRegistryAbi,
    functionName: 'getString',
    args: [BigNumber.from(platformIndex)],
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
      setAccent(parsedMetadata.theme.color.accent);
      setAccentText(parsedMetadata.theme.color.accentText);
      setBorder(parsedMetadata.theme.color.border);
    }
  }, [unpackedMetadata]);

  document.documentElement.style.setProperty('--background', background);
  document.documentElement.style.setProperty('--text', text);
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accentText', accentText);
  document.documentElement.style.setProperty('--border', border);

  //   const safeThemeData = themeData as string;
  //   const safeThemeData = (themeData as string).substring('ipfs://'.length);

  return (
    <ThemeContext.Provider value={{ themeData, text }}>
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
