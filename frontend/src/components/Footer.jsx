import React from 'react'
import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'

const Footer = () => {
        const navigate = useNavigate();


    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* .........Left Section......... */}
                <div>
                    <div onClick={() => { navigate('/');  scrollTo(0,0)}} className='flex mb-5 items-center cursor-pointer'>
                        <img className='w-11' src={assets.logo} alt="" />
                        <p className='pl-1.5 text-color2 text-xl font-bold'>DocDirect</p>
                    </div>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>DocDirect – Your trusted platform for easy doctor appointments and health record management. We connect patients with healthcare providers to ensure a smooth and efficient healthcare experience.</p>
                </div>

                {/* .........Middle Section......... */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                        <li onClick={() => { navigate('/');  scrollTo(0,0)}} className='hover:text-color2 hover:translate-x-[10px] transition-all duration-500'>Home</li>
                        <li onClick={() => { navigate('/about');  scrollTo(0,0)}} className='hover:text-color2 hover:translate-x-[10px] transition-all duration-500'>About us</li>
                        <li onClick={() => { navigate('/contact');  scrollTo(0,0)}} className='hover:text-color2 hover:translate-x-[10px] transition-all duration-500'>Contact us</li>
                        <li className='hover:text-color2 hover:translate-x-[10px] transition-all duration-500'>Privacy policy</li>
                    </ul>
                </div>

                {/* .........Right Section......... */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600 cursor-pointer'>
                        <li>+91 7557882856</li>
                        <li>tnmypl2003@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* ............Copyright Text.............. */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright © 2025 Tanmoy - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer