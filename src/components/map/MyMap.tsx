import { GoogleMap } from '@capacitor/google-maps'
import React, { useEffect, useRef, useState } from 'react'
import { getLogger } from '../../utils/loggerUtils'

export interface MapClickEvent {
  latitude: number,
  longitude: number
}

interface MyMapProps {
  lat: number;
  lng: number;
  onMapClick?: (e: MapClickEvent) => void;
  editable: boolean
}

const log = getLogger('MyMap')

const MyMap: React.FC<MyMapProps> = ({ lat, lng, onMapClick, editable }) => {
  const mapRef = useRef<HTMLElement>(null)
  const [markerId, setMarkerId] = useState<string>('')
  const [googleMap, setGoogleMap] = useState<GoogleMap>()
  useEffect(myMapCreateEffect, [mapRef.current])
  useEffect(() => {myMapChangeMarkerEffect()}, [googleMap, markerId])

  function myMapCreateEffect() {
    let canceled = false
    createMap()
    return () => {
      canceled = true
      googleMap?.removeAllMapListeners()
    }

    async function createMap() {
      if (!mapRef.current) {
        return
      }
      let newGoogleMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef.current,
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY!,
        config: {
          center: { lat, lng },
          zoom: 14
        }
      })

      let newMarkerId = await newGoogleMap.addMarker({ coordinate: { lat, lng }, title: 'My location' })
      log('initial marker =', newMarkerId)
      setGoogleMap(newGoogleMap)
      setMarkerId(newMarkerId)
    }
  }

  const myMapChangeMarkerEffect = async () => {
    if (editable && markerId && onMapClick) {
      await googleMap?.setOnMapClickListener(async ({ latitude, longitude }) => {
        onMapClick({ latitude, longitude })
        log('deleting old marker =', markerId)
        await googleMap?.removeMarker(markerId)
        let newMarkerId = await googleMap?.addMarker({
          coordinate: { lat: latitude, lng: longitude }, title: 'Hotel location'
        })
        log('new marker =', newMarkerId)
        setMarkerId(newMarkerId)
      })
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <capacitor-google-map
        ref={mapRef}
        style={{
          display: 'block',
          width: '100%',
          height: 300
        }}
      />
    </div>
  )
}

export default MyMap