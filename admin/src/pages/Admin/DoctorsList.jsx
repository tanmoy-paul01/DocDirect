import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

    const { doctors, aToken, getAllDoctors, changeAvailablity } = useContext(AdminContext)
    
    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    },[aToken])

    return (
        <div className='m-5 mx-h-[90vh] overflow-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {
                    doctors.map((item,index) => (
                        <div className='border border-gray-300 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                            <img className='bg-[#E2E0E0]' src={item.image} alt="" />
                            <div className='p-4'>
                                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                                <p className='text-zinc-60 text-sm'>{item.speciality}</p>
                                <div className='mt-2 flex items-center gap-1 text-sm'>
                                    <input onChange={()=>changeAvailablity(item._id)} className='cursor-pointer' type="checkbox" checked={item.available} />
                                    <p>Available</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorsList