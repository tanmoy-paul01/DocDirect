import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up') // 'Login' or 'Sign Up'
  const [step, setStep] = useState(1) // for signup steps
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')

  const sendOTPHandler = async () => {
    if (!email) return toast.error("Email is required")
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email")

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/send-otp`, { email })
      if (data.success) {
        toast.success(data.message)
        setStep(2)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("OTP send error:", error)
      toast.error(error.response?.data?.message || "OTP send failed")
    }
  }

const verifyOTPHandler = async () => {
  if (!otp) return toast.error("Enter the OTP");

  try {
    // ✅ Place this log here
    console.log("Verifying OTP:", backendUrl + '/api/user/verify-otp');
    console.log("Sending Payload:", { email: email.trim(), otp: otp.trim() });

    const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, {
      email: email.trim(),
      otp: otp.trim()
    });

    if (data.success) {
      toast.success("OTP Verified");
      setStep(3);
    } else {
      toast.error(data.message || "Invalid OTP");
    }
  } catch (error) {
    console.error("OTP verify error:", error);
    toast.error("OTP verification failed");
  }
};



  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (state === 'Login') {
      if (!email || !password) return toast.error("All fields are required")

      try {
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
      } catch (error) {
        toast.error("Login failed")
        console.error(error)
      }

    } else {
      // Final step: Register user
      if (!password || !confirmPassword) return toast.error("All fields are required")
      if (password !== confirmPassword) return toast.error("Passwords do not match")

      try {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
          otp
        })

        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('token', data.token)
          setToken(data.token)
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        console.error(error)
        toast.error("Signup failed")
      }
    }
  }

  return (
  <div className='w-full min-h-[80vh] flex items-center justify-center p-4'>
    <form onSubmit={onSubmitHandler} className='w-full max-w-md border p-4 rounded shadow space-y-4'>

      <h2 className='text-2xl font-bold text-center'>
        {state === 'Login' ? 'Login' : `Sign Up - Step ${step}`}
      </h2>

      {/* Login Form */}
      {state === 'Login' && (
        <>
          <div>
            <label>Email</label>
            <input
              type='text'
              className='w-full border rounded p-2 mt-1'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
          <div className="text-sm">
            <span
              className="text-color2 cursor-pointer hover:underline"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </span>
          </div>
          <button
            type='submit'
            className='bg-color2 text-black w-full text-sm font-medium py-3 rounded hover:bg-color3 transition-all duration-300'
          >
            Login
          </button>
        </>
      )}

      {/* Sign Up Step 1 */}
      {state === 'Sign Up' && step === 1 && (
        <>
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
          <div>
            <label>Email</label>
            <input
              type='text'
              className='w-full border rounded p-2 mt-1'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type='button'
            onClick={sendOTPHandler}
            className='bg-color2 text-black text-sm font-medium px-5 py-3 mt-3 rounded hover:bg-color3 transition-all duration-300 w-full'
          >
            Send OTP
          </button>
        </>
      )}

      {/* Sign Up Step 2 */}
      {state === 'Sign Up' && step === 2 && (
        <>
          <div>
            <label>Enter OTP</label>
            <input
              type='text'
              className='w-full border rounded p-2 mt-1'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            type='button'
            onClick={verifyOTPHandler}
            className='bg-color2 text-black text-sm font-medium px-5 py-3 mt-3 rounded hover:bg-color3 transition-all duration-300 w-full'
          >
            Verify OTP
          </button>
        </>
      )}

      {/* Sign Up Step 3 */}
      {state === 'Sign Up' && step === 3 && (
        <>
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
          <button
            type='submit'
            className='bg-color2 text-black w-full text-sm font-medium py-3 rounded hover:bg-color3 transition-all duration-300'
          >
            Register
          </button>
        </>
      )}

      <p className='text-center text-sm'>
        {state === 'Login' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span
          className='text-color2 cursor-pointer hover:underline'
          onClick={() => {
            setState(state === 'Login' ? 'Sign Up' : 'Login')
            setStep(1)
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
