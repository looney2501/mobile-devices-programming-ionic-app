import { IonContent, IonPage } from '@ionic/react';
import React from 'react'
import HotelList from '../components/HotelList'

const HotelsHomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HotelList />
      </IonContent>
    </IonPage>
  );
};

export default HotelsHomePage;
