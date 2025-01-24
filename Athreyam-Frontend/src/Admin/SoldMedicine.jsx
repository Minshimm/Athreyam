import React, { useState, useEffect } from 'react';
import { getAllSoldMedicinesAPI } from '../Services/allApi';

function SoldMedicine() {
    const [soldMedicines, setSoldMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSoldMedicines = async () => {
            try {
                const response = await getAllSoldMedicinesAPI();
                setSoldMedicines(response.data); // Assuming response contains a `data` field with the list
                setLoading(false);
            } catch (err) {
                console.error('Error fetching sold medicines:', err);
                setError('Failed to fetch sold medicines');
                setLoading(false);
            }
        };

        fetchSoldMedicines();
    }, []);

    if (loading) {
        return <div className="text-center">Loading sold medicines...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

  return (
    <div>
        <div className="bg-white px-5 pb-5">
            <h2 className="fw-bold text-center pt-5 text-uppercase mb-3" style={{ letterSpacing: "5px", color: "#53633f" }}>Sold Medicines</h2>
            {soldMedicines.length > 0 ? (
                <table className="table table-bordered border-primary table-hover bg-light table-success  ">
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Quantity Sold</th>
                            <th>Total Price</th>
                            <th>Sale Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {soldMedicines.map((medicine) => (
                            <tr key={medicine._id}>
                                <td>{medicine.medicineName}</td>
                                <td>{medicine.quantitySold}</td>
                                <td>₹{medicine.totalPrice}</td>
                                <td>{new Date(medicine.saleDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center">No sold medicines to display</div>
            )}
        </div>
    </div>
  )
}

export default SoldMedicine
