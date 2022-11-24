import React, { useContext } from 'react'
import { getLogger } from '../../utils/loggerUtils'
import { IonLoading, IonList, IonItem } from '@ionic/react'
import HotelListItem from './HotelListItem'
import HotelContext from '../../services/hotel/HotelContext'
import { ReactComponent } from '*.svg'

const log = getLogger('HotelList')

interface HotelListInterface {
  nameSearch: string,
  availabilityFilter: string | undefined
}

const HotelList: React.FC<HotelListInterface> = ({ nameSearch, availabilityFilter}) => {
  const { hotels, offlineHotels, isLoading, error } = useContext(HotelContext)
  log('render')
  return (
    <>
      <IonLoading isOpen={isLoading} message="Loading..." />
      {error?  (
        <div>{error.message || 'Failed to fetch items'}</div>
      ) : hotels && (
        <>
          <IonList>
            {hotels
              .filter(hotel => hotel.name.indexOf(nameSearch) >= 0)
              .filter(hotel => {
                switch (availabilityFilter) {
                  case 'all':
                    return true
                  case 'available':
                    return hotel.isAvailable
                  case 'unavailable':
                    return !hotel.isAvailable
                  default:
                    return true
                }
              })
              .map(hotel => (
              <HotelListItem key={hotel._id}
                             name={hotel.name}
                             capacity={hotel.capacity}
                             isAvailable={hotel.isAvailable}
                             dateRegistered={hotel.dateRegistered}
              />
            ))}
          </IonList>
          {
            offlineHotels && offlineHotels.length > 0 && (
              <>
                <IonItem color="warning">
                  The following hotels are locally saved only:
                </IonItem>
                {offlineHotels.map((hotel, i) => (
                  <HotelListItem key={i}
                                 name={hotel.name}
                                 capacity={hotel.capacity}
                                 isAvailable={hotel.isAvailable}
                                 dateRegistered={hotel.dateRegistered}
                  />
                ))}
              </>
            )
          }
        </>
      )}
    </>
  )
}

export default HotelList