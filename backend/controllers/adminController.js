import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getDoctorWelcomeEmail } from '../utils/doctorEmailTemplate.js';

dotenv.config();


//API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const parsedAddress = JSON.parse(address);

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // Prepare and send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const { subject, html } = getDoctorWelcomeEmail({ ...doctorData, address: parsedAddress }, password);

        const mailOptions = {
            from: `"Admin Portal-DocDirect" <${process.env.EMAIL}>`,
            to: email,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Doctor Added and Email Sent" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



//API for admin login
const loginAdmin = async (req, res) => {
    try {
        
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({success:true,token})

        } else {
            res.json({success:false,message:"Invalid credentials"})
        }
            

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//api to get all doctors list for admin panel..
const allDoctors = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API for get all appointment list
const appointmentsAdmin = async (req, res) => {
    try {
        
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API for appointment cancelled
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        
        const appointmentData = await appointmentModel.findById(appointmentId)

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


//API to get dashboard data for admin file
const adminDashboard = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
            
        }
        res.json({success:true, dashData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}