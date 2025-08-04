import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up') // or "Login"
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')

  // Send OTP
  const sendOTPHandler = async () => {
    if (!email) return toast.error("Enter email")

    try {
      if (!email) {
        return toast.error("Email is required");
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        return toast.error("Please enter a valid email");
      }

      const { data } = await axios.post(`${backendUrl}/api/user/send-otp`, { email });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }

    } catch (error) {
      console.error("OTP send error:", error);
      toast.error(error.response?.data?.message || "OTP send failed");
    }

  }

  // Login or Signup
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error("All fields are required")
    }

    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          identifier: email.trim(),
          password: password.trim()
        })


        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        if (!name || !otp) return toast.error("All fields are required")
        if (password !== confirmPassword) return toast.error("Passwords do not match")

        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          otp,
          email
        })

        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
  }

  return (
    <div className='w-full min-h-[80vh] flex items-center justify-center p-4'>
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-md border p-4 rounded shadow space-y-4'
      >
        <h2 className='text-2xl font-bold text-center'>
          {state === 'Login' ? 'Login' : 'Sign Up'}
        </h2>

        {state === 'Sign Up' && (
          <div>
            <label>Name</label>
            <input
              type='text'
              className='w-full border rounded p-2 mt-1'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div>
          <label>Email</label>
            <input
              type='text'
              className='w-full border rounded p-2 mt-1'
              placeholder='Enter a valid Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        {state === 'Sign Up' && (
          <div>
            <label>OTP</label>
            <input
              type='text'
              className='w-full border rounded p-2 mt-1'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type='button'
              onClick={sendOTPHandler}
              className='bg-color2 text-black text-sm font-medium px-5 py-3 mt-3 rounded hover:bg-color3 transition-all duration-300'
            >
              Send OTP
            </button>
          </div>
        )}

        <div>
          <label>Password</label>
          <input
            type='password'
            className='w-full border rounded p-2 mt-1'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {state === 'Login' && (
          <div className="text-sm">
            <span
              className="text-color2 cursor-pointer hover:underline"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </span>
          </div>
        )}

        {state === 'Sign Up' && (
          <div>
            <label>Confirm Password</label>
            <input
              type='password'
              className='w-full border rounded p-2 mt-1'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}

        <button
          type='submit'
          className='bg-color2 text-black w-full text-sm font-medium py-3 rounded hover:bg-color3 transition-all duration-300'
        >
          {state === 'Login' ? 'Login' : 'Register'}
        </button>

        <p className='text-center text-sm'>
          {state === 'Login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className='text-color2 cursor-pointer hover:underline'
            onClick={() => {
              setState(state === 'Login' ? 'Sign Up' : 'Login')
              setName('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
              setOtp('')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            {state === 'Login' ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
