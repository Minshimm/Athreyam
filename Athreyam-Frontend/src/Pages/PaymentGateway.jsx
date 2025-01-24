import React from 'react';
import { createRazorpayOrderAPI, verifyRazorpayPaymentAPI } from '../Services/allApi'
import { useCart } from '../Context/CartContext';
import { updateStockAfterOrderAPI } from '../Services/allApi'
import { useNavigate } from 'react-router-dom';

function PaymentGateway() {
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
        name: 'Athreay Reaserch Foundtion',
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
            await updateStockAfterOrderAPI(cartItems);
            cartItems.forEach((item) => removeFromCart(item.id)); // Clear the cart
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
    <div>
    <div className="text-center">
        <h2>Proceed to Payment</h2>
        <button
          onClick={handleRazorpayPayment}
          style={{
            backgroundColor: '#53633f',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Pay with Razorpay
        </button>
      </div>
</div>
  )
}

export default PaymentGateway

