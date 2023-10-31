import React, { ReactNode } from 'react';
import Bottoms from '../contexts/config';

interface ModalProviderProps {
  children: ReactNode;
  config?: React.ComponentType; // Add a layout prop
}

const BottomsProvider = ({ children, config: Layout }: ModalProviderProps): React.JSX.Element => {
  return (
    <>
      {children}
      {Layout && <Layout />}
      <Bottoms />
    </>
  );
}

export default BottomsProvider
export { BottomsProvider }