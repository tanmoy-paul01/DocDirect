import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'; 
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

import ProtectedRoute from './components/ProtectedRoute'


const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F2F2F2]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
  {/* Admin Routes */}
  <Route path='/admin-dashboard' element={
    <ProtectedRoute token={aToken}>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path='/all-appointments' element={
    <ProtectedRoute token={aToken}>
      <AllAppointments />
    </ProtectedRoute>
  } />
  <Route path='/add-doctor' element={
    <ProtectedRoute token={aToken}>
      <AddDoctor />
    </ProtectedRoute>
  } />
  <Route path='/doctor-list' element={
    <ProtectedRoute token={aToken}>
      <DoctorsList />
    </ProtectedRoute>
  } />

  {/* Doctor Routes */}
  <Route path='/doctor-dashboard' element={
    <ProtectedRoute token={dToken}>
      <DoctorDashboard />
    </ProtectedRoute>
  } />
  <Route path='/doctor-appointments' element={
    <ProtectedRoute token={dToken}>
      <DoctorAppointments />
    </ProtectedRoute>
  } />
  <Route path='/doctor-profile' element={
    <ProtectedRoute token={dToken}>
      <DoctorProfile />
    </ProtectedRoute>
  } />
</Routes>

      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer/>
    </>
  )
}

export default App