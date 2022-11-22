import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonTitle,
  IonHeader,
  IonToolbar
} from '@ionic/react'
import React from 'react'
import HotelList from './HotelList'
import { add } from 'ionicons/icons'
import { useHistory } from 'react-router'

const HotelHomePage: React.FC = () => {
  const history = useHistory()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hotels Dashboard</IonTitle>
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
