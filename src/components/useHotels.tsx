import { getLogger } from '../core/loggerUtils'
import { useEffect, useState } from 'react'
import { requestHotels } from '../actions/hotelActions'

const log = getLogger('useItems')

export interface HotelProps {
  id?: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
  dateRegistered: Date;
}

export interface HotelsState {
  hotels?: HotelProps[],
  fetching: boolean,
  fetchingError?: Error
}

export const useHotelItems: () => HotelsState = () => {
  const [fetching, setFetching] = useState<boolean>(false)
  const [hotels, setHotels] = useState<HotelProps[]>()
  const [fetchingError, setFetchingError] = useState<Error>();

  useEffect(getHotelsEffect, [])

  log(`returns - fetching = ${fetching}, hotels = ${JSON.stringify(hotels)}`);
  return { hotels, fetching, fetchingError }

  function getHotelsEffect() {
    let canceled = false;
    fetchItems();
    return () => {
      canceled = true;
    }

    async function fetchItems() {
      try {
        log('fetchItems started');
        setFetching(true);
        const hotels = await requestHotels();
        log('fetchItems succeeded');
        if (!canceled) {
          setFetching(false);
          setHotels(hotels);
        }
      } catch (error) {
        log('fetchItems failed');
        if (!canceled) {
          setFetching(false);
          // @ts-ignore
          setFetchingError(error);
        }
      }
    }
  }
}