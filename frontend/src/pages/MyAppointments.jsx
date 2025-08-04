import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);


  const fetchAppointments = async () => {
    try {
      const res = await fetch(backendUrl + '/api/user/my-appointment', {
        headers: { token }
      });

      const data = await res.json();
      if (data.success) setAppointments(data.appointments);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const isExpired = (slotDate, slotTime) => {
    try {
      const [day, month, year] = slotDate.split('_');
      
      // Constructing a valid datetime string for Date constructor
      const formattedDateTime = `${year}-${month}-${day}T${slotTime}:00`; // ISO format

      const appointmentDate = new Date(formattedDateTime);
      const currentDate = new Date();

      return currentDate > appointmentDate;
    } catch (error) {
      console.error("Error in checking expiration:", error);
      return false; // fallback if invalid date
    }
  };



  useEffect(() => {
    fetchAppointments();
  }, [backendUrl, token]);


  const cancelAppointment = async (appointmentId) => {

    try {
      
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        fetchAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
        toast.error(error.message)
    }
  }

  return (
    <div>
      <p className='pb-3 mt-10 text-2xl font-medium text-zinc-700'>
        My <span className='text-color2'>appointments</span>
      </p>
      <div>
        {Array.isArray(appointments) && appointments.length === 0 && (
          <p>No appointments found.</p>
        )}
        {Array.isArray(appointments) && appointments.reverse().map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 mt-2 py-2 border border-color3 rounded-lg' key={index}>
            <div>
              <img className='w-32 bg-color5' src={item.docData?.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData?.name}</p>
              <p>{item.docData?.speciality}</p>
              <p className='text-neutral-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData?.address?.line1}</p>
              <p className='text-xs'>{item.docData?.address?.line2}</p>
              <p className='text-color1 text-xs mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>
                {item.slotDate} | {item.slotTime}
              </p>
            </div>
            <div className='flex flex-col gap-2 justify-center mr-2'>
              {item.payment && !item.cancelled && !item.isCompleted && (<button className='bg-color2 text-gray-900 font-medium px-5 py-2 rounded-lg hover:bg-color3 transition-all duration-300'>Paid</button>)}
              {!item.payment && !item.cancelled && !item.isCompleted && !isExpired(item.slotDate, item.slotTime) && (<button className='bg-color2 text-gray-900 font-medium px-5 py-2 rounded-lg hover:bg-color3 transition-all duration-300'>Pay Online</button>)}
              {!item.cancelled && !item.isCompleted && !isExpired(item.slotDate, item.slotTime) && (<button onClick={()=>cancelAppointment(item._id)} className='bg-color2 text-gray-900 font-medium px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel appointment</button>)}
              {item.cancelled && !item.isCompleted && <p className=' text-red-500 font-medium px-5 py-2'>Appointment Cancelled</p>}
              {isExpired(item.slotDate, item.slotTime) && !item.cancelled && !item.isCompleted && (<p className='text-red-500 font-medium px-5 py-2'>Appointment time is over</p>)}
              {item.isCompleted && <p className='text-green-500 font-medium px-5 py-2'>Completed</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;