import express from 'express'
import { sendOTP, registerUser, loginUser, sendForgotOTP, resetPassword, getProfile, updateProfile, bookAppointment, getMyAppointments, cancelAppointment} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/send-otp', sendOTP)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/send-forgot-otp', sendForgotOTP)
userRouter.post('/reset-password', resetPassword)



userRouter.get('/get-profile',authUser,getProfile)
userRouter.get('/my-appointment', authUser, getMyAppointments);

userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)





export default userRouter