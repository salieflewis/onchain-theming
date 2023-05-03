import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useContractRead } from 'wagmi';
import { JSONExtensionRegistry } from '../constants';
import { JSONExtensionRegistryAbi } from '../abi';
import { useRetrieve } from '../hooks';
import { Hex, ThemingConfig } from '../types';

export type ThemeProviderReturnTypes = {
  themeCid: string;
  themingConfig: ThemingConfig;
  setThemingConfig: Dispatch<SetStateAction<ThemingConfig>>;
};

const ThemeContext = createContext<ThemeProviderReturnTypes | null>(null);

export function ThemeProvider({
  children,
  targetAddress,
}: {
  children: ReactNode;
  targetAddress: Hex;
}) {
  const [themeCid, setThemeCid] = useState<string>('');

  const [themingConfig, setThemingConfig] = useState<ThemingConfig>({
    theme: {
      color: {
        background: '',
        text: '',
        accent: '',
        accentText: '',
        border: '',
      },
      font: {
        heading: {
          fontFamily: '',
          fontSize: '',
          lineHeight: '',
        },
        body: {
          fontFamily: '',
          fontSize: '',
          lineHeight: '',
        },
        caption: {
          fontFamily: '',
          fontSize: '',
          lineHeight: '',
        },
      },
    },
  });

  /**
   * Fetch the target JSON extension from the registry contract
   */
  useContractRead({
    address: JSONExtensionRegistry,
    abi: JSONExtensionRegistryAbi,
    functionName: 'getJSONExtension',
    args: [targetAddress],
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    onSuccess(data: string) {
      setThemeCid(data.substring('ipfs://'.length));
    },
    onError(error: Error) {
      console.log(error);
    },
  });
  /**
   * Unpack the metadata stored on IPFS
   */
  const unpackedMetadata = useRetrieve(themeCid);
  /**
   * Set the `themeParameters` to the retrieved JSON
   */
  useEffect(() => {
    if (unpackedMetadata) {
      setThemingConfig(JSON.parse(unpackedMetadata));
    }
  }, [unpackedMetadata]);

  /**
   * Set the variables in the local stylesheet to their corresponding values
   */
  useEffect(() => {
    const setCSSVariables = (themingConfig: ThemingConfig) => {
      if (themingConfig.theme) {
        const { color, font } = themingConfig.theme;

        // Set color properties
        if (color) {
          for (const [key, value] of Object.entries(color)) {
            document.documentElement.style.setProperty(
              `--${key}`,
              value as string
            );
          }
        }

        // Set font properties
        // if (font) {
        //   for (const [fontType, fontProperties] of Object.entries(font)) {
        //     for (const [key, value] of Object.entries(fontProperties)) {
        //       const cssVarName = `${fontType}-${key}`;
        //       document.documentElement.style.setProperty(
        //         `--${cssVarName}`,
        //         value
        //       );
        //     }
        //   }
        // }
      }
    };

    setCSSVariables(themingConfig);
  }, [themingConfig]);

  return (
    <ThemeContext.Provider
      value={{ themeCid, themingConfig, setThemingConfig }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Access the context value of the ThemeProvider
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error('useThemeContext hook must be used within a ThemeProvider');
  }
  return context;
};
