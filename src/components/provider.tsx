import React, { ReactNode } from 'react';
import Bottoms from '../contexts/config';

interface ModalProviderProps {
  children: ReactNode;
}

const BottomsProvider = ({ children }: ModalProviderProps): React.JSX.Element => {
  return (
    <>
      {children}
      <Bottoms />
    </>
  );
}

export default BottomsProvider
export { BottomsProvider }