import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String },
    otp_expiry: { type: Date },
});

const otpModel = mongoose.models.otp || mongoose.model('otp', otpSchema);
export default otpModel;
