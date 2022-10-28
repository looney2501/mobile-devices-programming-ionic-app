import React from 'react'
import { HotelProps } from './useHotels'
import moment from 'moment/moment'

const HotelListItem: React.FC<HotelProps> = (hotel) => {
  return (
    <div>
      <p>{hotel.name}</p>
      <p>{`Active since: ${moment(hotel.dateRegistered).toString()}`}</p>
      <p>Capacity: {hotel.capacity}</p>
      <p>{hotel.isAvailable ? 'Available' : 'Unavailable'}</p>
    </div>
  )
}

export default HotelListItem
