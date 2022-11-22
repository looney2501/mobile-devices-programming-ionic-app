import { HotelProps } from '../reducers/reducer'
import { baseUrl } from '../actions/hotel/hotelActions'
import { getLogger } from './loggerUtils'

interface MessageData {
  event: string,
  payload: {
    hotel: HotelProps
  }
}

const log = getLogger('createWebSocket')

export const createWebSocket = (onMessage: (data: MessageData) => void) => {
  const ws = new WebSocket(`ws://${baseUrl}`)
  ws.onopen = () => {
    log('web socket onOpen')
  }
  ws.onerror = () => {
    log('web socket onError')
  }
  ws.onmessage = messageEvent => {
    log('web socket onMessage')
    onMessage(JSON.parse(messageEvent.data))
  }
  return () => {
    ws.close()
  }
}