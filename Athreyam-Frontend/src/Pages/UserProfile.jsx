import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserAPI } from '../Services/allApi';
import Payment from '../Components/Payment'
function UserProfile() {
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    // Populate user details from sessionStorage
    setUserDetails({
      username: sessionStorage.getItem('username') || '',
      email: sessionStorage.getItem('email') || '',
      phone: sessionStorage.getItem('phone') || '',
      address: sessionStorage.getItem('address') || '',
      password: sessionStorage.getItem('password') || '',
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        alert('User not logged in');
        navigate('/login');
        return;
      }

      const response = await updateUserAPI(userId, userDetails);
      if (response.status === 200) {
        alert('Profile updated successfully!');
        // Update sessionStorage with new details
        sessionStorage.setItem('username', userDetails.username);
        sessionStorage.setItem('email', userDetails.email);
        sessionStorage.setItem('phone', userDetails.phone);
        sessionStorage.setItem('address', userDetails.address);
        sessionStorage.setItem('password', userDetails.password);
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again later.');
    }
  };

  return (
    <div className='bg-white'>
    <form className='bg-white px-5 pb-5 text-black'>
    
      <h2 className="fw-bold text-center pt-5 text-uppercase" style={{ letterSpacing: "5px", color: "#53633f" }}>User Profile</h2>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userDetails.username}
          onChange={handleInputChange}
          className="form-control text-black"
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          className="form-control text-black"
          readOnly // Email typically can't be updated
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={userDetails.phone}
          onChange={handleInputChange}
          className="form-control text-black"
        />
      </div>
      <div className="form-group">
        <label>Billing Address:</label>
        <textarea
          name="address"
          value={userDetails.address}
          onChange={handleInputChange}
          className="form-control text-black"
        ></textarea>
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userDetails.password}
          onChange={handleInputChange}
          className="form-control text-black"
        />
      </div>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
      <button type="button" onClick={handleUpdate} className="my-3 mx-2"  style={{
              backgroundColor: "#53633f",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              cursor: "pointer",
              borderRadius: "5px",
            }}>
        Update Profile
      </button>
      <button type='button'
            className="my-3 mx-2"
            onClick={()=> setShowPaymentModal(true)}
            style={{
              backgroundColor: "#53633f",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Order Now
          </button>
      </div>
    
    </form>
     {/* Payment Confirmation Modal */}
     <Payment
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
      />
    </div>
  )
}

export default UserProfile

