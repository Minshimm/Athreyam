import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getAllRoomsAPI } from "../Services/allApi";
import { useNavigate } from "react-router-dom";
import { addBookingAPI } from '../Services/allApi';

function ResortBooking() {
  const [rooms, setRooms] = useState([]); // To store fetched room details
  const [selectedRoom, setSelectedRoom] = useState(null); // Selected room for booking
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [totalAmount, setTotalAmount] = useState(0); // Total amount for the stay
  const [roomMessage, setRoomMessage] = useState(""); // Message about room calculation or availability

  const navigate = useNavigate();
  // Fetch room details from the backend
  const fetchRooms = async () => {
    try {
      const response = await getAllRoomsAPI();
      if (response.status === 200) {
        setRooms(response.data);
      } else {
        alert("Failed to fetch room details");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error.message);
    }
  };

  // Handle form inputs
  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  // Handle booking confirmation
  const handleBooking = async() => {
    const userId = sessionStorage.getItem("userId");
  const userEmail = sessionStorage.getItem("email");

  if (!userId || !userEmail) {
    alert("You need to log in to confirm a booking.");
    navigate("/login"); // Redirect to login page
    return;
  }
  const today = new Date();
  const checkInDate = new Date(bookingDetails.checkIn);
  const checkOutDate = new Date(bookingDetails.checkOut);

  // Date validation
  if (checkInDate < today) {
    alert("Check-In Date cannot be earlier than today's date.");
    return;
  }

  if (checkOutDate <= checkInDate) {
    alert("Check-Out Date must be later than Check-In Date.");
    return;
  }

  // Room availability check
  if (selectedRoom.noOfRooms <= 0) {
    alert('Room full. Please choose another room.');
    return;
  }

  const bookingData = {
    userId,
    userEmail,
    roomId: selectedRoom._id,
    roomType: selectedRoom.roomType,
    startDate: bookingDetails.checkIn,
    endDate: bookingDetails.checkOut,
    totalAmount,
  };
  
  try {
    const response = await addBookingAPI(bookingData);
    if (response.status === 201) {
      alert(
        `Booking Confirmed! You have successfully booked ${roomMessage} for ₹${totalAmount}.`
      );
      setShowModal(false); // Close the modal
    } else {
      alert(response.data.message || 'Failed to confirm booking.');
    }
  } catch (error) {
    console.error('Error confirming booking:', error.message);
    alert('Error confirming booking. Please try again.');
  }
  };

  // Open modal and set the selected room
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setShowModal(true); // Show the booking modal
  };

  // Close the modal and reset selected room
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    setTotalAmount(0); // Reset total amount
    setRoomMessage(""); // Reset room message
  };

  // Calculate total amount and rooms needed whenever form inputs or selected room change
  useEffect(() => {
    if (
      bookingDetails.checkIn &&
      bookingDetails.checkOut &&
      selectedRoom &&
      bookingDetails.guests
    ) {
      const checkInDate = new Date(bookingDetails.checkIn);
      const checkOutDate = new Date(bookingDetails.checkOut);
      const differenceInTime = checkOutDate - checkInDate;
      const differenceInDays = Math.ceil(
        differenceInTime / (1000 * 60 * 60 * 24)
      ); // Convert milliseconds to days

      const requiredRooms = Math.ceil(
        bookingDetails.guests / selectedRoom.capacity
      );
      const amount = differenceInDays * selectedRoom.price * requiredRooms;

      if (requiredRooms > selectedRoom.noOfRooms) {
        setRoomMessage("Not enough rooms available. Please reduce guests.");
        setTotalAmount(0); // No amount if rooms are unavailable
      } else {
        setRoomMessage(
          `${requiredRooms} room(s) needed for your stay.`
        );
        setTotalAmount(amount > 0 ? amount : 0); // Set total amount only if positive
      }
    }
  }, [bookingDetails, selectedRoom]);

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <div className="bg-white px-5 py-4">
        <h1
          className="text-center text-uppercase fw-bold py-3"
          style={{ letterSpacing: "5px", color: "#53633f" }}
        >
          Resort Booking
        </h1>

        {/* Display Rooms */}
        <div className="row">
          {rooms.map((room) => (
            <div className="col-3 py-3 text-center" key={room._id}>
              <Card
                style={{ width: "250px", height: "550px" }}
                className="bg-light"
              >
                <Card.Img
                  variant="top"
                  src={room.image || "default-image.jpg"} // Ensure image fallback
                  alt={room.roomType}
                  height="200px"
                />
                <Card.Body>
                  <Card.Title className="text-dark">{room.roomType}</Card.Title>
                  <Card.Text className="text-dark">
                    {room.description || "No description available."}
                  </Card.Text>
                  <p className="text-success fw-bold">
                    Price: ₹{room.price} per night
                  </p>
                  <p
                    className={`fw-bold ${
                      room.noOfRooms > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {room.noOfRooms > 0
                      ? `${room.noOfRooms} room(s) available`
                      : "Room full"}
                  </p>
                  <Button
                    onClick={() => handleSelectRoom(room)}
                    style={{ backgroundColor: "#53633f" }}
                    className="btn btn-sm my-3 text-light"
                    disabled={room.noOfRooms <= 0} // Disable button if no rooms available
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Booking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5 className="text-success">{selectedRoom.roomType}</h5>
            <p>{selectedRoom.description}</p>
            <p className="text-success fw-bold">
              Price: ₹{selectedRoom.price} per night
            </p>
            <Form>
              <Form.Group controlId="checkInDate">
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkIn"
                  value={bookingDetails.checkIn}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="checkOutDate" className="mt-3">
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOut"
                  value={bookingDetails.checkOut}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="guests" className="mt-3">
                <Form.Label>Number of Guests</Form.Label>
                <Form.Control
                  type="number"
                  name="guests"
                  value={bookingDetails.guests}
                  onChange={handleInputChange}
                  min="1"
                />
              </Form.Group>
              {roomMessage && (
                <p
                  className={`mt-3 fw-bold ${
                    totalAmount > 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {roomMessage}
                </p>
              )}
              {totalAmount > 0 && (
                <p className="mt-3 text-success fw-bold">
                  Total Amount: ₹{totalAmount}
                </p>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#53633f" }}
              onClick={handleBooking}
            >
              Confirm Booking
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default ResortBooking