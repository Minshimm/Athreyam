import React from 'react'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children}) {
    const userRole = sessionStorage.getItem("role");
  return (
    <div>
      {
        userRole === "admin" ? children : <Navigate to="/login" />
      }
    </div>
  )
}

export default PrivateRoute
