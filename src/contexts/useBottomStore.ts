import React, { createContext, useContext, useState, ReactNode } from 'react'
import { defaultBackdropOptions, defaultOptions } from '../constants/defaults'

// Types and interfaces updates
type RouteNames = string // Simplified for the example

interface BottomState {
  open: boolean
  data: any | null
  route: 'none' | RouteNames
}

interface ComponentConfig {
  component: ReactNode
  options?: object
  backdropOptions?: object
}

interface RoutesAndComponents {
  [route: string]: ComponentConfig
}

interface BottomContextType {
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

// Initial state
const initialState: BottomContextType = {
  bottomState: { open: false, data: null, route: 'none' },
  setBottom: () => {},
  bottom: {
    open: () => {},
    close: () => {},
  },
  routeComponents: {},
  setRouteComponents: () => {},
  routesArray: ['none'],
  setRoutesArray: () => {},
}

const BottomContext = createContext<BottomContextType>(initialState)

export const BottomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bottomState, setBottomState] = useState<BottomState>(initialState.bottomState)
  const [routeComponents, setRouteComponentsState] = useState<RoutesAndComponents>(initialState.routeComponents)
  const [routesArray, setRoutesArrayState] = useState<string[]>(initialState.routesArray)
  const [globalOptions, setGlobalOptionsState] = useState({})
  const [globalBackdropOptions, setGlobalBackdropOptionsState] = useState({})

  const setRouteComponents = (routesAndComponents: RoutesAndComponents) => {
    setRouteComponentsState(routesAndComponents)
  }

  const setGlobalOptions = (options: any) => setGlobalOptionsState(options)
  const setGlobalBackdropOptions = (backdropOptions: any) => setGlobalBackdropOptionsState(backdropOptions)

  const setBottom = (newState: BottomState) => setBottomState(newState)

  const openBottom = (route: 'none' | RouteNames, data: any = null) => {
    setBottomState({ open: true, data, route })
  }

  const closeBottom = () => {
    setBottomState({ open: false, data: null, route: 'none' })
  }

  const value = {
    bottomState,
    setBottom,
    bottom: { open: openBottom, close: closeBottom },
    routeComponents,
    setRouteComponents,
    routesArray,
    setRoutesArray: setRoutesArrayState,
    globalOptions,
    setGlobalOptions,
    globalBackdropOptions,
    setGlobalBackdropOptions,
  }

  return <BottomContext.Provider value={value}>{children}</BottomContext.Provider>
}

export const useBottom = () => useContext(BottomContext)
