import { GET_HOTELS, LOADING_CHANGED, UI_ERROR, POST_HOTELS } from '../actions/actionTypes'
import { PostHotelFunction } from '../services/HotelProvider'

export interface HotelProps {
  id?: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
  dateRegistered: Date;
}

export interface State {
  hotels: HotelProps[],
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
      case UI_ERROR:
        return { ...state, error: action.payload.error }
      default:
        return state
    }
  }