import React, { useCallback, useContext } from 'react'
import { IonCheckbox, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonModal } from '@ionic/react'
import { getLogger } from '../utils/loggerUtils'
import moment from 'moment/moment'

export interface NewHotelProps {
  name?: string,
  capacity?: number,
  isAvailable?: boolean,
  dateRegistered?: Date
}

export interface HotelCreateFormProps {
  newHotel: NewHotelProps,
  setNewHotel: Function
}

const log = getLogger('HotelCreateForm')

const HotelCreateForm: React.FC<HotelCreateFormProps> = ({ newHotel, setNewHotel }) => {
  const { name, capacity, dateRegistered, isAvailable } = newHotel

  const setName = useCallback((name: string) => {
    log(`setName name = ${name}`)
    setNewHotel({
      ...newHotel,
      name: name
    })
  }, [newHotel])

  const setCapacity = useCallback((capacity: number) => {
    log(`setCapacity capacity = ${capacity}`)
    setNewHotel({
      ...newHotel,
      capacity: capacity
    })
  }, [newHotel])

  const setRegisteredDate = useCallback((dateRegistered: Date) => {
    log(`setRegisteredDate dateRegistered = ${dateRegistered}`)
    setNewHotel({
      ...newHotel,
      dateRegistered: dateRegistered
    })
  }, [newHotel])

  const setIsAvailable = useCallback((isAvailable: boolean) => {
    log(`setIsAvailable isAvailable = ${isAvailable}`)
    setNewHotel({
      ...newHotel,
      isAvailable: isAvailable
    })
  }, [newHotel])

  return (
    <>
      <IonItem>
        <IonLabel>Name:</IonLabel>
        <IonInput
          value={name}
          type="text"
          onIonChange={e => setName(e.detail.value || '')}
        />
      </IonItem>
      <IonItem>
        <IonLabel>Capacity:</IonLabel>
        <IonInput
          value={capacity}
          type="number"
          onIonChange={e => setCapacity(parseInt(e.detail.value || '') || 0)}
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
            onIonChange={e => {setRegisteredDate(moment(e.detail.value).toDate())}}
          />
        </IonModal>
      </IonItem>
      <IonItem>
        <IonLabel>Available</IonLabel>
        <IonCheckbox
          checked={isAvailable}
          slot="start"
          onIonChange={e => setIsAvailable(e.detail.checked)}
        ></IonCheckbox>
      </IonItem>
    </>
  )
}

export default HotelCreateForm