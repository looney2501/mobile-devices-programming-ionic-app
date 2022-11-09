import { getLogger } from '../utils/loggerUtils'
import { useEffect, useReducer } from 'react'
import { requestHotels } from '../actions/hotelActions'
import { State, reducer, initialState } from '../reducers/reducer'
import { GET_HOTELS, LOADING_CHANGED, UI_ERROR } from '../actions/actionTypes'

const log = getLogger('useHotelsState')

export const useHotelsState: () => State = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { hotels, isLoading, error } = state

  const fetchHotels = () => {
    log('fetchHotels started')
    dispatch({ type: LOADING_CHANGED, payload: { isLoading: true } })
    requestHotels().then((response) => {
      if (response.status === 200) {
        log('fetchHotels succeeded')
        dispatch({ type: GET_HOTELS, payload: { hotels: response.data } })
      } else {
        log(`fetchHotels failed with response code ${response.status}`)
        dispatch({ type: UI_ERROR, payload: { error: `Error with message ${response.status}` } })
      }
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: false } })
    }).catch((error) => {
      log('fetchHotels failed')
      dispatch({ type: UI_ERROR, payload: { error: error } })
      dispatch({ type: LOADING_CHANGED, payload: { isLoading: false } })
    })
  }

  useEffect(fetchHotels, [])
  log(`returns - isLoading = ${isLoading}, error = ${error}, hotels = ${JSON.stringify(hotels)}`)

  return { hotels, isLoading, error }
}