import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle,
  IonHeader,
  IonToolbar, IonButtons, IonButton, IonSearchbar
} from '@ionic/react'
import React, { useContext, useState } from 'react'
import HotelList from './HotelList'
import { add } from 'ionicons/icons'
import { RouteComponentProps, useHistory } from 'react-router'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'
import AuthContext from '../../services/auth/AuthContext'
import { getLogger } from '../../utils/loggerUtils'

const log = getLogger('HotelHomePage')

const HotelHomePage: React.FC<RouteComponentProps> = ({ history }) => {
  const { connectionStatus } = useConnectionStatus()
  const { logout } = useContext(AuthContext)
  const [nameSearch, setNameSearch] = useState<string>('')

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hotels dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              {connectionStatus?.connected ? 'Connected' : 'Not connected'}
            </IonButton>
            <IonButton
              color="danger"
              onClick={() => {
                logout?.()
              }}
            >
              Logout
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={nameSearch}
          debounce={300}
          onIonChange={(e) => {
            setNameSearch(e.detail.value!)
            console.log('search value = ', e.detail.value)
          }}
        />
        <HotelList nameSearch={nameSearch} />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => {
            history.push('/hotels/new')
          }}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default HotelHomePage
