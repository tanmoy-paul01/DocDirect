
# 🚀 DocDirect

**DocDirect** is a doctor-patient appointment booking system built with the MERN stack and Tailwind CSS. It simplifies scheduling by offering secure authentication, image uploads, and email notifications.

---

## 🔗 Live Demo

Access the live deployed version here: **[DocDirect Demo](https://docdirect-frontend.onrender.com)**.

*Note: The frontend is live—ensure the backend API is accessible (deployed or local) for full functionality.*

---

## 🚀 Features

- Role-based access (doctor vs patient)
- Secure login with JWT, password hashing via bcrypt
- Profile image uploads (via Cloudinary)
- Email notifications (via Nodemailer)
- Responsive UI with React + Tailwind
- RESTful API backend powered by Express.js and MongoDB

---

## Tech Stack

- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Auth & Security**: JWT, bcrypt  
- **File Storage**: Cloudinary  
- **Email**: Nodemailer  
- **Deployment**: Render (frontend), [Your backend deployment]

---

## 📂 File Structure

The project follows a clean and modular MERN structure:

```
DocDirect/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── mongodb.js
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── doctorController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── authAdmin.js
│   │   ├── authDoctor.js
│   │   ├── authUser.js
│   │   └── multer.js
│   ├── models/
│   │   ├── appointmentModel.js
│   │   ├── doctorModel.js
│   │   ├── otpModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── adminRoute.js
│   │   ├── doctorRoute.js
│   │   └── userRoute.js
│   ├── utils/
│   │   ├── doctorEmailTemplate.js
│   │   └── sendEmailOTP.js
│   ├── node_modules/
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Banner.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RelatedDoctors.jsx
│   │   │   ├── SpecialityMenu.jsx
│   │   │   └── TopDoctors.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Appointment.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   └── MyProfile.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── node_modules/
│   └── package.json
│
├── admin/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context/
│   │   │   ├── AdminContext.jsx
│   │   │   ├── AppContext.jsx
│   │   │   └── DoctorContext.jsx
│   │   ├── pages/
│   │   │   ├── Admin/
│   │   │   │   ├── AddDoctor.jsx
│   │   │   │   ├── AllAppointment.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── DoctorsList.jsx
│   │   │   ├── Doctor/
│   │   │   │   ├── DoctorAppointment.jsx
│   │   │   │   ├── DoctorDashboard.jsx
│   │   │   │   └── DoctorProfile.jsx
│   │   │   └── Login.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── node_modules/
│   └── package.json
│
└── README.md

```

---

## 🌐 Deployment

- Deployed on **Render**
- Live URL: `https://docdirect-frontend.onrender.com`

---

## 🚀 Getting Started

### 🛠️ Backend Setup

```bash
cd backend
npm install
```
Create a `.env` file with:

```env
MONGODB_URI =
CLOUDINARY_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_SECRET_KEY =
EMAIL =
EMAIL_PASSWORD =
ADMIN_EMAIL =
ADMIN_PASSWORD =
JWT_SECRET = 
```
Run:
```bash
npm start
```

### 🛠️ Frontend Setup

```bash
cd ../frontend
npm install
```

Run:
```bash
npm start
```

---

## 🔗 API Endpoints

| Route                | Method | Description                        |
|---------------------|--------|------------------------------------|
| `/api/auth/register` | POST   | Register a new user                |
| `/api/auth/login`    | POST   | Authenticate and obtain JWT        |
| `/api/users/me`      | GET    | Get current logged-in user profile |
| `/api/appointments`  | GET/POST | List or book appointments        |

---

## 🤝 Contributing

Contributions are welcome!

---

## 📄 License

This project is licensed under the MIT License

---

## 🧑‍💻 Contact

For questions, suggestions, or issues, contact **Tanmoy Paul** or open an issue in the repo.

---

**THANK YOU**
