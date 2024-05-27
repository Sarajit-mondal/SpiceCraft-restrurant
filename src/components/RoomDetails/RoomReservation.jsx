import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'
import { DateRange } from 'react-date-range'
import { addDays, differenceInBusinessDays } from 'date-fns'
import {  DateRangePicker } from 'react-date-range'
import { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

const RoomReservation = ({ room }) => {
   //date range pikker

   const [state, setState] = useState([
    {
      startDate: new Date(room.startDate),
      endDate:  new Date(room.endDate),
      key: 'selection'
    }
  ]);
 
  console.log(room.startDate,room.endDate)

  const totaldays =parseInt(differenceInCalendarDays(
    new Date(room.endDate),
    new Date(room.startDate)
   
  ))
  console.log(totaldays)
  
  return (
    <div className='rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white'>
      <div className='flex items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {room?.price}</div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <div >
          {/* calender */}
          <DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
/>
        </div>
      <hr />
      <div className='p-4'>
        <Button label={'Reserve'} />
      </div>
      <hr />
      <div className='p-4 flex items-center justify-between font-semibold text-lg'>
        <div>Total</div>
        <div>${ parseInt(room?.price) * totaldays}</div>
      </div>
    </div>
  )
}

RoomReservation.propTypes = {
  room: PropTypes.object,
}

export default RoomReservation
