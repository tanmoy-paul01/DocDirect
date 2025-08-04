import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)
    
    const navigate = useNavigate()

    const logout = () => {
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }

        if (dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }

        navigate('/')         // Redirect after logout
        window.location.reload() // Optional: force refresh to reset state
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <div className='flex items-center cursor-pointer'>
                    <img className='w-11 ' src={assets.admin_logo} alt="" />
                    <p className='pl-1.5 text-[#05E0D5] text-xl font-bold'>DocDirect</p>
                </div>
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 cursor-pointer'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-[#05E0D5] cursor-pointer text-black font-medium px-5 py-2 rounded-lg hover:bg-[#97DFFF] transition-all duration-300 mt-2'>Logout</button>
        </div>
    )
}

export default Navbar