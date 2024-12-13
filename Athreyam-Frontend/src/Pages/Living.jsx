import React from 'react'
import living from '../assets/Videos/living.mp4'
import eve from '../assets/Images/eve.jpg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import explore from '../assets/Images/explore.png'
import { useNavigate } from 'react-router-dom';

function Living() {
    const navigate = useNavigate();
  return (
    <div className='bg-white'> 
       <div  style={{
        width: "100vw", 
        height: "450px", 
        overflow: "hidden",
        position: "relative", 
      }}>
       <video src={living} width={'100%'} height={'450px'} autoPlay
        loop muted style={{
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            position: "absolute", 
            top: 0,
            left: 0,
          }}></video>
       </div>
       <div className="row mx-5 text-black">
       <h1 className="text-center text-uppercase fw-bold py-5"
          style={{ letterSpacing: "5px", color: "#53633f" }}>Welcome to Holistic Living Resort</h1>
        <div className="col-6">           
          <p style={{textAlign:'justify'}}> where luxury meets nature, and your well-being takes center stage. Nestled in the serene lap of nature, our resort is a sanctuary for relaxation, rejuvenation, and reconnecting with life’s simple pleasures. Designed to cater to every preference, our accommodations and experiences ensure you leave feeling revitalized in <span className='text-danger'>mind, body, and spirit</span> .</p>
          <h4 style={{color: "#53633f" }} className='py-3'>Why Choose Holistic Living Resort?</h4>
          <p>Our resort is not just a place to stay—it's a journey into holistic living. Whether you’re here for a quiet retreat, a romantic getaway, or a family holiday, our goal is to offer an unforgettable experience that harmonizes your soul with nature.</p>
          <p>Discover the art of Holistic Living—because you deserve more than just a vacation. You deserve a transformation.</p>
        </div>
        <div className="col-6">
            <img src={eve} alt="eve" width={'100%'} height={'370px'}/>
        </div>
       </div>
       <div className="row mx-5">
        <div className="col-3 py-3 text-center">
        <Card style={{ width: '250px', height :'550px'}} className='bg-light'>
      <Card.Img variant="top" src="" width={'100%'} height={'200px'} />
      <Card.Body>      
       <Card.Title className='text-dark'>Delux Rooms</Card.Title>
        <Card.Text className='text-dark'>
        Spacious interiors, premium amenities, private balconies, and breathtaking views create an oasis of calm. Perfect for families or couples seeking an exclusive retreat.
        </Card.Text>
   
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light' onClick={() => navigate("/room-booking")}>Book Now</Button>
      </Card.Body>
    </Card>
        </div>
        <div className="col-3 py-3 text-center">
        <Card style={{ width: '250px', height :'550px'}} className='bg-light'>
      <Card.Img variant="top" src="" width={'100%'} height={'200px'} />
      <Card.Body>      
       <Card.Title className='text-dark'>Double Room</Card.Title>
        <Card.Text className='text-dark'>
        These accommodations are designed for small families or groups, featuring two bedrooms, cozy common areas, and modern conveniences to make your stay unforgettable.
        </Card.Text>
       
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light' onClick={() => navigate("/room-booking")}>Book Now</Button>
      </Card.Body>
    </Card>
        </div>
        <div className="col-3 py-3 text-center">
        <Card style={{ width: '250px', height :'550px'}} className='bg-light'>
      <Card.Img variant="top" src="" width={'100%'} height={'200px'} />
      <Card.Body>      
       <Card.Title className='text-dark'>Single Room</Card.Title>
        <Card.Text className='text-dark'>
        With minimalist decor inspired by nature and tranquil surroundings, these villas offer the perfect escape from the hustle and bustle of daily life.
        </Card.Text>
       
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light' onClick={() => navigate("/room-booking")}>Book Now</Button>
      </Card.Body>
    </Card>
        </div>
        <div className="col-3 py-3 text-center">
        <Card style={{ width: '250px', height :'550px'}} className='bg-light'>
      <Card.Img variant="top" src="" width={'100%'} height={'200px'} />
      <Card.Body>      
       <Card.Title className='text-dark'>Small Hut Villa</Card.Title>
        <Card.Text className='text-dark'>
        These unique accommodations mimic the traditional hut architecture while offering modern-day comforts. Perfect for those looking for an authentic and rustic stay amidst nature.
        </Card.Text>
       
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light' onClick={() => navigate("/room-booking")}>book Now</Button>
      </Card.Body>
    </Card>
        </div>
       </div>
       <div className="row mx-5 pb-5">
       <h2 className="text-center text-uppercase fw-bold pt-5"
          style={{ letterSpacing: "5px", color: "#53633f" }}>Resort Highlights:</h2>
        <div className="col-6 text-center ">
            <img src={explore} alt="explore" width={'80%'} height={'350px'} />
        </div>
        <div className="col-6 text-dark pt-5">
            <ul>
                <li><span className='fw-bold'>Reconnect with Nature:</span> Surrounded by lush greenery and serene landscapes, our resort provides the perfect environment to unwind and detox.</li>
                <li><span>Holistic Wellness Experiences:</span> From yoga and meditation sessions to Ayurvedic therapies and energy healing treatments, we focus on revitalizing your inner self.</li>
                <li><span className='fw-bold'>Farm-to-Table Dining:</span> Enjoy meals crafted from fresh, organic ingredients sourced locally, offering you a taste of health and authenticity.</li>
                <li><span className='fw-bold'>Activities for All: </span>Indulge in nature walks, bird watching, cycling trails, or simply relax by our infinity pool overlooking the pristine surroundings.</li>
            </ul>
        </div>
       </div>
    </div>
  )
}

export default Living