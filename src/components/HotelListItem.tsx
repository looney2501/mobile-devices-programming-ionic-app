import React from 'react'
import { HotelProps } from './useHotels'
import moment from 'moment/moment'
import { IonItem } from '@ionic/react'

const HotelListItem: React.FC<HotelProps> = (hotel) => {
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
