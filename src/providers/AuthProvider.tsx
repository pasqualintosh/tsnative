import React from 'react'

interface AuthProviderState {}

interface AuthProviderProps {}

const AuthContext = React.createContext<AuthProviderState | undefined>(
  undefined,
)

interface User {
  username?: string
  token?: string
  expires_at?: Date
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}): JSX.Element => {
  const [user, setUser] = React.useState<User | undefined>(undefined)

  const getUser = () => {
    return user
  }

  return (
    <AuthContext.Provider value={{ getUser }}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthProviderState => {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error('AuthContext must be used with a Provider')
  }

  return context
}
