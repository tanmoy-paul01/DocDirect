
export const getDoctorWelcomeEmail = (doctor, plainPassword) => {
    const { name, email, speciality, degree, experience, about, fees, address } = doctor;

    return {
        subject: `Welcome Dr. ${name} - Your Login Details`,
        html: `
            <h2>Welcome to DocDirect, Dr. ${name}</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Password:</strong> ${plainPassword}</p>
            <p><strong>Speciality:</strong> ${speciality}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <p><strong>Fees:</strong> ₹${fees}</p>
            <p><strong>Degree:</strong> ${degree}</p>
            <p><strong>About:</strong> ${about}</p>
            <p><strong>Address:</strong> ${address.line1}, ${address.line2}</p>
            <p><strong>Date of Joining:</strong> ${new Date().toLocaleDateString()}</p>
            <hr />
            <p>Please use the following credentials to access your Doctor Portal. For security reasons, we do not recommend changing your password after your first login. Kindly save these credentials securely for future use.
                <br><br><br>Thank you,
                <br>Admin Team
            </p>
        `
    };
};
