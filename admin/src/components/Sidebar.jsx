import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

    return (
        <div className='min-h-screen bg-white border-r border-gray-500'>
            {
                aToken && <ul className='text-gray-500 mt-5'>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#97DFFF]' : ''}`} to={'/admin-dashboard'}>
                        <img className='mx-5.5 md:mx-0' src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#97DFFF]' : ''}`} to={'/all-appointments'}>
                        <img className='mx-5.5 md:mx-0' src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointment</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#97DFFF]' : ''}`} to={'/add-doctor'}>
                        <img className='mx-5.5 md:mx-0' src={assets.add_icon} alt="" />
                        <p className='hidden md:block'>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#97DFFF]' : ''}`} to={'/doctor-list'}>
                        <img className='mx-5.5 md:mx-0' src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Doctors List</p>
                    </NavLink>
                </ul>
            }

            {
                dToken && <ul className='text-gray-500 mt-5'>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#97DFFF]' : ''}`} to={'/doctor-dashboard'}>
                        <img className='mx-5.5 md:mx-0' src={assets.home_icon} alt="" />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#97DFFF]' : ''}`} to={'/doctor-appointments'}>
                        <img className='mx-5.5 md:mx-0' src={assets.appointment_icon} alt="" />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#97DFFF]' : ''}`} to={'/doctor-profile'}>
                        <img className='mx-5.5 md:mx-0' src={assets.people_icon} alt="" />
                        <p className='hidden md:block'>Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar