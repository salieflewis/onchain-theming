import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useContractRead } from "wagmi";
import { JSONExtensionRegistry } from "../constants";
import { JSONExtensionRegistryAbi } from "../abi";
import { useRetrieve } from "../hooks";
import { Hex, ThemingConfig } from "../types";

/**
 * Assign default values to the context provider
 */
// const ThemeContext = createContext({
//   themeCID: "",
//   newMetadata: "",
//   background: "",
//   setBackground: (background: string) => {},
//   text: "",
//   setText: (text: string) => {},
//   accent: "",
//   setAccent: (accent: string) => {},
//   accentText: "",
//   setAccentText: (accentText: string) => {},
//   border: "",
//   setBorder: (border: string) => {},
//   fontFamily: "",
//   setFontFamily: (fontFamily: string) => {},
// });

const ThemeContext = createContext({});

export function ThemeProvider({
  children,
  targetAddress,
}: {
  children: ReactNode;
  targetAddress: Hex;
}) {
  const [themeCid, setThemeCid] = useState<string>("");

  const [themingConfig, setThemingConfig] = useState<ThemingConfig>({
    theme: {
      color: {
        background: "",
        text: "",
        accent: "",
        accentText: "",
        border: "",
      },
      font: {
        heading: {
          fontFamily: "",
          fontSize: "",
          lineHeight: "",
        },
        body: {
          fontFamily: "",
          fontSize: "",
          lineHeight: "",
        },
        caption: {
          fontFamily: "",
          fontSize: "",
          lineHeight: "",
        },
      },
    },
  });

  /**
   * Read the desired ipfs string from the registry contract
   */
  useContractRead({
    address: JSONExtensionRegistry,
    abi: JSONExtensionRegistryAbi,
    functionName: "getJSONExtension",
    args: [targetAddress],
    onSuccess(data: string) {
      setThemeCid(data.substring("ipfs://".length));
    },
    onError(error: Error) {
      console.log(error);
    },
  });
  /**
   * Unpack the metadata stored on ipfs
   */
  const unpackedMetadata = useRetrieve(themeCid);
  /**
   * Set the `themeParamters` to the JSON fetched from the theme content object
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

  // const newMetadata = JSON.stringify(
  //   {
  //     theme: {
  //       color: { background, text, accent, accentText, border },
  //       font: { heading: { fontFamily } },
  //     },
  //   },
  //   null,
  //   3
  // );

  // prettier-ignore
  // const fontUrl = 'https://dweb.link/ipfs/bafybeih3dpotmeewpv543kzbwhxykm6pqtcw46i6lymcjhvblg6sv455se/' + fontFamily + '.ttf';
  // const rule = `@font-face {
  // font-family: '${fontFamily}';
  // src: url('${fontUrl}') format('woff2');
  // }`;

  // const style = document.createElement("style");
  // style.appendChild(document.createTextNode(rule));
  // document.head.appendChild(style);

  return (
    <ThemeContext.Provider
      value={{themingConfig, setThemingConfig}}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Access the context value of the ThemeProvider
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw Error("useThemeContext hook must be used within a ThemeProvider");
  }
  return context;
};
