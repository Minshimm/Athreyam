import React, { useState } from "react";
import { Link } from "react-router-dom";
import chavana from '../assets/Images/Chavanaprash.jpeg'
import hair from '../assets/Images/brigaraj.jpeg'
import { useCart } from '../Context/CartContext'
function Pharmacy() {
  const { addToCart } = useCart();
  const categories = ["All", "Category 1", "Category 2", "Category 3", "Category 4"];
 // Medicine data for different categories
 const allMedicines = [
  {
    id: 1,
    category: "Category 1",
    image: hair,
    name: "Neem Capsules",
    description: "For detox and immunity.",
    amount: 506,
  },
  {
    id: 2,
    category: "Category 1",
    image: chavana,
    name: "Turmeric Capsules",
    description: "For inflammation relief.",
    amount: 595,
  },
  {
    id: 3,
    category: "Category 2",
    image: "https://via.placeholder.com/150",
    name: "Ashwagandha Capsules",
    description: "For stress relief and vitality.",
    amount: 750,
  },
  {
    id: 4,
    category: "Category 3",
    image: "https://via.placeholder.com/150",
    name: "Brahmi Tablets",
    description: "For brain health and memory.",
    amount: 620,
  },
  {
    id: 5,
    category: "Category 4",
    image: "https://via.placeholder.com/150",
    name: "Triphala Powder",
    description: "For digestion and detox.",
    amount: 450,
  },
];

// State to hold selected category and filtered medicines
const [selectedCategory, setSelectedCategory] = useState("All");

// Filter medicines based on selected category
const displayMedicines =
  selectedCategory === "All"
    ? allMedicines
    : allMedicines.filter((medicine) => medicine.category === selectedCategory);
  return (
    <div>
        <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          height: "100vh",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
        }}
      >
        <h3>Categories</h3>
        {categories.map((category, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="radio"
              id={category}
              name="category"
              value={category}
              // Add functionality to filter medicines if needed
              onChange={(e) => setSelectedCategory(e.target.value)}
              checked={selectedCategory === category}
            />
            <label htmlFor={category} style={{ marginLeft: "8px" }}>
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2
          className="text-center text-uppercase fw-bold"
          style={{ letterSpacing: "5px", color: "#53633f" }}
        >
          Ayurvedic Medicines
        </h2>
        <div className="card-grid">
          {displayMedicines.map((medicine) => (
            <div key={medicine.id} className="medicine-card">
              <img src={medicine.image} alt={medicine.name} className="medicine-image" />
              <div className="medicine-details">
                <Link to={`/medicine/${medicine.id}`} className="medicine-name">
                  {medicine.name}
                </Link>
                <p className="medicine-description">{medicine.description}</p>
                <p className="medicine-price">₹ {medicine.amount}</p>
                <button onClick={() => addToCart(medicine)} className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Pharmacy