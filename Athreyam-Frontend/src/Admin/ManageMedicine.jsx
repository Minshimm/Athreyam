import React, { useState } from 'react'

function ManageMedicine() {
   
      // State for medicines list
      const [medicines, setMedicines] = useState([
        {
          id: 1,
          name: "Neem Capsules",
          category: "Category 1",
          amount: 506,
          description: "For detox and immunity.",
        },
        {
          id: 2,
          name: "Turmeric Capsules",
          category: "Category 1",
          amount: 595,
          description: "For inflammation relief.",
        },
        {
          id: 3,
          name: "Ashwagandha Capsules",
          category: "Category 2",
          amount: 750,
          description: "For stress relief and vitality.",
        },
      ]);
    
      // State to track which medicine is being edited
      const [editingMedicine, setEditingMedicine] = useState(null);
    
      // State for new medicine
      const [newMedicine, setNewMedicine] = useState({
        name: "",
        category: "",
        amount: "",
        description: "",
      });
    
      // Handle changes in the new medicine form
      const handleNewMedicineChange = (e) => {
        const { name, value } = e.target;
        setNewMedicine((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      // Add a new medicine
      const handleAddMedicine = () => {
        const id = medicines.length + 1;
        setMedicines([...medicines, { id, ...newMedicine }]);
        setNewMedicine({ name: "", category: "", amount: "", description: "" });
      };
    
      // Start editing a medicine
      const handleEditMedicine = (medicine) => {
        setEditingMedicine({ ...medicine });
      };
    
      // Save changes after editing
      const handleSaveEdit = () => {
        setMedicines((prevMedicines) =>
          prevMedicines.map((medicine) =>
            medicine.id === editingMedicine.id ? editingMedicine : medicine
          )
        );
        setEditingMedicine(null); // Exit editing mode
      };
    
      // Cancel editing
      const handleCancelEdit = () => {
        setEditingMedicine(null); // Exit editing mode without saving
      };
    
      // Delete a medicine
      const handleDeleteMedicine = (id) => {
        setMedicines(medicines.filter((medicine) => medicine.id !== id));
      };
  return (
    <div>
         <div className="container my-4">
      <h1 className="text-center">Manage Medicines</h1>

      {/* Add New Medicine Form */}
      <div className="my-4">
        <h4>Add New Medicine</h4>
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              placeholder="Medicine Name"
              className="form-control"
              value={newMedicine.name}
              onChange={handleNewMedicineChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="form-control"
              value={newMedicine.category}
              onChange={handleNewMedicineChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="amount"
              placeholder="Price"
              className="form-control"
              value={newMedicine.amount}
              onChange={handleNewMedicineChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="form-control"
              value={newMedicine.description}
              onChange={handleNewMedicineChange}
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-success" onClick={handleAddMedicine}>
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Medicines Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) =>
            editingMedicine && editingMedicine.id === medicine.id ? (
              // Inline editing row
              <tr key={medicine.id}>
                <td>{medicine.id}</td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={editingMedicine.name}
                    onChange={(e) =>
                      setEditingMedicine((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={editingMedicine.category}
                    onChange={(e) =>
                      setEditingMedicine((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={editingMedicine.amount}
                    onChange={(e) =>
                      setEditingMedicine((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={editingMedicine.description}
                    onChange={(e) =>
                      setEditingMedicine((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }          />
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm ms-2"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              // Display row
              <tr key={medicine.id}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.category}</td>
                <td>₹ {medicine.amount}</td>
                <td>{medicine.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditMedicine(medicine)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDeleteMedicine(medicine.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ManageMedicine