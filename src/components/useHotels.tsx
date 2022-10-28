import { getLogger } from '../core/loggerUtils'
import { useState } from 'react'

const log = getLogger('useItems')

export interface HotelProps {
  id?: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
  dateRegistered: Date;
}

export interface HotelsProps {
  hotels: HotelProps[],
}

export const useHotelItems: () => HotelsProps = () => {
  const [hotels, setHotels] = useState([
    { id: '1', name: 'Hotel Steaua', capacity: 140, isAvailable: true, dateRegistered: new Date('10-24-2020') },
    { id: '2', name: 'Hotel Margareta', capacity: 200, isAvailable: false, dateRegistered: new Date('01-09-1990') },
  ])

  log('returns')
  return { hotels }
}