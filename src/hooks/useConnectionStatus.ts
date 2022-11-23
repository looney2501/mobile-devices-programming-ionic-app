import { Network, ConnectionStatusChangeListener, ConnectionStatus } from '@capacitor/network'
import { useEffect, useState } from 'react'
import { getLogger } from '../utils/loggerUtils'

const log = getLogger('useNetwork')

export const useConnectionStatus = (handleConnectionChanged?: ConnectionStatusChangeListener) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>()

  const handleConnectionChangedWrapper = (status: ConnectionStatus) => {
    log('connection status changed to ', Network.getStatus())
    handleConnectionChanged?.(status)
    setConnectionStatus(status)
  }

  useEffect(() => {
    const handler = Network.addListener('networkStatusChange', handleConnectionChangedWrapper)

    Network.getStatus().then(status => setConnectionStatus(status))

    return () => {
      handler.remove()
    }
  }, [])

  log('returns', connectionStatus)
  return { connectionStatus }
}