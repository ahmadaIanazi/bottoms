import React, { ReactNode, createContext, useContext, useState } from 'react'
import { BottomState, BottomContextType, RoutesAndComponents, RouteNames } from '../types.js'

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

let bottomControl = {
  open: (route, data = null) => {},
  close: () => {},
}

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

  bottomControl.open = openBottom
  bottomControl.close = closeBottom

  return <BottomContext.Provider value={value}>{children}</BottomContext.Provider>
}

export const useBottom = () => useContext(BottomContext)

export const bottom = {
  open: (route, data = null) => bottomControl.open(route, data),
  close: () => bottomControl.close(),
}
