import { GET_HOTELS, LOADING_CHANGED, UI_ERROR } from '../actions/actionTypes'

export interface HotelState {
  id?: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
  dateRegistered: Date;
}

export interface State {
  hotels: HotelState[],
  isLoading: boolean,
  error?: Error
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
        return { ...state, hotels: action.payload.hotels }
      case UI_ERROR:
        return { ...state, error: action.payload.error }
      default:
        return state
    }
  }