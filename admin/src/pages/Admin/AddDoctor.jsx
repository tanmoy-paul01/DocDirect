import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import {useState} from 'react'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const {backendUrl, aToken} = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image not selected')
            }

            const formData = new FormData()

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
            
            //console log formdata
            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`)
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {headers:{aToken}})
            
            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
                setExperience('1 Year')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }
    

    return (
        <div className="p-5 md:p-10 w-full">
            <form onSubmit={onSubmitHandler} className="m-5 w-full">
                <p className="text-2xl font-semibold mb-6 text-gray-800">Add Doctor</p>

                <div className="flex flex-col items-start gap-8 bg-white shadow-lg p-8 rounded max-w-5xl">
                    {/* Upload doctor picture */}
                    <div className="flex flex-col items-center gap-2">
                        <label htmlFor="doc-img" className="cursor-pointer">
                            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" className="w-24 h-24 rounded-full object-cover border border-gray-300" />
                        </label>
                        <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
                        <p className="text-center text-gray-600">Upload doctor <br /> picture</p>
                    </div>

                    {/* Input fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Doctor name</p>
                                <input onChange={(e) => setName(e.target.value)} value={name} className="w-full border rounded px-3 py-2" type="text" placeholder="Name" required />
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Doctor Email</p>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full border rounded px-3 py-2" type="email" placeholder="Email" required />
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Doctor Password</p>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full border rounded px-3 py-2" type="password" placeholder="Password" required />
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Experience</p>
                                <select  onChange={(e) => setExperience(e.target.value)} value={experience} className="w-full border rounded px-3 py-2 cursor-pointer">
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Fees</p>
                                <input onChange={(e) => setFees(e.target.value)} value={fees} className="w-full border rounded px-3 py-2" type="number" placeholder="Your Fees" required />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Speciality</p>
                                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="w-full border rounded px-3 py-2 cursor-pointer">
                                    <option value="General physician">General physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Education</p>
                                <input onChange={(e) => setDegree(e.target.value)} value={degree} className="w-full border rounded px-3 py-2" type="text" placeholder="Education" required />
                            </div>
                            <div>
                                <p className="text-sm text-gray-700 mb-1">Address</p>
                                <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="w-full border rounded px-3 py-2 mb-2" type="text" placeholder="Address 1" required />
                                <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="w-full border rounded px-3 py-2" type="text" placeholder="Address 2" required />
                            </div>
                        </div>
                        
                    </div>
                        <div className="mt-6 w-full">
                        <p className="text-sm text-gray-700 mb-1">About Doctor</p>
                        <textarea
                            onChange={(e) => setAbout(e.target.value)} value={about}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Write about doctor"
                            rows={5}
                            required
                        />
                    </div>
                </div>

                {/* About Doctor */}
                

                {/* Submit Button */}
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className='bg-[#05E0D5] cursor-pointer text-black font-medium px-8 py-3 rounded-lg hover:bg-[#97DFFF] transition-all duration-300 mt-2'
                    >
                        Add doctor
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
