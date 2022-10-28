import React from 'react'
import HotelListItem from './HotelListItem'
import { getLogger } from '../core/loggerUtils'
import { useHotelItems } from './useHotels'

const log = getLogger('HotelList')

const HotelList: React.FC = () => {
  const { hotels } = useHotelItems()
  log('render')
  return (
    <>
      {hotels.map(hotel => (
          <HotelListItem key={hotel.id}
                         name={hotel.name}
                         capacity={hotel.capacity}
                         isAvailable={hotel.isAvailable}
                         dateRegistered={hotel.dateRegistered}
          />
      ))}
    </>
  )
}

export default HotelList