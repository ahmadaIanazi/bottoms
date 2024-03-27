import React from 'react'

export type RouteNames = string 

export interface BottomState {
  open: boolean
  data: any | null
  route: 'none' | RouteNames
}

export interface RouteState {
  name: string
  component: React.ReactNode
}

export interface RoutesAndComponents {
  [route: string]: React.ReactNode
}

export interface BottomRouteUpdate {
  bottomState: BottomState
  setBottom: (res: BottomState) => void
  bottom: {
    open: (route: 'none' | RouteNames, data?: any | null) => void
    close: () => void
  }
  defaultState: BottomState
  routeComponents: RoutesAndComponents
  routesArray: string[]
  setRouteComponents: (res: any) => void
  setRoutesArray: (res: any) => void
}

export interface BottomSheetConfigProps {
  snapPoints: string[]
  index: number
  overDragResistanceFactor: number
  enableOverDrag: boolean
  handleStyle: {
    height: number
    borderTopRightRadius: number
    borderTopLeftRadius: number
  }
  onChange: (index: number) => void
  backdropComponent: React.ReactNode | null
  enablePanDownToClose: boolean
  backgroundStyle: {
    borderRadius: number
  }
}

export interface BottomSheetBackdropProps {
  enableTouchThrough: boolean
  opacity: number
  disappearsOnIndex: number
  appearsOnIndex: number
  onPress: () => void
}

export interface Options {
  snapPoints?: string[]
  index?: number
  overDragResistanceFactor?: number
  enableOverDrag?: boolean
  handleStyle?: {
    height?: number
    borderTopRightRadius?: number
    borderTopLeftRadius?: number
    backgroundColor?: string
  }
  onChange?: (index: number) => void
  backdropComponent?: React.ReactNode | null
  enablePanDownToClose?: boolean
  backgroundStyle?: {
    borderRadius?: number
  }
}

export interface BackdropOptions {
  enableTouchThrough?: boolean
  opacity?: number
  disappearsOnIndex?: number
  appearsOnIndex?: number
  onPress?: () => void
}

export interface BottomProps {
  children: React.ComponentType<any>
  options?: Options
  backdropOptions?: BackdropOptions
}

export interface SheetProps {
  name: string
  component: React.ComponentType<any>
  options?: Options
  backdropOptions?: BackdropOptions
}

export interface ModalProviderProps {
  children: React.ReactNode
  config?: React.ComponentType
}

export interface BottomState {
  open: boolean
  data: any | null
  route: 'none' | RouteNames
}

export interface ComponentConfig {
  component: React.ReactNode
  options?: object
  backdropOptions?: object
}

export interface BottomContextType {
  bottomState: BottomState
  setBottom: (res: BottomState) => void
  bottom: {
    open: (route: 'none' | RouteNames, data?: any) => void
    close: () => void
  }
  routeComponents: RoutesAndComponents
  setRouteComponents: (routesAndComponents: RoutesAndComponents) => void
  routesArray: string[]
  setRoutesArray: (res: string[]) => void
}
