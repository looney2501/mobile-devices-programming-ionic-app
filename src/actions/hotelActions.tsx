import { getLogger } from '../core/loggerUtils'
import Axios from 'axios'

const log = getLogger('hotelsActions')

const baseUrl = 'http://localhost:3000'

export const requestHotels = () => {
  log('requestHotels - started');
  return Axios
    .get(`${baseUrl}/hotels`)
    .then(res => {
      log('requestHotels - succeeded');
      return Promise.resolve(res.data);
    })
    .catch(err => {
      log('getItems - failed');
      return Promise.reject(err);
    });
}