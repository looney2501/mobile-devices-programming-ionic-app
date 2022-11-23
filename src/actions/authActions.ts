import Axios from 'axios'
import { apiUrl, config, withLogs } from '../utils/authUtils'

export interface AuthProps {
  token: string
}

export const requestPostLogin: (username?: string, password?: string) => Promise<AuthProps> = (username, password) => {
  return withLogs(Axios.post(`http://${apiUrl}/auth/login`, { username, password }, config), 'requestPostLogin')
}