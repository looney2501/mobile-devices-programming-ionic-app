import React from 'react'
import { getLogger } from '../utils/loggerUtils'
import { useHotelsState } from '../hooks/useHotelsState'
import { IonLoading, IonList } from '@ionic/react'
import HotelListItem from './HotelListItem'

const log = getLogger('HotelList')

const HotelList: React.FC = () => {
  const { hotels, isLoading, error } = useHotelsState()
  log('render')
  return (
    <>
      <IonLoading isOpen={isLoading} message="Fetching hotels..." />
      {hotels && (
        <IonList>
          {hotels.map(hotel => (
            <HotelListItem key={hotel.id}
                           name={hotel.name}
                           capacity={hotel.capacity}
                           isAvailable={hotel.isAvailable}
                           dateRegistered={hotel.dateRegistered}
            />
          ))}
        </IonList>
      )}
      {error && (
        <div>{error.message || 'Failed to fetch items'}</div>
      )}
    </>
  )
}

export default HotelList