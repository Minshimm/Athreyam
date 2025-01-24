import React, { useEffect, useState } from "react";
import { getAllRoomsAPI, addRoomAPI, deleteRoomAPI, updateRoomAPI } from "../Services/allApi";
import { FaEdit, FaTrash } from "react-icons/fa";
function ManageRooms() {
    const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ roomType: "", price: "", capacity: "" , noOfRooms:""});
  const [editingRoomId, setEditingRoomId] = useState(null);
  const handleEditRoom = (room) => {
    setNewRoom({
      roomType: room.roomType,
      price: room.price,
      capacity: room.capacity,
      noOfRooms: room.noOfRooms,
    });
    setEditingRoomId(room._id); // Set the ID of the room being edited
  };
  // Fetch all rooms from the backend
  const fetchRooms = async () => {
    try {
      const response = await getAllRoomsAPI();
      if (response.status === 200) {
        setRooms(response.data);
      } else {
        alert("Error fetching rooms");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddOrUpdateRoom = async () => {
    try {
      if (editingRoomId) {
        // Update Room
        const response = await updateRoomAPI(editingRoomId, newRoom);
        if (response.status === 200) {
          alert("Room updated successfully!");
          fetchRooms(); // Refresh the room list
          setNewRoom({ roomType: "", price: "", capacity: "", noOfRooms: "" });
          setEditingRoomId(null); // Clear the editing state
        } else {
          alert("Failed to update room");
        }
      } else {
        // Add Room
        const response = await addRoomAPI(newRoom);
        if (response.status === 201) {
          alert("Room added successfully!");
          fetchRooms(); // Refresh the room list
          setNewRoom({ roomType: "", price: "", capacity: "", noOfRooms: "" });
        } else {
          alert("Failed to add room");
        }
      }
    } catch (error) {
      console.error("Error adding/updating room:", error.message);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      const response = await deleteRoomAPI(roomId);
      if (response.status === 200) {
        alert("Room deleted successfully!");
        fetchRooms();
      } else {
        alert("Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error.message);
    }
  };
 
  
  return (
    <div className="bg-white">
       <div className="container my-4 bg-white py-4 ">
      <h2  className="text-center fw-bold" style={{color:'#53633f',letterSpacing: '5px'}}>Manage Rooms</h2>
      <div>
        <input
          type="text"
          placeholder="Room Type"
          value={newRoom.roomType}
          onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
          className="form-control"
        />
        <input
          type="number"
          placeholder="Price"
          value={newRoom.price}
          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
          className="form-control mt-2"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newRoom.capacity}
          onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
          className="form-control mt-2"
        />
        <input
          type="number"
          placeholder="Number Of Rooms"
          value={newRoom.noOfRooms}
          onChange={(e) => setNewRoom({ ...newRoom, noOfRooms: e.target.value })}
          className="form-control mt-2"
        />
        <button className={`btn ${editingRoomId ? "btn-success" : "btn-primary"} mt-2`}
    onClick={handleAddOrUpdateRoom}>
          {editingRoomId ? "Update Room" : "Add Room"}
        </button>
      </div>
      <table className="table table-bordered border-primary table-hover bg-light table-success  mt-4">
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Number Of Rooms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomType}</td>
              <td>₹{room.price}</td>
              <td>{room.capacity}</td>
              <td>{room.noOfRooms}</td>
              <td>
                <FaEdit className="text-primary" style={{ cursor: "pointer", marginRight: "10px" }} onClick={() => handleEditRoom(room)} />
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteRoom(room._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ManageRooms
