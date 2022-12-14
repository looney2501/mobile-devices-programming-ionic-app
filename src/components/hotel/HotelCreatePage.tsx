import React, { useCallback, useContext, useState } from 'react'
import {
  CheckboxChangeEventDetail,
  DatetimeChangeEventDetail,
  IonButton, IonButtons,
  IonCheckbox,
  IonContent, IonDatetime, IonDatetimeButton,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel, IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import moment from 'moment/moment'
import { getLogger } from '../../utils/loggerUtils'
import { InputChangeEventDetail } from '@ionic/core'
import { IonInputCustomEvent, IonDatetimeCustomEvent, IonCheckboxCustomEvent } from '@ionic/core/dist/types/components'
import HotelContext from '../../services/hotel/HotelContext'
import { RouteComponentProps } from 'react-router'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'

export interface NewHotelProps {
  name: string,
  capacity: number,
  isAvailable: boolean,
  dateRegistered?: Date
}

const log = getLogger('HotelCreatePage')

const HotelCreatePage: React.FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState<string>('')
  const [capacity, setCapacity] = useState<number>(0)
  const [dateRegistered, setDateRegistered] = useState<Date>(new Date())
  const [isAvailable, setAvailable] = useState<boolean>(false)
  const { connectionStatus } = useConnectionStatus()

  const { saveHotel } = useContext(HotelContext)

  const handleNameEdit = useCallback((e: IonInputCustomEvent<InputChangeEventDetail>) => {
    e.preventDefault()
    const newName = e.detail.value
    log('handleNameEdit newName = ' + newName)
    setName(newName || '')
  }, [])

  const handleCapacityEdit = useCallback((e: IonInputCustomEvent<InputChangeEventDetail>) => {
    e.preventDefault()
    const newCapacity = parseInt(e.detail.value || '')
    log('handleCapacityEdit newCapacity = ' + newCapacity)
    setCapacity(newCapacity)
  }, [])

  const handleDateRegisteredEdit = useCallback((e: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) => {
    e.preventDefault()
    const newDate = new Date(moment(e.detail.value).toDate())
    log('handleCapacityEdit newDate = ' + newDate)
    setDateRegistered(newDate)
  }, [])

  const handleSetAvailable = useCallback((e: IonCheckboxCustomEvent<CheckboxChangeEventDetail<any>>) => {
    e.preventDefault()
    const newAvailability = e.detail.checked
    log('handleSetAvailable newAvailability = ' + newAvailability)
    setAvailable(newAvailability)
  }, [])

  const clearInputs = useCallback(() => {
    setName('')
    setCapacity(0)
    setDateRegistered(new Date())
    setAvailable(false)
  }, [])

  const handleCancel = useCallback(() => {
    clearInputs()
    history.push('/hotels')
  }, [history, clearInputs])

  const handleSaveHotel = useCallback(() => {
    const newHotel: NewHotelProps = { name, capacity, dateRegistered, isAvailable }
    log(`handleSaveHotel newHotel = ${JSON.stringify(newHotel, null, 2)}`)
    saveHotel && saveHotel(newHotel).then(() => handleCancel())
  }, [capacity, dateRegistered, isAvailable, name])

  log('render')

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create new hotel</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              {connectionStatus?.connected ? 'Connected' : 'Not connected'}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Name:</IonLabel>
          <IonInput
            value={name}
            type="text"
            onIonChange={handleNameEdit}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Capacity:</IonLabel>
          <IonInput
            value={capacity}
            type="number"
            onIonChange={handleCapacityEdit}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Registration date:</IonLabel>
          <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
          <IonModal keepContentsMounted>
            <IonDatetime
              id="datetime"
              presentation="date"
              value={dateRegistered?.toISOString()}
              onIonChange={handleDateRegisteredEdit}
            />
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel>Available</IonLabel>
          <IonCheckbox
            checked={isAvailable}
            slot="start"
            onIonChange={handleSetAvailable}
          ></IonCheckbox>
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            expand="full"
            onClick={handleSaveHotel}
          >
            Save
          </IonButton>
          <IonButton
            expand="full"
            color="danger"
            onClick={handleCancel}
          >
            Cancel
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}

export default HotelCreatePage