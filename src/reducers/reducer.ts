import {
  GET_HOTELS,
  LOADING_CHANGED,
  UI_ERROR,
  POST_HOTELS,
  POST_HOTELS_OFFLINE,
  CLEAR_HOTELS_OFFLINE
} from '../actions/actionTypes'
import { PostHotelFunction } from '../services/hotel/HotelProvider'

export interface HotelProps {
  _id?: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
  dateRegistered: Date;
  location: { longitude: number, latitude: number };
}

export interface State {
  hotels: HotelProps[],
  offlineHotels: HotelProps[]
  isLoading: boolean,
  error?: Error
  saveHotel?: PostHotelFunction
}

interface ActionProps {
  type: string,
  payload?: any,
  error?: any
}

export const initialState: State = {
  hotels: [],
  offlineHotels: [],
  isLoading: false,
  error: undefined
}

export const reducer: (state: State, action: ActionProps) => State =
  (state, action) => {
    switch (action.type) {
      case LOADING_CHANGED:
        return { ...state, isLoading: action.payload.isLoading }
      case GET_HOTELS:
        return { ...state, hotels: action.payload.hotels, error: undefined }
      case POST_HOTELS:
        const hotels = state.hotels.concat(action.payload.hotel)
        return { ...state, hotels: hotels, error: undefined}
      case POST_HOTELS_OFFLINE:
        const offlineHotels = state.offlineHotels.concat(action.payload.hotel)
        return { ...state, offlineHotels: offlineHotels, error: undefined }
      case CLEAR_HOTELS_OFFLINE:
        return { ...state, offlineHotels: [] }
      case UI_ERROR:
        return { ...state, error: action.payload.error }
      default:
        return state
    }
  }