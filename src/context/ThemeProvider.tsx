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

type ThemeDataProps = {
  children?: ReactNode;
  platformIndex?: number;
};
/**
 * Assign default values to the context provider
 */
const ThemeContext = createContext({
  themeData: '',
  background: '',
  setBackground: (background: string) => {},
  text: '',
  setText: (text: string) => {},
  accent: '',
  setAccent: (accent: string) => {},
  accentText: '',
  setAccentText: (accentText: string) => {},
  border: '',
  setBorder: (border: string) => {},
});

export const ThemeProvider = memo(function ThemeProvider({
  children,
  platformIndex,
}: ThemeDataProps) {
  /**
   * Read the registry contract defined as an environment variable
   */
  const themeRegistry = process.env
    .NEXT_PUBLIC_REGISTRY_CONTRACT as `0x${string}`;
  /**
   * Assign a state variable to the theme data object
   */
  const [themeData, setThemeData] = useState<string>('');
  /**
   * Parameters derived from IPFS stored theme object
   */
  const [background, setBackground] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');
  const [accent, setAccent] = React.useState<string>('');
  const [accentText, setAccentText] = React.useState<string>('');
  const [border, setBorder] = React.useState<string>('');

  const contractRead = useContractRead({
    address: themeRegistry,
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
    <ThemeContext.Provider
      value={{
        themeData,
        background,
        setBackground,
        text,
        setText,
        accent,
        setAccent,
        accentText,
        setAccentText,
        border,
        setBorder,
      }}
    >
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
