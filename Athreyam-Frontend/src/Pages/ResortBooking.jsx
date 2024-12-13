import React, { useState } from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const roomTypes = [
    {
      id: 1,
      title: "Deluxe Room",
      description: "Spacious interiors, premium amenities, private balconies, and breathtaking views.",
      price: 250,
      img: "path_to_image_1", // Replace with your image paths
    },
    {
      id: 2,
      title: "Double Room",
      description: "Perfect for small families or groups with cozy common areas and modern conveniences.",
      price: 200,
      img: "path_to_image_2",
    },
    {
      id: 3,
      title: "Single Room",
      description: "Minimalist decor inspired by nature, perfect for solo travelers or couples.",
      price: 150,
      img: "path_to_image_3",
    },
    {
      id: 4,
      title: "Small Hut Villa",
      description: "Rustic and authentic hut-style accommodations with modern comforts.",
      price: 180,
      img: "path_to_image_4",
    },
  ];
  
function ResortBooking() {
    const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const [confirmation, setConfirmation] = useState("");

  // Handle form inputs
  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  // Handle booking confirmation
  const handleBooking = () => {
    if (!selectedRoom || !bookingDetails.checkIn || !bookingDetails.checkOut) {
      alert("Please fill in all the booking details!");
      return;
    }
    setConfirmation(
      `Booking Confirmed! You have successfully booked a ${selectedRoom.title}.`
    );
  };
  return (
    <div>
                <div className="bg-white px-5 py-4">
      <h1 className="text-center text-uppercase fw-bold py-3" style={{ letterSpacing: "5px", color: "#53633f" }}>
        Resort Booking
      </h1>

      <div className="row">
        {/* Room Selection */}
        {roomTypes.map((room) => (
          <div className="col-3 py-3 text-center" key={room.id}>
            <Card style={{ width: "250px", height: "550px" }} className={`bg-light ${selectedRoom?.id === room.id ? "border-success" : ""}`}>
              <Card.Img variant="top" src={room.img} alt={room.title} height="200px" />
              <Card.Body>
                <Card.Title className="text-dark">{room.title}</Card.Title>
                <Card.Text className="text-dark">{room.description}</Card.Text>
                <p className="text-success fw-bold">Price: ${room.price} per night</p>
                <Button
                  onClick={() => setSelectedRoom(room)}
                  style={{ backgroundColor: "#53633f" }}
                  className="btn btn-sm my-3 text-light"
                >
                  {selectedRoom?.id === room.id ? "Selected" : "Select Room"}
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      {selectedRoom && (
        <div className="bg-light p-4 mt-4 rounded">
          <h3 className="text-center text-uppercase fw-bold py-3" style={{ letterSpacing: "5px", color: "#53633f" }}>
            Booking Details
          </h3>
          <Form>
            <div className="row">
              <div className="col-md-4">
                <Form.Group controlId="checkInDate">
                  <Form.Label>Check-In Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkIn"
                    value={bookingDetails.checkIn}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group controlId="checkOutDate">
                  <Form.Label>Check-Out Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="checkOut"
                    value={bookingDetails.checkOut}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group controlId="guests">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="guests"
                    value={bookingDetails.guests}
                    onChange={handleInputChange}
                    min="1"
                  />
                </Form.Group>
              </div>
            </div>
            <div className="text-center mt-4">
              <Button onClick={handleBooking} style={{ backgroundColor: "#53633f" }}>
                Confirm Booking
              </Button>
            </div>
          </Form>
        </div>
      )}

      {/* Confirmation Message */}
      {confirmation && (
        <div className="text-center mt-4">
          <h4 className="text-success fw-bold">{confirmation}</h4>
        </div>
      )}
    </div>
    </div>
  )
}

export default ResortBooking