import React from 'react'
import { useState } from 'react'
import { useParams } from "react-router-dom";
import { useCart } from '../Context/CartContext'
function MedicineRow() {
  const { id } = useParams();
  const { addToCart } = useCart();
  // Example medicine data (replace with API call)
  const medicines = [
    {
      id: 1,
      image: "https://via.placeholder.com/300",
      name: "Neem Capsules",
      description: "Neem capsules for detox and immunity.",
      amount: 506,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300",
      name: "Turmeric Capsules",
      description: "Turmeric capsules for inflammation relief.",
      amount: 595,
    },
  ];

  const medicine = medicines.find((m) => m.id === parseInt(id));

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!medicine) {
    return <p>Medicine not found.</p>;
  }

  return (
    <div>
      <div className="medicine-details-page">
      <img src={medicine.image} alt={medicine.name} className="medicine-detail-image" />
      <div className="medicine-info">
        <h2>{medicine.name}</h2>
        <p>{medicine.description}</p>
        <p className="medicine-price">₹ {medicine.amount}</p>
        <div className="quantity-controls">
          <label>Quantity:</label>
          <button onClick={decrementQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity}>+</button>
        </div>
        <button className="add-to-cart" onClick={() => addToCart(medicine)} >Add to Cart</button>
      </div>
    </div>
    </div>
  )
}

export default MedicineRow