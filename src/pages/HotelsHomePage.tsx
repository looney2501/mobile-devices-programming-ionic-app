import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react'
import HotelList from '../components/HotelList'
import { add } from 'ionicons/icons'

const HotelsHomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <>
          <HotelList />
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </>
      </IonContent>
    </IonPage>
  );
};

export default HotelsHomePage;
