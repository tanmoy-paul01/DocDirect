import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ForgotPassword = () => {
    const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP + new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const sendOtp = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/send-forgot-otp`, { email });
            
            if (data.success) {
                toast.success(data.message);
                setStep(2);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    const resetPassword = async () => {
        try {
        const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, {
            email,
            otp,
            newPassword
        });
        if (data.success) {
            toast.success(data.message);
            navigate('/login');
        } else {
            toast.error(data.message);
        }
        } catch (error) {
        toast.error(error.message);
        }
    };

    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-4 border rounded shadow space-y-4">
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

            {step === 1 && (
            <>
                <label>Email</label>
                <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button
                onClick={sendOtp}
                className="bg-color2 text-black w-full py-2 rounded hover:bg-color3"
                >
                Send OTP
                </button>
            </>
            )}

            {step === 2 && (
            <>
                <label>OTP</label>
                <input
                type="text"
                className="w-full border rounded p-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                />
                <label>New Password</label>
                <input
                type="password"
                className="w-full border rounded p-2"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                onClick={resetPassword}
                className="bg-color2 text-black w-full py-2 rounded hover:bg-color3"
                >
                Reset Password
                </button>
            </>
            )}
        </div>
        </div>
    );
};

export default ForgotPassword;
