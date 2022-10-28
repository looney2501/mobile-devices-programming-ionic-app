import React, { memo } from 'react'
import { HotelProps } from './useHotels'

const HotelListItem: React.FC<HotelProps> = (hotel) => {
  return (
    <div>
      <p>{hotel.name}</p>
      <p>{`Active since: ${hotel.dateRegistered.toDateString()}`}</p>
      <p>Capacity: {hotel.capacity}</p>
      <p>{hotel.isAvailable ? 'Available' : 'Unavailable'}</p>
    </div>
  )
}

export default memo(HotelListItem)