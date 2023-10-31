import React, { ReactNode, Children, isValidElement, useEffect } from 'react';
import { useBottomStore } from '../contexts/useBottomStore';

interface SheetProps {
  name: string;
  component: () => ReactNode;
}

export const Bottom: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setRouteComponents, setRoutesArray } = useBottomStore();

  useEffect(() => {
    let updatedRouteComponents: { [name: string]: () => ReactNode } = {};
    let routeNames: ('none' | string)[] = ['none'];

    const validChildren = Children.toArray(children).filter(child => React.isValidElement(child));

    if (validChildren.length > 0) {
      validChildren.forEach((child) => {
        const sheetProps = (child.props as SheetProps);
        updatedRouteComponents[sheetProps.name] = sheetProps.component;
        routeNames.push(sheetProps.name);
      });
      setRoutesArray(routeNames);
      setRouteComponents(updatedRouteComponents);
    } else {
      // Handle the case when there are no valid children here
      // You can set some default behavior or display an error message
    }
  }, []);

  return null;
};

export const Sheet: React.FC<SheetProps> = () => {
  return null;
};

export default Bottom