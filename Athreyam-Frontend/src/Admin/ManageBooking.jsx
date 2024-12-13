import React from 'react'
import Table from 'react-bootstrap/Table';
function ManageBooking() {
  return (
    <div>
        <div className="row bg-white px-5 py-5">
            <h2 style={{ letterSpacing: "5px", color: "#53633f" }} className='fw-bold text-uppercase text-center mb-3'>User Booking Details</h2>
        <Table striped >
      <thead>
        <tr style={{height:'60px'}}>
          <th>Sl</th>
          <th>User Mail ID</th>
          <th>Room Type</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    <h2 style={{ letterSpacing: "5px", color: "#53633f" }} className='fw-bold text-uppercase text-center mt-5'>room Availability</h2>
    <Table striped >
      <thead>
        <tr style={{height:'60px'}}>
          <th>Sl</th>
          <th>Delux</th>
          <th>Double</th>
          <th>Single</th>
          <th>Hut Villa</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
        </div>
    </div>
  )
}

export default ManageBooking