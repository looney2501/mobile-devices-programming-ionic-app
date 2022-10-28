import React from 'react'

interface HotelListItemProps {
  id?: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
  dateRegistered: Date;
}

const HotelListItem: React.FC<HotelListItemProps> = (hotel) => {
  return (
    <div>
      <p>{hotel.name}</p>
      <p>{`Active since: ${hotel.dateRegistered}`}</p>
      <p>Capacity: {hotel.capacity}</p>
      <p>{hotel.isAvailable ? 'Available' : 'Unavailable'}</p>
    </div>
  )
}

export default HotelListItem