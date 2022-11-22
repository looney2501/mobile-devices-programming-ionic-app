import { getLogger } from '../../utils/loggerUtils'
import Axios from 'axios'
import { NewHotelProps } from '../../components/hotel/HotelCreatePage'

const log = getLogger('hotelsActions')

export const baseUrl = 'localhost:3000'

const withLogs = (promise: Promise<any>, functionName: string): Promise<any> => {
  log(`${functionName} - started`)
  return promise
    .then(res => {
      log(`${functionName} - succeeded`)
      return Promise.resolve(res)
    })
    .catch(err => {
      log(`${functionName} - failed`)
      return Promise.reject(err)
    })
}

export const requestGetHotels = () => {
  return withLogs(Axios.get(`http://${baseUrl}/hotels`), 'requestGetHotels')
}

export const requestPostHotels = (props: NewHotelProps) => {
  return withLogs(Axios.post(`http://${baseUrl}/hotels`, props), 'requestPostHotels')
}