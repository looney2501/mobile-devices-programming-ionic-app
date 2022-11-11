import React, { useState } from 'react'
import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import HotelCreateForm from '../components/HotelCreateForm'
import HotelCreateFooter from '../components/HotelCreateFooter'
import moment from 'moment/moment'
import { getLogger } from '../utils/loggerUtils'

const HotelCreatePage: React.FC = () => {
  const [newHotel, setNewHotel] = useState({})

  const log = getLogger('HotelCreatePage')

  log(`render - newHotel = ${JSON.stringify(newHotel, null, 2)}`)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add new hotel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <HotelCreateForm newHotel={newHotel} setNewHotel={setNewHotel} />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <HotelCreateFooter newHotel={newHotel} setNewHotel={setNewHotel} />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}

export default HotelCreatePage