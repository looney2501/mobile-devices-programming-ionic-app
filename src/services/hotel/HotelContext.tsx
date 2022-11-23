import { initialState, State } from '../../reducers/reducer'
import React from 'react'

const HotelContext = React.createContext<State>(initialState)

export default HotelContext