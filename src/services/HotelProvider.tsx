import PropTypes from 'prop-types'
import React, { useEffect, useReducer } from 'react'
import { getLogger } from '../utils/loggerUtils'
import { initialState, reducer } from '../reducers/reducer'
import { GET_HOTELS, LOADING_CHANGED, UI_ERROR } from '../actions/actionTypes'
import { requestHotels } from '../actions/hotelActions'
import HotelContext from './HotelContext'

const log = getLogger('HotelsProvider')

interface HotelProviderProps {
  children: PropTypes.ReactNodeLike
}

const HotelProvider: React.FC<HotelProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchHotels = () => {
    log('fetchHotels started')
    dispatch({ type: LOADING_CHANGED, payload: { isLoading: true } })
    requestHotels().then((response) => {
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

  useEffect(fetchHotels, [])

  log(`returns - state = ${JSON.stringify(state, null, 2)}`)
  return (
    <HotelContext.Provider value={state}>
      {children}
    </HotelContext.Provider>
  )
}

export default HotelProvider

