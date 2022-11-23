import { getLogger } from './loggerUtils'

export const baseUrl = 'localhost:3000'
export const apiUrl = `${baseUrl}/api`

const log = getLogger('api')

export const withLogs = (promise: Promise<any>, functionName: string): Promise<any> => {
  log(`${functionName} - started`)
  return promise
    .then(res => {
      log(`${functionName} - succeeded`)
      return Promise.resolve(res.data)
    })
    .catch(err => {
      log(`${functionName} - failed`)
      return Promise.reject(err)
    })
}

export const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const authConfig = (token?: string) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})