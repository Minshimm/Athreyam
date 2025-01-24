import React from 'react';
import { createRazorpayOrderAPI, verifyRazorpayPaymentAPI } from '../Services/allApi'
import { useCart } from '../Context/CartContext';
import { updateStockAfterOrderAPI } from '../Services/allApi'
import { useNavigate } from 'react-router-dom';
import back from '../assets/Images/paymentBack.jpg'
import { Modal, Button } from "react-bootstrap";

function Payment({ showPaymentModal, setShowPaymentModal }) {
     const { cartItems, removeFromCart } = useCart();
     const navigate = useNavigate();

      const handleRazorpayPayment = async () => {
        try {
          // Ensure Razorpay is loaded
          if (!window.Razorpay) {
            throw new Error("Razorpay SDK not loaded. Please refresh the page.");
          }
      
          // Calculate total amount
          const totalAmount = cartItems.reduce(
            (total, item) => total + item.medicinePrice * item.quantity,
            0
          );
      
          // Create Razorpay order
          const { data } = await createRazorpayOrderAPI({ amount: totalAmount })
      
          const options = {
            key: 'rzp_test_NXw9ecJZciw1N9', 
            amount: data.amount,
            currency: 'INR',
            name: 'Athreaya Reaserch Foundtion',
            description: 'Payment for medicines',
            order_id: data.id,
            handler: async (response) => {
              const paymentData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };
      
              // Verify payment on the server
              const verificationResponse = await verifyRazorpayPaymentAPI(paymentData)
      
              if (verificationResponse.data.message === 'Payment verified successfully') {
                alert('Payment Successful!');
                setShowPaymentModal(false);
                await updateStockAfterOrderAPI(cartItems.map((item) => ({
                  id: item._id,
                  quantity: item.quantity,
                })));
                cartItems.forEach((item) => removeFromCart(item._id)); // Clear the cart
                navigate('/');
              } 
              else {
                alert('Payment verification failed. Please try again.');
              }
            },
            prefill: {
              name: sessionStorage.getItem('username'),
              email: sessionStorage.getItem('email'),
              contact: sessionStorage.getItem('phone'),
            },
            theme: {
              color: '#53633f',
            },
          };
      
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } catch (error) {
          console.error('Error during payment:', error);
          alert(error.message || 'Something went wrong. Please try again.');
        }
      };
  return (
    <div >
           <Modal 
      show={showPaymentModal}
      onHide={() => setShowPaymentModal(false)}
      className="text-dark"
    >
      <Modal.Body className="bg-white" style={{
             backgroundImage: `url(${back})`,
             backgroundSize: 'cover',
            
             height:'200px',
             width:'100%',
             backgroundRepeat:'no-repeat',
            
           }}>
        <p className='mt-5 pt-5'>
          <strong>Total Amount:</strong> ₹{' '}
          {cartItems.reduce((total, item) => total + item.medicinePrice * item.quantity, 0)}
        </p>
        <p>Proceed to payment...?</p>
      </Modal.Body>
      <Modal.Footer className="bg-white">
        <Button
          variant="secondary"
          onClick={() => setShowPaymentModal(false)}
          className="bg-danger text-white"
        >
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleRazorpayPayment}
          style={{ backgroundColor: '#53633f', color: 'white' }}
        >
          Pay Now
        </Button>
      </Modal.Footer>
    </Modal>
   </div>
  )
}

export default Payment
