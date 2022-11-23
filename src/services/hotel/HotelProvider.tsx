import PropTypes from 'prop-types'
import React, { memo, useCallback, useContext, useEffect, useReducer } from 'react'
import { getLogger } from '../../utils/loggerUtils'
import { initialState, reducer } from '../../reducers/reducer'
import { GET_HOTELS, LOADING_CHANGED, POST_HOTELS, UI_ERROR } from '../../actions/actionTypes'
import { requestGetHotels, requestPostHotels } from '../../actions/hotelActions'
import HotelContext from './HotelContext'
import { NewHotelProps } from '../../components/hotel/HotelCreatePage'
import { createWebSocket } from '../../utils/webSocketUtils'
import AuthContext from '../auth/AuthContext'

const log = getLogger('HotelsProvider')

interface HotelProviderProps {
  children: PropTypes.ReactNodeLike
}

export type PostHotelFunction = (props: NewHotelProps) => Promise<any>

const HotelProvider: React.FC<HotelProviderProps> = ({ children }) => {
  const { token } = useContext(AuthContext)
  const [state, dispatch] = useReducer(reducer, initialState)

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
      log(token)
      await requestPostHotels(token, props)
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
  useEffect(wsEffect, [token])

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
