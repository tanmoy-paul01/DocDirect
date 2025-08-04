import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const {token,setToken,userData} = useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
        navigate('/')
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b-gray-400'>
            <div onClick={()=>navigate('/')} className='flex items-center cursor-pointer'>
                <img className='w-11 ' src={assets.logo} alt="" />
                <p className='pl-1.5 text-color2 text-xl font-bold'>DocDirect</p>
            </div>
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <p className='py-1 cursor-pointer hover:text-color2 translation-all duration-200'>HOME</p>
                    <hr className='border-none outline-none h-0.5 bg-color2 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <p className='py-1 cursor-pointer hover:text-color2 translation-all duration-200'>ALL DOCTORS</p>
                    <hr className='border-none outline-none h-0.5 bg-color2 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <p className='py-1 cursor-pointer hover:text-color2 translation-all duration-200'>ABOUT</p>
                    <hr className='border-none outline-none h-0.5 bg-color2 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <p className='py-1 cursor-pointer hover:text-color2 translation-all duration-200'>CONTACT</p>
                    <hr className='border-none outline-none h-0.5 bg-color2 w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-11 rounded-full' src={userData.image} alt="" />
                            {/* <img className='w-2.5' src={assets.dropdown_icon} alt="" /> */}
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-color4 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={()=>navigate('my-profile')} className='hover:text-color1 cursor-pointer'>My Profile</p>
                                    <p onClick={()=>navigate('my-appointments')} className='hover:text-color1 cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-color1 cursor-pointer'>Logout</p>
                                </div>
                            </div>
                    </div>
                    :<button onClick={()=>navigate('/login')} className='bg-color2 text-black px-5 py-3 rounded-full font-medium hover:bg-color3 transition-all duration-300'>Create account</button>
                }
                <img onClick={()=> setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />
                
                {/* ............Mobile menu............ */}
                <div className={`${showMenu ? 'fixed w-50' : 'h-0 w-0'} rounded md:hidden top-20 right-4 sm:right-16 z-20 overflow-hidden bg-color4 transition-all`}>
                    <div className='flex items-center justify-end p-1'>
                        <img className='w-6 cursor-pointer md:hidden' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='min-w-48 rounded flex flex-col gap-3 p-4 md:hidden font-medium text-base text-gray-700'>
                        <NavLink to='/'><p className='cursor-pointer hover:text-color2 translation-all duration-200'>HOME</p></NavLink>
                        <NavLink to='/doctors'><p className='cursor-pointer hover:text-color2 translation-all duration-200'>ALL DOCTORS</p></NavLink>
                        <NavLink to='/about'><p className='cursor-pointer hover:text-color2 translation-all duration-200'>ABOUT</p></NavLink>
                        <NavLink to='/contact'><p className='cursor-pointer hover:text-color2 translation-all duration-200'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar