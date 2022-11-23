import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle,
  IonHeader,
  IonToolbar, IonButtons, IonButton
} from '@ionic/react'
import React from 'react'
import HotelList from './HotelList'
import { add } from 'ionicons/icons'
import { RouteComponentProps, useHistory } from 'react-router'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'

const HotelHomePage: React.FC<RouteComponentProps> = ({ history }) => {
  const { connectionStatus } = useConnectionStatus()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hotels dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              {connectionStatus?.connected ? 'Connected' : 'Not connected'}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <>
          <HotelList />
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => {
              history.push('/hotels/new')
            }}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </>
      </IonContent>
    </IonPage>
  )
}

export default HotelHomePage
