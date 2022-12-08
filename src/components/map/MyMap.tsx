import { GoogleMap } from '@capacitor/google-maps'
import React, { useEffect, useRef, useState } from 'react'
import { mapsApiKey } from '../../utils/mapUtils'
import { getLogger } from '../../utils/loggerUtils'

export interface MapClickEvent {
  latitude: number,
  longitude: number
}

interface MyMapProps {
  lat: number;
  lng: number;
  onMapClick: (e: MapClickEvent) => void
}

const log = getLogger('MyMap')

const MyMap: React.FC<MyMapProps> = ({ lat, lng, onMapClick }) => {
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
        apiKey: mapsApiKey,
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
    if (markerId) {
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
    <div className="component-wrapper">
      <capacitor-google-map
        ref={mapRef}
        style={{
          display: 'block',
          width: 300,
          height: 400
        }}
      />
    </div>
  )
}

export default MyMap