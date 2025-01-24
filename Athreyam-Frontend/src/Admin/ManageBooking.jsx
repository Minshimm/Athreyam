import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllBookingsAPI } from '../Services/allApi';
function ManageBooking() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const response = await getAllBookingsAPI();
      if (response.status === 200) {
        setBookings(response.data);
      } else {
        alert('Error fetching booking details');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
        <div className="row bg-white px-5 py-5">
        <h2
          style={{ letterSpacing: '5px', color: '#53633f' }}
          className="fw-bold text-uppercase text-center mb-3"
        >
          User Booking Details
        </h2>
        <Table striped>
          <thead>
            <tr style={{ height: '60px' }}>
              <th>Sl</th>
              <th>User Mail ID</th>
              <th>Room Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.roomType}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ManageBooking