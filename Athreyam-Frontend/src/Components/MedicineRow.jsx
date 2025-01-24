import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from "react-router-dom";
import { getAllMedicinesAPI } from '../Services/allApi';
import MedicineList from './MedicineList';
import { useCart } from '../Context/CartContext'
function MedicineRow() {
  const { id } = useParams(); // Get the medicine ID from URL params
  const { addToCart } = useCart(); // Use addToCart function from CartContext
  const [medicine, setMedicine] = useState(null);
  const [relatedMedicines, setRelatedMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Function to fetch medicine details by ID
  const getMedicine = async () => {
    try {
      setLoading(true);
      const response = await getAllMedicinesAPI(); // Fetch all medicines
      if (response.status === 200) {
        const foundMedicine = response.data.find((m) => m._id === id); // Find specific medicine
        if (foundMedicine) {
          setMedicine(foundMedicine);
          // Filter related medicines
          const related = response.data.filter(
            (m) => m.medicineCategory === foundMedicine.medicineCategory && m._id !== id
          );
          setRelatedMedicines(related);
        } else {
          setError("Medicine not found");
        }
      } else {
        setError("Failed to fetch medicine details");
      }
    } catch (err) {
      console.error("Error fetching medicine details:", err.message); // Debug: Log error
      setError("Error fetching medicine details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedicine();
  }, [id]);

  const incrementQuantity = () => {
    if (quantity < medicine.medicineQty) {
      setQuantity(quantity + 1);
    } else {
      alert(`You can only order up to ${medicine.medicineQty} units.`);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!medicine) {
    return <p>Medicine not found.</p>;
  }


  return (
    <div>
     <div className="medicine-details-page text-dark">
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <img
            src={`http://localhost:3000/uploads/${medicine.medicineImg}`} // Image from backend
            alt={medicine.medicineName}
            className="medicine-detail-image"
          />
          <div className="medicine-info">
            <h2 style={{ letterSpacing: "5px", color: "#53633f", fontWeight: 'bold' }}>
              {medicine.medicineName}
            </h2>
            <div style={{
              whiteSpace: "pre-wrap",
              fontSize: "16px",
              lineHeight: "1.6",
              marginBottom: "10px",
              maxWidth: "600px",
              overflowWrap: "break-word",
            }}>
              <p>{medicine.medicineDescription}</p>
            </div>
            <h2 className="medicine-price" style={{ color: "#53633f" }}>₹ {medicine.medicinePrice}</h2>
            <p>Available Quantity: {medicine.medicineQty}</p>
            <div className="quantity-controls">
              <label>Quantity:</label>
              <button onClick={decrementQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={incrementQuantity}>+</button>
            </div>
            <button
              className="add-to-cart"
              onClick={() => addToCart({
      id: medicine._id,
      medicineImg: `http://localhost:3000/uploads/${medicine.medicineImg}`,
      medicineName: medicine.medicineName,
      medicinePrice: medicine.medicinePrice,
      quantity: quantity, // Pass the quantity from the state
    })} // Use addToCart from context
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <h2>Related Medicines</h2>
      <MedicineList medicines={relatedMedicines} />
    </div>
  )
}

export default MedicineRow    