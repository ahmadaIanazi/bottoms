import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef } from 'react';
import { useBottomStore } from './useBottomStore';

const snapPoints: string[] = ['80%'];

export default function BottomSheetConfig() {

  const { routeComponents, defaultState, bottomState, setBottom } = useBottomStore();

  const bottomSheetRef = useRef<BottomSheet | null>(null);

  useEffect(() => {
    if (bottomState?.open && bottomSheetRef?.current) {
      bottomSheetRef?.current?.expand();
    }
  }, [bottomState]);

  type RouteNames = keyof typeof routeComponents;
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setBottom(defaultState);
    }
  }, []);

  const closeModal = () => {
    bottomSheetRef?.current?.close();
    setBottom(defaultState);
  };

  const onClose = () => {
    bottomSheetRef?.current?.close();
    setBottom(defaultState);
  };

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        opacity={1.9}
        disappearsOnIndex={-1}
        // pressBehavior='none'
        onPress={closeModal}
        appearsOnIndex={1}
      />
    ),
    []
  );

  /* ===== Another Method to remove the need for Provider config={Layout}.
  let UserLayout;
  Method to dynamically let the user choose the Layout.
  Issue with this method is that is very opinionated and user must have /app/(bottom)/index 
  We will try to find a different method that works better.
  
  try {
      UserLayout = require('../../../../app/(bottoms)/index').default;
    
    } catch (error) {
        console.error('User-defined Layout component not found. Make sure to use <Bottom><Sheet /></Bottom> in directory: app/bottoms/index.tsx.');
    }
      
      
  return 
  <>
    {UserLayout ? <UserLayout /> : null}
    {renderedComponent || null}
  </>
      
  */

  const renderContent = (route: 'none' | RouteNames  ) => {
    const Component = routeComponents[route]

    let renderedComponent;

    if (typeof Component === 'function') {
      renderedComponent = <Component />; // Render the JSX component
    } else {
      renderedComponent = Component;
    }

    return renderedComponent || null
  };


  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      // onClose={() => onClose()} // !! DONT USE THIS IT KEEPS TRIGGERING.
      overDragResistanceFactor={10}
      enableOverDrag={false}
      handleStyle={{
        height: 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // backgroundColor: modalHeaderColor,
      }}
      onChange={handleSheetChanges}
      backdropComponent={bottomState?.open ? renderBackdrop : null}
      enablePanDownToClose={true}
      backgroundStyle={{
        // backgroundColor: modalHeaderColor,
        borderRadius: 20,
      }}
    >
      {renderContent(bottomState.route)}
    </BottomSheet>
  );
}
