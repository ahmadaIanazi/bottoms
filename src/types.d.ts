import React, { ReactNode } from 'react';

// # useBottomsStore

declare module 'bottoms' {
  export type RouteNames = keyof typeof routesComponentsObject;

  export interface BottomState {
    open: boolean;
    data: any | null;
    route: 'none' | RouteNames;
  }

  export interface RouteState {
    name: string;
    component: React.ReactNode;
  }

  export interface RoutesAndComponents {
    [route: string]: React.ReactNode;
  }

  export interface BottomRouteUpdate {
    bottomState: BottomState;
    setBottom: (res: BottomState) => void;
    bottom: {
      open: (route: 'none' | RouteNames, data?: any | null) => void;
      close: () => void;
    };
    defaultState: BottomState;
    routeComponents: RoutesAndComponents;
    routesArray: string[];
    setRouteComponents: (res: any) => void;
    setRoutesArray: (res: any) => void;
  }

  export const useBottomStore: (
    set: (fn: (state: BottomRouteUpdate) => BottomRouteUpdate) => void,
    get: () => BottomRouteUpdate
  ) => BottomRouteUpdate;

  export const bottom: {
    open: (route: 'none' | RouteNames, data?: any | null) => void;
    close: () => void;
  };

  export const routesComponentsObject: RoutesAndComponents;
}

// # config

// types/types.d.ts

declare module '@gorhom/bottom-sheet' {

  interface BottomSheetConfigProps {
    snapPoints: string[];
    index: number;
    overDragResistanceFactor: number;
    enableOverDrag: boolean;
    handleStyle: {
      height: number;
      borderTopRightRadius: number;
      borderTopLeftRadius: number;
      // backgroundColor: string;
    };
    onChange: (index: number) => void;
    backdropComponent: React.ReactNode | null;
    enablePanDownToClose: boolean;
    backgroundStyle: {
      // backgroundColor: string;
      borderRadius: number;
    };
  }

  export default function BottomSheetConfig(props: BottomSheetConfigProps): React.JSX.Element;

  interface BottomSheetBackdropProps {
    enableTouchThrough: boolean;
    opacity: number;
    disappearsOnIndex: number;
    appearsOnIndex: number;
    onPress: () => void;
  }

  export function BottomSheetBackdrop(props: BottomSheetBackdropProps): React.JSX.Element;

  interface BottomSheetScrollViewProps {
    // Define your props types here
  }

  export function BottomSheetScrollView(props: BottomSheetScrollViewProps): React.JSX.Element;
}


// # react component

interface SheetProps {
  name: string;
  component: () => ReactNode;
}

export declare const Bottom: React.FC<{ children: ReactNode }>;

export declare const Sheet: React.FC<SheetProps>;

// # Provider

interface ModalProviderProps {
  children: ReactNode;
}

export declare const BottomsProvider: React.FC<ModalProviderProps>;