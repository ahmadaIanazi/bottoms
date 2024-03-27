import React from 'react'
import Bottoms from '../contexts/config'
import { BottomProvider } from '../contexts/useBottom'
import { ModalProviderProps } from '../types'

const BottomsProvider = ({ children, config: Layout }: ModalProviderProps): React.JSX.Element => {
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
