import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const [state, setState] = useState('Admin')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { setAToken, backendUrl } = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)
    
    const navigate = useNavigate()

    
    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

            if (state === 'Admin') {

                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken',data.token)  //save the token in the local storage..
                    setAToken(data.token)
                    navigate('/admin-dashboard')
                } else {
                    toast.error(data.message)
                }
            } else {
                
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken',data.token)  //save the token in the local storage..
                    setDToken(data.token)
                    navigate('/doctor-dashboard')
                    // console.log(data.token);
                    
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            
        }
    }
    



    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto text-[#05E0D5]'><span className='text-[#5E5E5E]'>{state}</span> Login</p>
                <div className='w-full'>
                    <p>Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button className='bg-[#05E0D5] cursor-pointer w-full text-black font-medium px-10 py-3 rounded-lg hover:bg-[#97DFFF] transition-all duration-300 mt-2'>Login </button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login ? <span onClick={()=>setState('Doctor')} className='text-[#05E0D5] underline cursor-pointer'>Click here</span></p>
                        : <p>Admin Login ? <span onClick={()=>setState('Admin')} className='text-[#05E0D5] underline cursor-pointer'>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login