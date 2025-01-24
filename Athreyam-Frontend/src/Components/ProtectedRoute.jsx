import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />; // Redirect to login page if not authenticated
    }
  
    return children;
}

export default ProtectedRoute
