import PropTypes from 'prop-types'
import React, { memo, useCallback, useContext, useEffect, useReducer } from 'react'
import { getLogger } from '../../utils/loggerUtils'
import { HotelProps, initialState, reducer } from '../../reducers/reducer'
import {
  CLEAR_HOTELS_OFFLINE,
  GET_HOTELS,
  LOADING_CHANGED,
  POST_HOTELS,
  POST_HOTELS_OFFLINE,
  UI_ERROR
} from '../../actions/actionTypes'
import { requestGetHotels, requestPostHotels } from '../../actions/hotelActions'
import HotelContext from './HotelContext'
import { NewHotelProps } from '../../components/hotel/HotelCreatePage'
import { createWebSocket } from '../../utils/webSocketUtils'
import AuthContext from '../auth/AuthContext'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'
import { Preferences } from '@capacitor/preferences'

const log = getLogger('HotelsProvider')

interface HotelProviderProps {
  children: PropTypes.ReactNodeLike
}

export type PostHotelFunction = (props: NewHotelProps) => Promise<any>

const HotelProvider: React.FC<HotelProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const { connectionStatus } = useConnectionStatus()

  const handleConnectionStatusChange = useCallback(async () => {
    const postPendingHotels = async (token: string, offlineHotels: HotelProps[]) => {
      for (const h of offlineHotels) {
        const json = JSON.stringify(h)
        try {
          log('save local hotel - started')
          await requestPostHotels(token, h)
          await Preferences.remove({ key: json })
          log('save local hotel - succeeded')
        } catch (e) {
          console.log('save local hotel - failed')
        } finally {
          dispatch({ type: CLEAR_HOTELS_OFFLINE })
        }
      }
    }

    if (connectionStatus?.connected) {
      const { offlineHotels } = state

      log('connection gained')
      await postPendingHotels(token, offlineHotels)
    }
  }, [connectionStatus?.connected, state.offlineHotels, token])

  const fetchHotels = async () => {
    if (!token?.trim()) {
      return
    }
    try {
      log('fetchHotels started')
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: true } })
      const hotels = await requestGetHotels(token)
      log('fetchHotels - succeeded')
      dispatch({ type: GET_HOTELS, payload: { hotels: hotels } })
    } catch (e) {
      log('fetchHotels - failed')
      dispatch({ type: UI_ERROR, payload: { error: e } })
    } finally {
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: false } })
    }
  }

  const saveNewHotel = async (props: NewHotelProps) => {
    try {
      log('saveNewHotel - started')
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: true } })
      await requestPostHotels(token, props)
      log('saveNewHotel - succeeded')
    } catch (e) {
      log('savedNewHotel - failed')
      await saveHotelOffline(props)
    } finally {
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: false } })
    }
  }

  const saveHotelOffline = async (hotel: NewHotelProps) => {
    log('saveNewHotel - offline - started')
    dispatch({ type: POST_HOTELS_OFFLINE, payload: { hotel: hotel } })
    const json = JSON.stringify(hotel)
    await Preferences.set({ key: json, value: json })
    log('saveNewHotel - offline - ended')
  }

  const wsEffect = () => {
    log('wfEffect - connecting')
    let closeWebSocket: () => void
    if (token?.trim()) {
      closeWebSocket = createWebSocket(token, message => {
        const { event, payload: { hotel } } = message
        log(`ws message, hotel = ${hotel}`)
        if (event === 'created') {
          dispatch({ type: POST_HOTELS, payload: { hotel } })
        }
      })
    }
    // @ts-ignore
    return () => {
      log('wsEffect - disconnecting')
      closeWebSocket?.()
    }
  }

  useEffect(() => {fetchHotels()}, [token])
  useEffect(wsEffect, [token, connectionStatus?.connected])
  useEffect(() => {handleConnectionStatusChange()}, [handleConnectionStatusChange])

  const saveHotel = useCallback<PostHotelFunction>(saveNewHotel, [token])
  const value = { ...state, saveHotel }

  log('returns', value)

  return (
    <HotelContext.Provider value={value}>
      {children}
    </HotelContext.Provider>
  )
}

export default HotelProvider
