import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, token }) => {
    if (!token) {
        return <Navigate to="/" />  // redirect to login page if not logged in
    }
    return children
}

export default ProtectedRoute
