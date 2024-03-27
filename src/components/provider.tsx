import React, { ReactNode } from 'react'
import Bottoms from '../contexts/config'
import { BottomProvider } from '../contexts/useBottom.tsx'

interface ModalProviderProps {
  children: ReactNode
  config?: React.ComponentType // Add a layout prop
}

const BottomsProvider = ({
  children,
  config: Layout,
}: ModalProviderProps): React.JSX.Element => {
  return (
    <>
      <BottomProvider>
        {children}
        {Layout && <Layout />}
        <Bottoms />
      </BottomProvider>
    </>
  )
}

export default BottomsProvider
export { BottomsProvider }
