export const defaultOptions = {
  snapPoints: ['80%'],
  index: -1,
  overDragResistanceFactor: 10,
  enableOverDrag: false,
  handleStyle: {
    height: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white', // default color
  },
  onChange: () => {},
  backdropComponent: null,
  enablePanDownToClose: true,
  backgroundStyle: {
    borderRadius: 20,
  },
  // Add any other default properties here
}

export const defaultBackdropOptions = {
  // animatedPosition: true,
  // animatedIndex: true,
  enableTouchThrough: false,
  opacity: 0.5,
  disappearsOnIndex: -1,
  appearsOnIndex: 1,
  onPress: () => {},
}
