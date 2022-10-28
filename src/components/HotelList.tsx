import React from 'react'
import HotelListItem from './HotelListItem'

const HotelList: React.FC = () => {
  return (
    <>
      <HotelListItem name={'Hotel Steaua'} capacity={140} isAvailable={true} dateRegistered={new Date('24.10.2020')} />
      <HotelListItem name={'Hotel Margareta'} capacity={200} isAvailable={false} dateRegistered={new Date('24.10.2020')} />
    </>

  )
}

export default HotelList