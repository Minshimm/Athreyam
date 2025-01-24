import React from 'react'
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function MedicineList({ medicines }) {
    const { addToCart } = useCart();
  return (
    <div>
      <div className="card-grid">
      {medicines.map((medicine) => (
        <div key={medicine._id} className="medicine-card">
          <img
            src={`http://localhost:3000/uploads/${medicine.medicineImg}`}
            alt={medicine.medicineName}
            className="medicine-image"
          />
          <div className="medicine-details">
            <Link to={`/medicine/${medicine._id}`} className="medicine-name">
              {medicine.medicineName}
            </Link>
            <p className="card-description">{medicine.medicineDescription}</p>
            <p className="medicine-price">₹ {medicine.medicinePrice}</p>
            <button onClick={() => addToCart({
                    id: medicine._id,
                    medicineImg: `http://localhost:3000/uploads/${medicine.medicineImg}`,
                    medicineName: medicine.medicineName,
                    medicinePrice: medicine.medicinePrice,
                    quantity: 1, // Default quantity to 1
                  })} className="add-to-cart">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default MedicineList
