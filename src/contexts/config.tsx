import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useBottomStore } from './useBottomStore';
import Layout, { Types as TypesFromLayout } from '../(bottom)';

type Types = (typeof TypesFromLayout)[number];

const snapPoints: string[] = ['80%'];

export default function BottomSheetConfig() {

  const { routeComponents, defaultState, bottomState, setBottom } = useBottomStore();

  const bottomSheetRef = useRef<BottomSheet | null>(null);

  useEffect(() => {
    if (bottomState?.open && bottomSheetRef?.current) {
      bottomSheetRef?.current?.expand();
    }
  }, [bottomState]);


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

  // const Component = routeComponents['One'];

  const renderContent = (route: 'none' | Types ) => {
    const Component = routeComponents[route]

    let renderedComponent;

    if (typeof Component === 'function') {
      renderedComponent = <Component />; // Render the JSX component
    } else {
      renderedComponent = Component;
    }

    return (
      <>
        <Layout />
        {renderedComponent || <></>}
      </>
    );
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
