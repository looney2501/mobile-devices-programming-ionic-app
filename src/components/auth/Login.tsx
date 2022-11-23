import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { getLogger } from '../../utils/loggerUtils'
import AuthContext from '../../services/auth/AuthContext'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'

const log = getLogger('Login');

interface LoginState {
  username?: string;
  password?: string;
}

export const Login: React.FC<RouteComponentProps> = () => {
  const { connectionStatus } = useConnectionStatus()
  const { isAuthenticated, isAuthenticating, login, authError } = useContext(AuthContext)
  const [state, setState] = useState<LoginState>({})
  const { username, password } = state

  const handleLogin = () => {
    login?.(username, password);
  }

  log('render')

  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              {connectionStatus?.connected ? 'Connected' : 'Not connected'}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          placeholder="Username"
          value={username}
          onIonChange={e => setState({
            ...state,
            username: e.detail.value || ''
          })}/>
        <IonInput
          placeholder="Password"
          value={password}
          onIonChange={e => setState({
            ...state,
            password: e.detail.value || ''
          })}/>
        <IonLoading isOpen={isAuthenticating}/>
        {authError && (
          <div>{'Failed to authenticate'}</div>
        )}
        <IonButton onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  )
}
