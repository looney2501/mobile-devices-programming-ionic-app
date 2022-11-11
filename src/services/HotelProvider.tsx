import PropTypes from 'prop-types'
import React, { memo, useCallback, useEffect, useReducer } from 'react'
import { getLogger } from '../utils/loggerUtils'
import { initialState, reducer } from '../reducers/reducer'
import { GET_HOTELS, LOADING_CHANGED, POST_HOTELS, UI_ERROR } from '../actions/actionTypes'
import { requestGetHotels, requestPostHotels } from '../actions/hotelActions'
import HotelContext from './HotelContext'
import { NewHotelProps } from '../components/HotelCreateForm'
import { save } from 'ionicons/icons'
import { createWebSocket } from '../utils/createWebSocket'

const log = getLogger('HotelsProvider')

interface HotelProviderProps {
  children: PropTypes.ReactNodeLike
}

export type PostHotelFunction = (props: NewHotelProps) => Promise<any>

const HotelProvider: React.FC<HotelProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchHotels = () => {
    log('fetchHotels started')
    dispatch({ type: LOADING_CHANGED, payload: { isLoading: true } })
    requestGetHotels().then((response) => {
      if (response.status === 200) {
        log('fetchHotels - succeeded')
        dispatch({ type: GET_HOTELS, payload: { hotels: response.data } })
      } else {
        log(`fetchHotels - failed with response code ${response.status}`)
        dispatch({ type: UI_ERROR, payload: { error: `Error with message ${response.status}` } })
      }
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: false } })
    }).catch((error) => {
      log('fetchHotels - failed')
      dispatch({ type: UI_ERROR, payload: { error: error } })
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: false } })
    })
  }

  const saveNewHotel = async (props: NewHotelProps) => {
    try {
      log('saveNewHotel - started')
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: true } })
      const response = await requestPostHotels(props)
      const savedHotel = response.data
      log('saveNewHotel - succeeded')
    } catch (e) {
      log('savedNewHotel - failed')
      dispatch({ type: UI_ERROR, payload: { error: e } })
    } finally {
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: false } })
    }
  }

  const wsEffect = () => {
    log('wfEffect - connecting')
    const closeWebSocket = createWebSocket(message => {
      const { event, payload: { hotel } } = message
      log(`ws message, hotel = ${hotel}`)
      if (event === 'created') {
        dispatch({ type: POST_HOTELS, payload: { hotel } })
      }
    })
    return () => {
      log('wsEffect - disconnecting')
      closeWebSocket()
    }
  }

  useEffect(fetchHotels, [])
  useEffect(wsEffect, [])

  const saveHotel = useCallback<PostHotelFunction>(saveNewHotel, [])
  const value = { ...state, saveHotel }

  log(`returns - value = ${JSON.stringify(value, null, 2)}`)
  return (
    <HotelContext.Provider value={value}>
      {children}
    </HotelContext.Provider>
  )
}

export default HotelProvider
