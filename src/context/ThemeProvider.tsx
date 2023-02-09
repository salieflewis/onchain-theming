import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  memo,
} from 'react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { platformThemeRegistryAbi } from '../abi';
import { useWeb3Storage } from '../hooks';

type ThemeProviderProps = {
  children?: ReactNode;
  platformIndex?: number;
};

/**
 * Assign default values to the context provider
 */
const ThemeContext = createContext({
  themeCID: '',
  newMetadata: '',
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
}: ThemeProviderProps) {
  /**
   * Read the registry contract defined as an environment variable
   */
  const themeRegistry = process.env
    .NEXT_PUBLIC_REGISTRY_CONTRACT as `0x${string}`;
  /**
   * Assign a state variable to the theme content object
   */
  const [themeCID, setThemeCID] = useState<string>('');
  /**
   * Set state variables for the parameters derived from the theme content object
   */
  const [background, setBackground] = React.useState<string>('');
  const [text, setText] = React.useState<string>('');
  const [accent, setAccent] = React.useState<string>('');
  const [accentText, setAccentText] = React.useState<string>('');
  const [border, setBorder] = React.useState<string>('');
  /**
   * Read the desired ipfs string from the registry contract
   */
  const contractRead = useContractRead({
    address: themeRegistry,
    abi: platformThemeRegistryAbi,
    functionName: 'getPlatformTheme',
    args: [BigNumber.from(platformIndex)],
    onSuccess(data) {
      setThemeCID(data.substring('ipfs://'.length));
    },
    onError(error: any) {
      console.log(error);
    },
  });
  /**
   * Unpack the metadata stored on ipfs
   */
  const { unpackedMetadata } = useWeb3Storage(themeCID);
  /**
   * Set the state variables to the values fetched from the theme content object
   */
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
  /**
   * Set the variables in the local stylesheet to their corresponding values
   */
  document.documentElement.style.setProperty('--background', background);
  document.documentElement.style.setProperty('--text', text);
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accentText', accentText);
  document.documentElement.style.setProperty('--border', border);

  const newMetadata = JSON.stringify(
    {
      theme: { color: { background, text, accent, accentText, border } },
    },
    null,
    1
  );

  return (
    <ThemeContext.Provider
      value={{
        themeCID,
        newMetadata,
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
