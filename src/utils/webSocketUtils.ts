import { HotelProps } from '../reducers/reducer'
import { baseUrl } from './authUtils'
import { getLogger } from './loggerUtils'

interface MessageData {
  event: string,
  payload: {
    hotel: HotelProps
  }
}

const log = getLogger('createWebSocket')

export const createWebSocket = (token: string, onMessage: (data: MessageData) => void) => {
  const ws = new WebSocket(`ws://${baseUrl}`)
  ws.onopen = () => {
    log('web socket onOpen')
    ws.send(JSON.stringify({ type: 'authorization', payload: { token } }))
  }
  ws.onclose = () => {
    log('web socket onClose')
  }
  ws.onerror = error => {
    log('web socket onError', error)
  }
  ws.onmessage = messageEvent => {
    log('web socket onMessage')
    onMessage(JSON.parse(messageEvent.data))
  }
  return () => {
    ws.close()
  }
}