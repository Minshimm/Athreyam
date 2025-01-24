import React, { useEffect, useState } from 'react';
import {
  addMedicineAPI,
  getAllMedicinesAPI,
  editMedicineAPI,
  deleteMedicineAPI
} from '../Services/allApi';

function ManageMedicine() {
  // State for medicines list
  const [medicines, setMedicines] = useState([]);
  const [editingMedicine, setEditingMedicine] = useState(null);

  // State for new medicine
  const [newMedicine, setNewMedicine] = useState({
    medicineImg: '',
    medicineName: '',
    medicineCategory: '',
    medicinePrice: '',
    medicineQty: '',
    medicineDescription: ''
  });

  // Fetch medicines from API
  const getMedicines = async (searchKey = "") => {
    try {
      const response = await getAllMedicinesAPI(searchKey);
      if (response.status === 200 && Array.isArray(response.data)) {
        setMedicines(response.data);
      } else {
        alert("Error fetching medicines");
      }
    } catch (error) {
      console.error("Error fetching medicines:", error.message);
    }
  };


  const handleAddMedicine = async () => {
    if (
      !newMedicine.medicineName ||
      !newMedicine.medicineCategory ||
      !newMedicine.medicinePrice ||
      !newMedicine.medicineQty ||
      !newMedicine.medicineDescription ||
      !newMedicine.medicineImg
    ) {
      alert('Please fill all fields and upload an image!');
    }
    else{
      const formData = new FormData();
      formData.append('medicineImg', newMedicine.medicineImg);
      formData.append('medicineName', newMedicine.medicineName);
      formData.append('medicineCategory', newMedicine.medicineCategory);
      formData.append('medicinePrice', newMedicine.medicinePrice);
      formData.append('medicineQty', newMedicine.medicineQty);
      formData.append('medicineDescription', newMedicine.medicineDescription);
        // Debugging: Log FormData entries
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
  }
      try {
        const response = await addMedicineAPI(formData);
        if (response.status === 201) {
          alert('Medicine added successfully!');
          getMedicines(); // Refresh list
          setNewMedicine({
            medicineImg: '',
            medicineName: '',
            medicineCategory: '',
            medicinePrice: '',
            medicineQty: '',
            medicineDescription: ''
          });
        } else {
          alert('Error adding medicine');
        }
      } catch (error) {
        console.error('Error adding medicine:', error.message);
      }
    }
   
  };

  // Start editing a medicine
  const handleStartEditing = (medicine) => {
    setEditingMedicine({ ...medicine }); // Set selected medicine for editing
  };

  // Save changes after editing
  const handleEdit = async () => {
    if (!editingMedicine) {
      alert('No medicine selected for editing');
      return;
    }

    const formData = new FormData();
    formData.append('medicineImg', editingMedicine.medicineImg || ''); 
    formData.append('medicineName', editingMedicine.medicineName);
    formData.append('medicineCategory', editingMedicine.medicineCategory);
    formData.append('medicinePrice', editingMedicine.medicinePrice);
    formData.append('medicineQty', editingMedicine.medicineQty);
    formData.append('medicineDescription', editingMedicine.medicineDescription);

    try {
      const response = await editMedicineAPI(editingMedicine._id, formData);
      if (response.status === 200) {
        alert('Medicine updated successfully!');
        getMedicines(); // Refresh list
        setEditingMedicine(null); // Exit editing mode
      } else {
        alert('Error updating medicine');
      }
    } catch (error) {
      console.error('Error updating medicine:', error.message);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingMedicine(null); // Exit editing mode without saving
  };


  // Delete a medicine
  const handleDeleteMedicine = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        const response = await deleteMedicineAPI(id);
        if (response.status === 200) {
          alert('Medicine deleted successfully!');
          getMedicines(); 
        } else {
          alert('Error deleting medicine');
        }
      } catch (error) {
        console.error('Error deleting medicine:', error.message);
      }
    }
  };

  // Load medicines on component mount
  useEffect(() => {
    getMedicines();
  }, []);

  return (
   <div className='bg-white'>
        <div className="container bg-white">
      <h2 className='text-uppercase fw-bold text-center pt-5 '  style={{letterSpacing: '5px',color: '#53633f'}}>Manage Medicines</h2>

      <div className="my-4">
        <h3 className='fw-bolder' style={{color: '#53633f'}}>Add New Medicine</h3>
        <div className="row border border-2 border-dark p-5">
          <div className="col">
            <input
              type="file"
              name="medicineImg"
              className="form-control"
              onChange={(e) => setNewMedicine({ ...newMedicine, medicineImg: e.target.files[0] })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="medicineName"
              placeholder="Medicine Name"
              className="form-control"
              value={newMedicine.medicineName}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicineName: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="medicineCategory"
              placeholder="Category"
              className="form-control"
              value={newMedicine.medicineCategory}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicineCategory: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="medicinePrice"
              placeholder="Price"
              className="form-control"
              value={newMedicine.medicinePrice}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicinePrice: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="medicineQty"
              placeholder="Quantity"
              className="form-control"
              value={newMedicine.medicineQty}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicineQty: e.target.value })}
            />
          </div>
          <div className="col-md-10">
            <textarea
              name="medicineDescription"
              placeholder="Description"
              className="form-control mt-4"
              style={{height:'250px'}}
              value={newMedicine.medicineDescription}
              onChange={(e) => setNewMedicine({ ...newMedicine, medicineDescription: e.target.value })}
            />
          </div>
          <div className="col-md-1 mt-5 pt-5 ms-4">
            <button className="btn btn-success btn-lg" style={{backgroundColor:'#53633f',color:'white'}} onClick={handleAddMedicine}>
              Add
            </button>
          </div>
        </div>
      </div>

      <table className="table table-bordered border-primary table-hover bg-light table-success ">
        <thead>
          <tr>
            <th className='py-3'>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {medicines.length > 0 ? (
    medicines.map((medicine, index) =>
      editingMedicine && editingMedicine._id === medicine._id ? (
        <tr key={medicine._id}>
          <td>{index + 1}</td>
          <td>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setEditingMedicine({ ...editingMedicine, medicineImg: e.target.files[0] })
              }
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              value={editingMedicine.medicineName}
              onChange={(e) =>
                setEditingMedicine({ ...editingMedicine, medicineName: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              value={editingMedicine.medicineCategory}
              onChange={(e) =>
                setEditingMedicine({ ...editingMedicine, medicineCategory: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="number"
              className="form-control"
              value={editingMedicine.medicinePrice}
              onChange={(e) =>
                setEditingMedicine({ ...editingMedicine, medicinePrice: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="number"
              className="form-control"
              value={editingMedicine.medicineQty}
              onChange={(e) =>
                setEditingMedicine({ ...editingMedicine, medicineQty: e.target.value })
              }
            />
          </td>
          <td>
            <textarea
              className="form-control"
              value={editingMedicine.medicineDescription}
              onChange={(e) =>
                setEditingMedicine({
                  ...editingMedicine,
                  medicineDescription: e.target.value
                })
              }
            />
          </td>
          <td>
            <button className="btn btn-outline-warning btn-sm" onClick={handleEdit}>
              Save
            </button>
            <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleCancelEdit}>
              Cancel
            </button>
          </td>
        </tr>
      ) : (
        <tr key={medicine._id}>
          <td>{index + 1}</td>
          <td>
            {medicine.medicineImg ? (
              <img
                src={`http://localhost:3000/uploads/${medicine.medicineImg}`}
                alt={medicine.medicineName}
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
            ) : (
              'No Image'
            )}
          </td>
          <td>{medicine.medicineName}</td>
          <td>{medicine.medicineCategory}</td>
          <td>₹ {medicine.medicinePrice}</td>
          <td>{medicine.medicineQty}</td>
          <td className="medicine-description">{medicine.medicineDescription}</td>
          <td>
            <button
              type="button"
              className="btn btn-outline-warning btn-sm"
              onClick={() => handleStartEditing(medicine)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm ms-2"
              type="button"
              onClick={() => handleDeleteMedicine(medicine._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    )
  ) : (
    <tr>
      <td colSpan="8" className="text-center">
        No medicines available
      </td>
    </tr>
  )}
</tbody>
      </table>
    </div>
   </div>
  );
}

export default ManageMedicine;
