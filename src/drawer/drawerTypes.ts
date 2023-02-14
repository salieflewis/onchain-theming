import { Dispatch, SetStateAction, ReactNode } from 'react';

export type DrawerProviderProps = {
  children?: ReactNode;
};

export type DrawerType = string | undefined;

export type DrawerState = {
  drawerType?: DrawerType;
  drawerOptions?: Record<any, any>;
};

export type DrawerContextType = [
  DrawerState,
  Dispatch<SetStateAction<DrawerState>>
];

export interface DrawerCompositionProps {
  /** Unique identifier / key for the drawer */
  drawerName: string;
  /** Content housed inside of drawer */
  content: JSX.Element;
  /** Contents that will be wrapped by an unstyled button element to open the drawer */
  trigger?: JSX.Element;
  closeTrigger?: JSX.Element;
  /** pixel dimension of drawer window (max width) */
  drawerWidth?: string;
  bgColor?: string;
}
