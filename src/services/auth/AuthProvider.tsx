import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import AuthContext, { AuthState, initialState, LoginFn } from './AuthContext'
import { getLogger } from '../../utils/loggerUtils'
import { requestPostLogin } from '../../actions/authActions'
import { Preferences } from '@capacitor/preferences'

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike
}

const log = getLogger('AuthProvider')

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState)
  const { isAuthenticated, isAuthenticating, authError, pendingAuth, token } = state

  const loginCallback = (username?: string, password?: string): void => {
    log('login')
    setState({
      ...state,
      pendingAuth: true,
      username,
      password
    })
  }

  const authenticationEffect = async () => {
    if (!pendingAuth) {
      log('authentication not pending')
      return
    }
    try {
      log('authentication started')
      setState({
        ...state,
        isAuthenticating: true
      })
      const { username, password } = state
      const { token } = await requestPostLogin(username, password)

      log('authentication succeeded')
      setState({
        ...state,
        token,
        pendingAuth: false,
        isAuthenticated: true,
        isAuthenticating: false
      })
      await Preferences.set({ key: 'authorization-token', value: token })
    } catch (error: Error | any) {
      log('authentication failed')
      setState({
        ...state,
        authError: error,
        pendingAuth: false,
        isAuthenticating: false
      })
    }
  }

  const checkAuthorization = async () => {
    const token = await Preferences.get({ key: 'authorization-token' })
    if (token.value) {
      setState({
        ...state,
        token: token.value,
        isAuthenticated: true
      })
    }
  }

  const logoutCallback = async () => {
    log('logout')
    await Preferences.remove({ key: 'authorization-token' })
    setState({
      ...state,
      isAuthenticated: false,
      token: ''
    })
  }

  useEffect(() => {checkAuthorization()}, [])
  useEffect(() => {authenticationEffect()}, [pendingAuth])

  const login = useCallback<LoginFn>(loginCallback, [])
  const logout = useCallback(logoutCallback, [])
  const value = { isAuthenticated, login, logout, isAuthenticating, authError, token }

  log('returns', value)

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider