import { IonButton } from '@ionic/react'
import React, { useCallback, useContext } from 'react'
import { HotelCreateFormProps } from './HotelCreateForm'
import { useHistory } from 'react-router'
import HotelContext from '../services/HotelContext'

const HotelCreateFooter: React.FC<HotelCreateFormProps> = ({ newHotel, setNewHotel }) => {
  const history = useHistory()
  const { saveHotel } = useContext(HotelContext)
  const handleSaveHotel = useCallback(() => {
    saveHotel && saveHotel(newHotel).then(() => {
      history.push('/hotels')
      setNewHotel({})
    })
  }, [newHotel, saveHotel])

  return (
    <>
      <IonButton
        expand="full"
        onClick={handleSaveHotel}
      >
        Save
      </IonButton>
      <IonButton
        expand="full"
        color="danger"
        onClick={() => {
          setNewHotel({})
          history.push('/hotels')
        }}
      >
        Cancel
      </IonButton>
    </>
  )
}

export default HotelCreateFooter