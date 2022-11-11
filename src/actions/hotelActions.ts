import { getLogger } from '../utils/loggerUtils'
import Axios from 'axios'
import { NewHotelProps } from '../components/HotelCreateForm'

const log = getLogger('hotelsActions')

export const baseUrl = 'localhost:3000'

//TODO create withLogs function

export const requestGetHotels = () => {
  log('requestGetHotels - started')
  return Axios
    .get(`http://${baseUrl}/hotels`)
    .then(res => {
      log('requestGetHotels - succeeded')
      return Promise.resolve(res)
    })
    .catch(err => {
      log('requestGetHotels - failed')
      return Promise.reject(err)
    });
}

export const requestPostHotels = (props: NewHotelProps) => {
  log('requestPostHotels - started')
  return Axios
    .post(`http://${baseUrl}/hotels`, props)
    .then(res => {
      log('requestPostHotels - succeeded')
      return Promise.resolve(res)
    })
    .catch(err =>{
      log('requestPostHotels - failed')
      return Promise.reject(err)
    })
}