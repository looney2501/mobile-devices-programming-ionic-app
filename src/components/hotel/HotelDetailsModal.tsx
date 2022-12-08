import React, { useState } from 'react'
import { HotelProps } from '../../reducers/reducer'
import { createAnimation, IonButton, IonModal } from '@ionic/react'
import moment from 'moment'
import MyMap from '../map/MyMap'

interface HotelDetailsModalProps {
  hotelProps: HotelProps,
  showModal: boolean,
  setShowModal: Function
}

const HotelDetailsModal: React.FC<HotelDetailsModalProps> = ({ hotelProps, showModal, setShowModal }) => {
  const { latitude, longitude } = hotelProps.location


  const enterAnimation = (baseEl: any) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0', '1');

    const wrapperAnimation = createAnimation()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' }
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  }

  const leaveAnimation = (baseEl: any) => {
    return enterAnimation(baseEl).direction('reverse');
  }

  return (
    <IonModal isOpen={showModal} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
      <div style={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ margin: "0 10px" }}>
          {!hotelProps._id && (
            <p style={{ backgroundColor: "yellow", color: "black" }}>!!!Locally saved only</p>
          )}
          <p>{hotelProps.name}</p>
          <p>{`Active since: ${moment(hotelProps.dateRegistered).toString()}`}</p>
          <p>Capacity: {hotelProps.capacity}</p>
          <p>{hotelProps.isAvailable ? 'Available' : 'Unavailable'}</p>
          <MyMap
            lat={latitude}
            lng={longitude}
            editable={false}
          />
        </div>
        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
      </div>
    </IonModal>
  )
}

export default HotelDetailsModal