import { Network, ConnectionStatusChangeListener, ConnectionStatus } from '@capacitor/network'
import { useEffect, useState } from 'react'
import { getLogger } from '../utils/loggerUtils'

const log = getLogger('useConnectionStatus')

export const useConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>()

  const handleConnectionChanged = (status: ConnectionStatus) => {
    log('connection status changed to ', Network.getStatus())
    setConnectionStatus(status)
  }

  useEffect(() => {
    const handler = Network.addListener('networkStatusChange', handleConnectionChanged)

    Network.getStatus().then(status => setConnectionStatus(status))

    return () => {
      handler.remove()
    }
  }, [])

  log('returns', connectionStatus)
  return { connectionStatus }
}