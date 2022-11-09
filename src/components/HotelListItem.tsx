import React from 'react'
import moment from 'moment/moment'
import { IonItem } from '@ionic/react'
import { HotelState } from '../reducers/reducer'

const HotelListItem: React.FC<HotelState> = (hotel) => {
  return (
    <IonItem>
      <div>
        <p>{hotel.name}</p>
        <p>{`Active since: ${moment(hotel.dateRegistered).toString()}`}</p>
        <p>Capacity: {hotel.capacity}</p>
        <p>{hotel.isAvailable ? 'Available' : 'Unavailable'}</p>
      </div>
    </IonItem>
  )
}

export default HotelListItem
