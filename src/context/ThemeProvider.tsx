import React, { createContext, ReactNode, useContext, memo } from 'react';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import { themeRegistryAbi } from '../abi';

const ThemeContext = createContext({
  themeData: '',
});

const THEME_REGISTRY = '0x430C7019F131cC15A0e43DAFf589f9B09a6684FB';

type ThemeDataProps = {
  children?: ReactNode;
  themeIndex?: number;
};

export const ThemeData = memo(function ThemeData({
  children,
  themeIndex,
}: ThemeDataProps) {
  const { data: themeData } = useContractRead({
    address: THEME_REGISTRY,
    abi: themeRegistryAbi,
    functionName: 'viewThemeURI',
    args: [BigNumber.from(themeIndex)],
    onSuccess(themeData) {
      console.log(themeData);
    },
    onError(error: any) {
      console.log(error);
    },
  });

  const safeThemeData = themeData as string;

  return (
    <ThemeContext.Provider value={{ themeData: safeThemeData }}>
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
