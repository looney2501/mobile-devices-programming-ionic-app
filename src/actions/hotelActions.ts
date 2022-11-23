import Axios from 'axios'
import { NewHotelProps } from '../components/hotel/HotelCreatePage'
import { authConfig, apiUrl, withLogs } from '../utils/authUtils'
import { HotelProps } from '../reducers/reducer'

export const requestGetHotels: (token: string) => Promise<HotelProps[]> = token => {
  return withLogs(Axios.get(`http://${apiUrl}/hotels`, authConfig(token)), 'requestGetHotels')
}

export const requestPostHotels: (token: string, props: NewHotelProps) => Promise<HotelProps> = (token, props) => {
  return withLogs(Axios.post(`http://${apiUrl}/hotels`, props, authConfig(token)), 'requestPostHotels')
}