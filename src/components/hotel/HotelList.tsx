import React, { useContext } from 'react'
import { getLogger } from '../../utils/loggerUtils'
import { IonLoading, IonList } from '@ionic/react'
import HotelListItem from './HotelListItem'
import HotelContext from '../../services/HotelContext'

const log = getLogger('HotelList')

const HotelList: React.FC = () => {
  const { hotels, isLoading, error } = useContext(HotelContext)
  log('render')
  return (
    <>
      <IonLoading isOpen={isLoading} message="Loading..." />
      {error?  (
        <div>{error.message || 'Failed to fetch items'}</div>
      ) : hotels && (
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
    </>
  )
}

export default HotelList