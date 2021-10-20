import React from 'react'
import { AuthProvider } from './providers/AuthProvider'
import MainNavigation from './navigation/MainNavigation'

const App: React.FC = (): JSX.Element => {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  )
}

export default App
