import React from 'react'
import moment from 'moment/moment'
import { IonItem } from '@ionic/react'
import { HotelProps } from '../../reducers/reducer'

const HotelListItem: React.FC<HotelProps> = (hotel) => {
  return (
    <IonItem>
      <div>
        {!hotel._id && (
          <p style={{ backgroundColor: "yellow", color: "black" }}>!!!Locally saved only</p>
        )}
        <p>{hotel.name}</p>
        <p>{`Active since: ${moment(hotel.dateRegistered).toString()}`}</p>
        <p>Capacity: {hotel.capacity}</p>
        <p>{hotel.isAvailable ? 'Available' : 'Unavailable'}</p>
      </div>
    </IonItem>
  )
}

export default HotelListItem
