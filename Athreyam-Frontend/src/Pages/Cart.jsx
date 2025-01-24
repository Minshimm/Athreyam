import React, { useEffect, useState } from 'react'
import { useCart } from '../Context/CartContext'
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; 

function Cart() {
  const {
    cartItems,
    fetchCartItems,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const userId = sessionStorage.getItem("userId"); // Get logged-in user's ID
  const isAuthenticated = sessionStorage.getItem("token"); // Check authentication from sessionStorage

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.medicinePrice || 0) * item.quantity,
    0
  );

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  // Handle Order Now Button
  const handleOrderNow = () => {
    if (!isAuthenticated) {
      handleShowLoginModal(); // Show login alert/modal
    } else {
      navigate('/user/profile');
      // setShowPaymentModal(true); // Show payment confirmation modal
    }
  };

  // Fetch cart items from the backend
  // const fetchCartItems = async () => {
  //   try {
  //     if (userId) {
  //       // For logged-in users
  //       const response = await getCartAPI(userId);
  //       console.log("API Response:", response.data);
  //       if (response.status === 200 && response.data.items) {
  //         const items = response.data.items
  //           .filter((item) => item !== null)
  //           .map((item) => ({
  //             _id: item._id,
  //             medicineImg: item.medicineImg || "default-image.jpg",
  //             medicineName: item.medicineName || "No Name",
  //             medicinePrice: item.medicinePrice || 0,
  //             quantity: item.quantity,
  //           }));
  //         setCartItems(items);
  //       } else {
  //         console.error("Failed to fetch cart items:", response.data.message);
  //       }
  //     } else {
  //       // For guest users
  //       const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
  //       console.log("Guest Cart from LocalStorage:", guestCart);
  
  //       if (guestCart.length > 0) {
  //         // Fetch medicine details for guest cart
  //         const response = await fetchMedicinesByIds(guestCart.map((item) => item.medicineId));
  //         console.log("Guest Cart Medicine Details API Response:", response.data);
  
  //         if (response.status === 200) {
  //           const medicineDetails = response.data.medicines;
  
  //           // Combine guest cart items with fetched medicine details
  //           const updatedCart = guestCart.map((item) => ({
  //             ...item,
  //             ...medicineDetails.find((med) => med._id === item.medicineId),
  //           }));
  
  //           console.log("Updated Guest Cart with Details:", updatedCart);
  //           setCartItems(updatedCart); // Update cart items
  //         } else {
  //           console.error("Failed to fetch medicine details for guest cart:", response.data.message);
  //         }
  //       } else {
  //         console.log("Guest cart is empty.");
  //         setCartItems([]);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart items:", error);
  //   }
  // };

  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  if (!cartItems) {
    return null; // Ensure hooks are not skipped by rendering a fallback
  }

  if (cartItems.length === 0) {
    return (
      <div className="row bg-white">
        <h4
          className="text-center my-5"
          style={{ letterSpacing: "5px", color: "#53633f" }}
        >
          Your cart is empty!
        </h4>
      </div>
    );
  }

  return (
    <div >
      <div className="px-5 bg-white">
        <h2
          className="fw-bold text-center pt-5 text-uppercase"
          style={{ letterSpacing: "5px", color: "#53633f" }}
        >
          Your Cart
        </h2>

        <table className="table table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {cartItems.map((item) => (
    <tr className="text-center" key={item.medicineId}>
      <td className="py-2">
        <img
          src={item.medicineImg || "http://localhost:3000/uploads/default-image.jpg"}
          alt={item.medicineName || "Medicine"}
          width="100px"
          height="100px"
        />
      </td>
      <td>
        <h4>{item.medicineName || "No Name"}</h4>
      </td>
      <td>₹ {item.medicinePrice || 0}</td>
      <td>
        <div>
          <button
            className="px-1"
            onClick={() => decrementQuantity(item.medicineId)}
            style={{ marginRight: "5px" }}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="px-1"
            onClick={() => incrementQuantity(item.medicineId)}
            style={{ marginLeft: "5px" }}
          >
            +
          </button>
        </div>
      </td>
      <td>
        <Link
          to="#"
          onClick={() => removeFromCart(item._id)}
          className="text-danger fw-bold"
          style={{ textDecoration: "none" }}
        >
          Remove
        </Link>
      </td>
    </tr>
  ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "20px",
            textAlign: "right",
            fontWeight: "bold",
            fontSize: "1.2em",
          }}
        >
          <h3 className="fw-bold text-dark">Total: ₹ {totalAmount}</h3>
        </div>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <button
            className="my-3 mx-2"
            onClick={handleOrderNow}
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
          <button
            className="my-3 mx-2"
            onClick={clearCart}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* Login Alert Modal */}
      <Modal show={showLoginModal} onHide={handleCloseLoginModal} className="text-dark">
        <Modal.Header closeButton className="bg-white">
          <Modal.Title
            style={{ color: "#53633f" }}
            className="text-center fw-bold"
          >
            Login Required
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <p>Please sign in to proceed with your order.</p>
        </Modal.Body>
        <Modal.Footer className="bg-white">
          <Button
            variant="secondary"
            onClick={handleCloseLoginModal}
            className="bg-danger text-white"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/login")}
            style={{ backgroundColor: "#53633f", color: "white" }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Cart             