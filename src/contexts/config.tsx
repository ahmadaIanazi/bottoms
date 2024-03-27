import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef } from 'react'
import { useBottom } from './useBottom'
import { defaultBackdropOptions, defaultOptions } from '../constants/defaults'

export default function BottomSheetConfig() {
  const {
    routeComponents,
    bottomState,
    setBottom,
    bottom: { close },
    globalOptions,
    globalBackdropOptions,
  } = useBottom()

  const bottomSheetRef = useRef<BottomSheet | null>(null)

  useEffect(() => {
    if (bottomState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand()
    } else if (!bottomState.open && bottomSheetRef.current) {
      bottomSheetRef.current.close()
    }
  }, [bottomState.open])

  // Get specific options for the current route
  const specificBackdropOptions = routeComponents[bottomState.route]?.backdropOptions || {}
  const specificOptions = routeComponents[bottomState.route]?.options || {}

  // Final merge: default options < global options < specific sheet options
  const finalBackdropOptions = {
    ...defaultBackdropOptions,
    ...globalBackdropOptions,
    ...specificBackdropOptions,
  }

  const finalOptions = {
    ...defaultOptions,
    ...globalOptions,
    ...specificOptions,
  }

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        close() // Uses the context's close method
      }
    },
    [close]
  )

  const renderContent = useCallback(() => {
    const routeComponent = routeComponents[bottomState.route]
    if (routeComponent && routeComponent.component) {
      const Component = routeComponent.component
      // Now you can render Component directly, and pass options as props if needed
      return <Component {...(routeComponent.options || {})} />
    }
    return null // No valid component to render for the route
  }, [bottomState.route, routeComponents])

  const handleCloseEnd = useCallback(() => {
    if (bottomState.open) {
      setBottom({ ...bottomState, open: false, route: 'none' })
    }
  }, [bottomState, setBottom])

  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} {...finalBackdropOptions} onPress={handleCloseEnd} />, [])



  return (
    <BottomSheet
      ref={bottomSheetRef}
      {...finalOptions}
      onChange={handleSheetChanges}
      backdropComponent={bottomState.open ? renderBackdrop : undefined}
      enablePanDownToClose={true}
      onClose={handleCloseEnd}
    >
      {renderContent()}
    </BottomSheet>
  )
}
