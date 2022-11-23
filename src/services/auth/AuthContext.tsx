import React from 'react'

export type LoginFn = (username?: string, password?: string) => void

export interface AuthState {
  authError: Error | null,
  isAuthenticated: boolean,
  isAuthenticating: boolean,
  login?: LoginFn,
  pendingAuth?: boolean,
  username?: string,
  password?: string,
  token: string
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  authError: null,
  pendingAuth: false,
  token: ''
}

const AuthContext = React.createContext<AuthState>(initialState)

export default AuthContext