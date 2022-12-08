import { getLogger } from '../utils/loggerUtils'
import { Geolocation, Position } from '@capacitor/geolocation';
import { useEffect, useState } from 'react'

const log = getLogger('useMyLocation')

interface MyLocation {
  longitude?: number;
  latitude?: number;
  error?: Error;
}

export const useMyLocation = () => {
  const [location, setLocation] = useState<MyLocation>({})

  useEffect(() => {
    getMyLocation()
  }, [])

  const getMyLocation = async () => {
    try {
      log('fetching current location')
      const myLocation = await Geolocation.getCurrentPosition()
      log('current location fetched successful = ', myLocation)
      setLocation({ longitude: myLocation.coords.longitude, latitude: myLocation.coords.latitude })
    } catch (error) {
      log('current location error = ', error)
      // @ts-ignore
      setLocation({ error })
    }
  }

  log('returns location = ', location)
  return { location, setLocation }
}