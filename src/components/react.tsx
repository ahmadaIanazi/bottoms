import React, { ReactNode, Children, isValidElement, useEffect } from 'react'
import { useBottom } from '../contexts/useBottom'
import { BottomProps, SheetProps } from '../types'
import { defaultBackdropOptions, defaultOptions } from '../constants/defaults'

export const Bottom: React.FC<{
  children: ReactNode
  options?: BottomProps['options']
  backdropOptions?: BottomProps['backdropOptions']
}> = ({ children, options, backdropOptions }) => {
  const { setRouteComponents, setRoutesArray, setGlobalOptions, setGlobalBackdropOptions } = useBottom()

  useEffect(() => {
    // Merge options with defaults and set them globally
    if (options) {
      const mergedOptions = { ...defaultOptions, ...options }
      setGlobalOptions(mergedOptions)
    }
    if (backdropOptions) {
      const mergedBackdropOptions = { ...defaultBackdropOptions, ...backdropOptions }
      setGlobalBackdropOptions(mergedBackdropOptions)
    }
  }, [options, backdropOptions])

  useEffect(() => {
    let updatedRouteComponents = {}
    let routeNames: ('none' | string)[] = ['none']

    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.props.name) {
        const { name, component, options, backdropOptions } = child.props
        updatedRouteComponents[name] = { component, options, backdropOptions }
        routeNames.push(name)
      }
    })

    setRoutesArray(routeNames)
    setRouteComponents(updatedRouteComponents)
  }, [children]) // Dependency on children to re-calculate when they change

  return null // This component doesn't render anything itself
}

export const Sheet: React.FC<SheetProps> = ({ name, component, options, backdropOptions }) => {
  // Sheet component is primarily used for its props in the context of Bottom component
  // It doesn't render anything by itself
  return null
}

export default Bottom
