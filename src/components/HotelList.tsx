import React from 'react'
import { getLogger } from '../core/loggerUtils'
import { useHotelItems } from './useHotels'
import { IonLoading, IonList } from '@ionic/react'
import HotelListItem from './HotelListItem'

const log = getLogger('HotelList')

const HotelList: React.FC = () => {
  const { hotels, fetching, fetchingError } = useHotelItems()
  log('render')
  return (
    <>
      <IonLoading isOpen={fetching} message="Fetching hotels..." />
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
      {fetchingError && (
        <div>{fetchingError.message || 'Failed to fetch items'}</div>
      )}
    </>
  )
}

export default HotelList