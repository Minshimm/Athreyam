import React, { useEffect, useState } from "react";
import { getAllMedicinesAPI } from "../Services/allApi";
import MedicineList from "../Components/MedicineList";
import { IoSearch } from "react-icons/io5";

function Pharmacy() {
  
  const [medicines, setMedicines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  //for search
  const [searchKey,setSearchKey] = useState("");
  console.log(searchKey);

  // Fetch medicines from backend
  const getMedicines = async () => {
    try {
      const response = await getAllMedicinesAPI(searchKey);
      if (response.status === 200) {
        setMedicines(response.data); // Set the fetched medicines
      } else {
        alert("Error fetching medicines");
      }
    } catch (error) {
      console.error("Error fetching medicines:", error.message);
    }
  };

  // Load medicines on component mount
  useEffect(() => {
    getMedicines();
  }, [searchKey]);

  // Get unique categories dynamically from medicines
  const categories = ["All", ...new Set(medicines.map((medicine) => medicine.medicineCategory))];

  // Filter medicines based on selected category
  const displayMedicines =
    selectedCategory === "All"
      ? medicines
      : medicines.filter((medicine) => medicine.medicineCategory === selectedCategory);

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
          <h2  style={{fontWeight:'bold', color: "#53633f" }}>Categories</h2>
          {categories.map((category, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                type="radio"
                id={category}
                name="category"
                value={category}
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
          <div className="d-flex w-70">
      <input type="text" className='form-control' placeholder='Search Medicines' onChange={e=>setSearchKey(e.target.value)}/>
      <IoSearch className='fs-3 mt-3 pe-2' style={{marginLeft:'-30px'}} />
      </div>
         <MedicineList medicines={displayMedicines} />
        </div>
      </div>
    </div>
  )
}

export default Pharmacy