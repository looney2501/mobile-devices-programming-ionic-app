import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import AuthContext, { AuthState } from '../../services/auth/AuthContext'
import { getLogger } from '../../utils/loggerUtils'

const log = getLogger('PrivateRoute')

export interface PrivateRouteProps {
  component: PropTypes.ReactComponentLike;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext<AuthState>(AuthContext)
  log('render')
  return (
    <Route {...rest} render={props => {
      if (isAuthenticated) {
        // @ts-ignore
        return <Component {...props} />
      }
      return <Redirect to={{ pathname: '/login' }} />
    }} />
  )
}
