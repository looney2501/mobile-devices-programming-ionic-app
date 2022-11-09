import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react'
import React, { useCallback } from 'react'
import HotelList from '../components/HotelList'
import { add } from 'ionicons/icons'
import { RouteComponentProps } from 'react-router'

const HotelHomePage: React.FC<RouteComponentProps> = ({ history }) => {
  const handleOnClick = useCallback(() => {
    history.push('/hotels/new')
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen>
        <>
          <HotelList />
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleOnClick}>
              <IonIcon icon={add}/>
            </IonFabButton>
          </IonFab>
        </>
      </IonContent>
    </IonPage>
  )
}

export default HotelHomePage
