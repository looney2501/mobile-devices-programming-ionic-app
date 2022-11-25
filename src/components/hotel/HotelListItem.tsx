import React, { useState } from 'react'
import moment from 'moment/moment'
import { IonButton, IonItem } from '@ionic/react'
import { HotelProps } from '../../reducers/reducer'
import HotelDetailsModal from './HotelDetailsModal'

const HotelListItem: React.FC<HotelProps> = (hotel) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <IonItem>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {!hotel._id && (
            <p style={{ backgroundColor: "yellow", color: "black" }}>!!!Locally saved only</p>
          )}
          <p>{hotel.name}</p>
          <p>{`Active since: ${moment(hotel.dateRegistered).toString()}`}</p>
          <p>Capacity: {hotel.capacity}</p>
          <p>{hotel.isAvailable ? 'Available' : 'Unavailable'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IonButton onClick={() => setShowModal(true)}>Show Details</IonButton>
        </div>
      </div>
      <HotelDetailsModal hotelProps={hotel} showModal={showModal} setShowModal={setShowModal} />
    </IonItem>
  )
}

export default HotelListItem
