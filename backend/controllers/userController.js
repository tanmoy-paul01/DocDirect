import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'
import otpModel from '../models/otpModel.js'
import otpGenerator from 'otp-generator'
import { sendEmailOTP } from '../utils/sendEmailOTP.js'



//API to send otp
const sendOTP = async (req, res) => {
    try {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.json({ success: false, message: "User already exists" });
    }

    //create otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);
        

    if (email) {
        await sendEmailOTP(email, otp) // ⬅️ Send OTP to email via SMS
    }
    

    // Store OTP in otpModel instead of userModel
    await otpModel.findOneAndUpdate(
        { email },
        { otp, otp_expiry },
        { upsert: true, new: true }
    );


    res.json({ success: true, message: `OTP sent to ${email}` });
    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    }
};


//API to verify the OTP
// API to verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
        return res.json({ success: false, message: "Email and OTP required" });
        }

        const otpRecord = await otpModel.findOne({ email });

        if (!otpRecord) {
        return res.json({ success: false, message: "No OTP found" });
        }

        // Normalize both OTPs to string and trim
        const dbOtp = otpRecord.otp?.toString().trim();
        const enteredOtp = otp.toString().trim();

        if (dbOtp !== enteredOtp) {
        return res.json({ success: false, message: "Invalid OTP" });
        }

        if (new Date(otpRecord.otp_expiry) < new Date()) {
        return res.json({ success: false, message: "OTP expired" });
        }

        res.json({ success: true, message: "OTP verified" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};





// API to register user 
const registerUser = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body

        // Check OTP match
        const otpRecord = await otpModel.findOne({ email });

        if (!otpRecord) {
        return res.json({ success: false, message: "OTP not found" });
        }

        if (String(otpRecord.otp).trim() !== String(otp).trim()) {
        return res.json({ success: false, message: "Incorrect OTP" });
        }

        if (new Date(otpRecord.otp_expiry) < new Date()) {
        return res.json({ success: false, message: "OTP expired" });
        }



        // Optional: Delete used OTP
        await otpModel.deleteOne({ _id: otpRecord._id });




        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details" });
        }


        if (email && !validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short" });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



//API for user login
const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.json({ success: false, message: "Missing credentials" });
        }

        let user;

        if ( !/^\d{10}$/.test(identifier)) {
            user = await userModel.findOne({ email: identifier });
        }
        // else {
        //     user = await userModel.findOne({ phone: identifier });
        // }

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// API to send OTP for forgot password
const sendForgotOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.json({ success: false, message: "Email is required" });

        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
        return res.json({ success: false, message: "User does not exist" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otp_expiry = new Date(Date.now() + 10 * 60 * 1000);

        await sendEmailOTP(email, otp); // send OTP

        await otpModel.findOneAndUpdate(
        { email },
        { otp, otp_expiry },
        { upsert: true, new: true }
        );

        res.json({ success: true, message: `OTP sent to ${email}` });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



//Reset password...
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Missing data" });
        }

        const otpRecord = await otpModel.findOne({ email });

        if ( !otpRecord || String(otpRecord.otp) !== String(otp) || new Date(otpRecord.otp_expiry) < new Date()) {
            return res.json({ success: false, message: "Invalid or expired OTP" });
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await userModel.findOneAndUpdate(
        { email },
        { password: hashedPassword }
        );

        await otpModel.deleteOne({ _id: otpRecord._id });

        if (!user) {
        return res.json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, message: "Password reset successful" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};




// api to get user profile data
const getProfile = async (req, res) => {
    try {
        const { _id:userId } = req.user;
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//api to upgrade user profile
const updateProfile = async (req, res) => {
    try {
        // const { userId, name, phone, address, dob, gender } = req.body;
        const { name, phone, email, address, dob, gender } = req.body;
        const { _id: userId } = req.user;
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({success:false,message:"Data Missing"})
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, email, address: JSON.parse(address), dob, gender })
        
        if (imageFile) {

            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({ success: true, message: "Profile Updated" })
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        // const { userId ,docId, slotDate, slotTime } = req.body
        const { docId, slotDate, slotTime } = req.body;
        const { _id: userId } = req.user;
        
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({success:false, message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked

        //Checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false, message:"Slot not available"})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select("-password") //
        if (!userData) {
        return res.json({ success: false, message: "User not found" });
        }

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        //save the data in database
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //Save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        
        res.json({ success: true, message: "Appointment Booked" })
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to book my appointment
const getMyAppointments = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { appointmentId } = req.body;
        
        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false, message:'Unauthorized action'})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        
        //Releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData
        
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        //
        if (slots_booked[slotDate] && Array.isArray(slots_booked[slotDate])) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

            // Optional: clean up empty arrays
            if (slots_booked[slotDate].length === 0) {
                delete slots_booked[slotDate];
            }

            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        }
        //

        res.json({success:true, message:'Appointment cancel'})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// const razorpayInstance = new razorpay({
//     key_id: '',
//     key_secret:''
// })

//Api to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
    
}


export {
    sendOTP,
    registerUser,
    loginUser,
    verifyOTP,
    sendForgotOTP,
    resetPassword,
    getProfile,
    updateProfile,
    bookAppointment,
    getMyAppointments,
    cancelAppointment
}