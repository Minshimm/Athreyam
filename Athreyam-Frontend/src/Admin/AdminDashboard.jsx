import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>
        <div className="container my-4 bg-white py-4">
      <h1 className="text-center" style={{color:'#53633f',letterSpacing: '5px'}}>Admin Dashboard</h1>
      <div className="row mt-4 ">
        {/* Dashboard Cards */}
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Medicines</h5>
              <p className="card-text">125</p>
              <Link to="/admin/manage-medicines" className="btn btn-primary">
                Manage Medicines
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">540</p>
              <button className="btn btn-secondary">View Users</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5 className="card-title">Total Bookings</h5>
              <p className="card-text">78</p>
              <Link to="/admin/manage-booking" className="btn btn-primary">
              View Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Admin Actions */}
      <div className="mt-5 text-center">
        <h4>Quick Actions</h4>
        <button className="btn btn-info mx-2">View Reports</button>
        <button className="btn btn-warning mx-2">Settings</button>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard