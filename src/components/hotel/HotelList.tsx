import React, { useContext, useEffect, useState } from 'react'
import { getLogger } from '../../utils/loggerUtils'
import {
  IonLoading,
  IonList,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  createAnimation
} from '@ionic/react'
import HotelListItem from './HotelListItem'
import HotelContext from '../../services/hotel/HotelContext'
import { ReactComponent } from '*.svg'
import { HotelProps } from '../../reducers/reducer'

const log = getLogger('HotelList')

const indicesPresented = 5

interface HotelListInterface {
  nameSearch: string,
  availabilityFilter: string | undefined
}

const HotelList: React.FC<HotelListInterface> = ({ nameSearch, availabilityFilter}) => {
  const { hotels, offlineHotels, isLoading, error } = useContext(HotelContext)
  const [allHotels, setAllHotels] = useState(hotels.concat(offlineHotels))
  const [allHotelsPaginated, setAllHotelsPaginated] = useState<HotelProps[]>([])
  const [indexPagination, setIndexPagination] = useState<number>(0)
  const [finished, setFinished] = useState(false)

  const fetchData = () => {
    if (allHotels) {
      const newIndex = Math.min(indexPagination + indicesPresented, allHotels.length)
      log('new pagination index = ', newIndex)
      if (newIndex > allHotels.length) {
        setFinished(true)
      } else if (newIndex !== indexPagination) {
        const newHotelsPaginated = allHotels.slice(0, newIndex)
        log('new pagination hotels', newHotelsPaginated)
        setAllHotelsPaginated(newHotelsPaginated)
        setIndexPagination(newIndex)
      }
    }
  }

  const animation = () => {
    const el = document.querySelectorAll('.hotel-list')
    if (el) {
      const animation = createAnimation()
        .addElement(el)
        .duration(1000)
        .fromTo('transform', 'translateX(50%)', 'translateX(0px)')

      animation.play()
    }
  }

  useEffect(() => setAllHotels(hotels.concat(offlineHotels)), [hotels, offlineHotels])
  useEffect(fetchData, [allHotels])
  useEffect(animation, [])

  log('render')
  return (
    <>
      <IonLoading isOpen={isLoading} message="Loading..." />
      {error?  (
        <div>{error.message || 'Failed to fetch items'}</div>
      ) : allHotelsPaginated && (
        <>
          <IonList className="hotel-list">
            {allHotelsPaginated
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
                               _id={hotel._id}
                               name={hotel.name}
                               capacity={hotel.capacity}
                               isAvailable={hotel.isAvailable}
                               dateRegistered={hotel.dateRegistered}
                />
            ))}
          </IonList>
          <IonInfiniteScroll
            threshold="100px"
            disabled={finished}
            onIonInfinite={async (e: CustomEvent<void>) => {
              fetchData()
              await (e.target as HTMLIonInfiniteScrollElement).complete()
            }}
          >
            <IonInfiniteScrollContent loadingText="Loading more hotels..." />
          </IonInfiniteScroll>
        </>
      )}
    </>
  )
}

export default HotelList