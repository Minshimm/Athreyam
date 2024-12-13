import React, { useState } from 'react'
import { useCart } from '../Context/CartContext'
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; 
function Cart() {
    const { cartItems, incrementQuantity, decrementQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => total + item.amount * item.quantity, 0);
  // Handle modal visibility
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePayment = () => {
    setShowModal(false); 
   navigate("/payment-gateway")
  };

    // Handle Order Now
    // const handleOrderNow = () => {
    //   navigate("/payment-success"); // Redirect to payment success page
    // };
  
    if (cartItems.length === 0) {
      return <div className="row bg-white"><h4 className='text-center my-5' style={{letterSpacing: "5px", color: "#53633f"}}>Your cart is empty!</h4></div>;
    }
  

  return (
    <div >
        <div className='px-5 bg-white'>
        <h2 className='fw-bold text-center pt-5 text-uppercase' style={{letterSpacing: "5px", color: "#53633f"}}>Your Cart</h2>
   
        <table className="table table-striped table-bordered">
          <tbody>
          {cartItems.map((item) => (
            <tr  className='text-center' >
              <td>{item.id}</td>
              <td className='py-2'><img  src={item.image} alt={item.name} width={'100px'} height={'100px'} /></td>
              <td> <h4>{item.name}</h4>₹ {item.amount}</td>
              <td><Link
              to="#"
              onClick={() => removeFromCart(item.id)}
              className='text-danger fw-bold '
              style={{textDecoration: "none"}}
            >
              Remove
            </Link></td>
            <td><div>
              <button className='px-1' onClick={() => decrementQuantity(item.id)} style={{ marginRight: "5px" }}>
                -
              </button>
              <span>{item.quantity}</span>
              <button className='px-1' onClick={() => incrementQuantity(item.id)} style={{ marginLeft: "5px" }}>
                +
              </button></div></td>
            </tr>
          ))}
          </tbody>
        </table>
       
      <div style={{ marginTop: "20px", textAlign: "right", fontWeight: "bold", fontSize: "1.2em" }}>
      <h3 className='fw-bold text-dark'>Total: ₹ {totalAmount}</h3>
      </div>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <button className='my-3'
          onClick={handleShowModal}
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
        </div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} className='text-dark'>
        <Modal.Header closeButton className='bg-white'>
          <Modal.Title style={{color:'#53633f'}} className='text-center fw-bold'>Confirm Your Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-white'>
          <p>Your Total Amount: ₹ {totalAmount}</p>
          <p>Proceed to make the payment.</p>
        </Modal.Body>
        <Modal.Footer className='bg-white'>
          <Button variant="secondary" onClick={handleCloseModal} className='bg-danger text-white'>
            Cancel
          </Button>
          <Button variant="success" onClick={handlePayment} style={{backgroundColor:'#53633f',color:'white'}}>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Cart