import { getLogger } from '../utils/loggerUtils'
import Axios, { AxiosResponse } from 'axios'
import { HotelProps } from '../reducers/reducer'
import { NewHotelProps } from '../components/HotelCreateForm'

const log = getLogger('hotelsActions')

const baseUrl = 'http://localhost:3000'

export const requestGetHotels = () => {
  log('requestGetHotels - started')
  return Axios
    .get(`${baseUrl}/hotels`)
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
    .post(`${baseUrl}/hotels`, props)
    .then(res => {
      log('requestPostHotels - succeeded')
      return Promise.resolve(res)
    })
    .catch(err =>{
      log('requestPostHotels - failed')
      return Promise.reject(err)
    })
}