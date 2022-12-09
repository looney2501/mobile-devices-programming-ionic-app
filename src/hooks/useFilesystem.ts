import { Directory, Filesystem } from '@capacitor/filesystem'
import { useCallback } from 'react'
import { getLogger } from '../utils/loggerUtils'

const log = getLogger('userFileSystem')

export function useFilesystem() {
  const writeFile = useCallback<(path: string, data: string) => Promise<any>>(
    (path, data) => {
      log('writing to file = ', path)
      return Filesystem.writeFile({
        path,
        data,
        directory: Directory.Data,
      })
    }, [])

  return {
    writeFile,
  }
}
