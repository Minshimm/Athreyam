import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import banner1 from '../assets/Images/homelogo1.png'
import Carousel from 'react-bootstrap/Carousel';
import butt1 from '../assets/Images/butt1.jpeg'
import butt2 from '../assets/Images/butt2.jpeg'
import butt3 from '../assets/Images/butt3.jpeg'
import butt4 from '../assets/Images/butt4.jpeg'
import butt5 from '../assets/Images/butt5.jpeg'
import ayur from '../assets/Images/ayur.jpg'
import yoga from '../assets/Images/yoga1.jpg'
import cow1 from '../assets/Images/cow1.jpg'
import briga from '../assets/Images/brigaraj.jpeg'
import chavana from '../assets/Images/Chavanaprash.jpeg'
import { useNavigate } from 'react-router-dom';
import athreya from '../assets/Videos/AthreyaLiving.mp4'
function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div className='bg-white'> 
    {/* <marquee behavior="loop" direction="left" style={{height:'60px'}} className='text-danger pt-3 fw-bold'>Unni Swami available @ Athreya Nochima from Dec 2nd to Dec 15th   |  Schedule your consultation please use contact icon <span style={{marginLeft:'400px'}}> Karkkidakanji Kit available on every friday with 10% Discount</span></marquee> */}
       <div  style={{
              width: "100vw", 
              height: "450px", 
              overflow: "hidden",
              position: "relative", 
            }}>
             <video src={athreya} width={'100%'} height={'450px'} autoPlay
              loop muted style={{
                  width: "100%", 
                  height: "100%", 
                  objectFit:"fill", 
                  position: "absolute", 
                  top: 0,
                  left: 0,
                }}></video>
              </div>
       {/* <img src={banner1} alt="" width={'100%'}  /> */}
          <div className="row bg-white mx-5 mt-5">          
            <div className="col-6 text-dark ">
              <h2 className='text-center fw-bold mb-3' style={{letterSpacing: '5px', color: '#53633f'}}
>MIND . BODY . SPIRIT</h2>
<p style={{textAlign:'justify'}}>Athreya Research Foundation embraces a holistic approach to human well-being, recognizing the interconnectedness of the mind, body, and spirit. This triad forms the cornerstone of its mission to foster resilience, healing, and sustainable growth in individuals and communities.</p>
<p style={{textAlign:'justify'}}><span className='fw-bold'>* Mind:</span>The foundation seeks to enhance mental clarity, emotional balance, and intellectual growth through innovative research and interventions.  Athreya empowers individuals to overcome challenges and unlock their potential.</p>
<p style={{textAlign:'justify'}}><span className='fw-bold'>* Body:</span> The foundation focuses on nurturing the body through healing therapies, nutrition, and wellness programs aimed at creating a harmonious balance between internal and external environments.</p>
<p style={{textAlign:'justify'}}><span className='fw-bold'>* Spirit:</span>Athreya integrates practices like meditation, mindfulness, and energy healing. These practices foster inner peace, resilience, and a sense of purpose, enabling individuals to navigate life's complexities with grace.</p>

            </div>
            <div className="col-6 pt-5 text-center">
            <Carousel activeIndex={index} onSelect={handleSelect} className='position-absolute' style={{width:'550px'}} >
      <Carousel.Item>
        <img text="First slide" src={butt1} width={'100%'} height={'400px'}/>
      </Carousel.Item>
      <Carousel.Item>
        <img text="Second slide" src={butt2}  width={'100%'} height={'400px'}/>
      </Carousel.Item>
      <Carousel.Item>
        <img text="Third slide" src={butt3}  width={'100%'} height={'400px'}/>
      </Carousel.Item>
      <Carousel.Item>
        <img text="Fourth slide" src={butt4}  width={'100%'} height={'400px'}/>
      </Carousel.Item>
      <Carousel.Item>
        <img text="fifth slide" src={butt5}  width={'100%'} height={'400px'}/>
      </Carousel.Item>
    </Carousel>
    <button className='btn btn-outline-dark position-relative end-0 bottom-0 ' onClick={() => navigate("/holistic-living")}>Holistic Living</button>
            </div>
            <p style={{textAlign:'justify'}} className='text-dark'>Together, the mind, body, and spirit framework guides Athreya Research Foundation's efforts to cultivate a balanced and holistic approach to research, innovation, and community development.</p>
          </div>
          <div className="row bg-white mx-5">
            <h2 className='text-uppercase fw-bold text-center mt-5'  style={{letterSpacing: '5px',color: '#53633f'}}>Holistic Medicine</h2>
          <p className='text-center text-black'>Focuses on treating the whole person—mind, body, and spirit—rather than just the symptoms of a disease.</p>
          <div className="col-6  mt-3 py-3 ">
                       <h3 style={{letterSpacing: '5px', color: '#53633f'}} className='fw-bold text-center'>AYURVEDA</h3>
                       <p className='mt-3 text-dark' style={{textAlign:'justify'}}>Ayurveda is a traditional system of medicine that originated in India over 3,000 years ago and is rooted in the holistic approach to health and well-being. Derived from the Sanskrit words "Ayur" (life) and "Veda" (knowledge), Ayurveda emphasizes the balance of body, mind, and spirit to prevent and treat illnesses. It is based on the concept of three fundamental energies or doshas—Vata, Pitta, and Kapha—which govern individual constitution and health. Ayurvedic practices include herbal remedies, dietary guidelines, yoga, meditation, detoxification therapies, and lifestyle modifications. This ancient science continues to play a vital role in promoting natural healing and is recognized globally as a complementary and alternative system of medicine.</p>
          </div>
          <div className="col-6 mt-3 " >
              <img src={ayur} alt="ayur" width={'100%'} height={'340px'}/>
          </div>
             </div>
             <div className="row mx-5">
             <div className="col-6 " >
              <img src={yoga} alt="ayur" width={'100%'} height={'340px'}/>
          </div>
          <div className="col-6  py-3 " >
                       <h3 style={{letterSpacing: '5px',color: '#53633f'}} className=' text-center fw-bold'>YOGA</h3>
                       <p className='mt-3 text-dark' style={{textAlign:'justify'}}>Yoga is an ancient practice that originated in India, combining physical postures (asanas), breathing exercises (pranayama), and meditation to promote physical, mental, and spiritual well-being.The root for the word 'Yoga' comes from the Sanskrit word 'yuj' [pronounced yug'], which means 'union' - a union of the Mind, Body and Spirit. It enhances flexibility, strength, and relaxation, while reducing stress and improving focus. Yoga is widely practiced worldwide for its holistic benefits and adaptability to all fitness levels. Regular practice of yoga is believed to reduce stress, enhance emotional balance, and improve overall well-being. Rooted in traditions that aim to align the self with universal consciousness, yoga is widely embraced globally as a holistic approach to health and inner peace.</p>
          </div>
          </div>
          <div className="row mx-5">
          <h2 className='text-uppercase fw-bold text-center mt-5'  style={{letterSpacing: '5px',color: '#53633f'}}>Our Ayurvedic Best sellers</h2>
          <div className="col-3 py-3 text-center ">
          <Card style={{ width: '250px', height :'380px'}} className='bg-light'>
      <Card.Img variant="top" src={butt1} width={'100%'} height={'200px'} />
      <Card.Body>      
       <Card.Title className='text-dark'>Sp . MURIVENNA</Card.Title>
        <Card.Text className='text-dark'>
          All type of body pains
        </Card.Text>
       
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light' onClick={() => navigate("/pharmacy")}>Order Now</Button>
      </Card.Body>
    </Card>
          </div>
          <div className="col-3 py-3 text-center">
          <Card style={{ width: '250px', height :'380px'}} className='bg-light'>
      <Card.Img variant="top" src={butt1} width={'100%'} height={'200px'} />
      <Card.Body>
        <Card.Title className='text-dark'>AVARAKALPPAM</Card.Title>
        <Card.Text className='text-dark'>
          Stomech Problems
        </Card.Text>
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light' onClick={() => navigate("/pharmacy")}>Order Now</Button>
      </Card.Body>
    </Card>
          </div>
          <div className="col-3 py-3 text-center">
          <Card style={{ width: '250px', height :'380px'}} className='bg-light'>
      <Card.Img variant="top" src={briga} width={'100%'} height={'200px'} />
      <Card.Body>
        <Card.Title className='text-dark'>BRINGARAJA</Card.Title>
        <Card.Text className='text-dark'>
          For Hair Growth
        </Card.Text>
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light' onClick={() => navigate("/pharmacy")}>Order Now</Button>
      </Card.Body>
    </Card>
          </div>
          <div className="col-3 py-3 text-center">
          <Card style={{ width: '250px', height :'380px'}} className='bg-light'>
      <Card.Img variant="top" src={chavana} width={'100%'} height={'200px'} />
      <Card.Body>
        <Card.Title className='text-dark'>CHAVANAPRAVYAM</Card.Title>
        <Card.Text className='text-dark'>
          Body Health
        </Card.Text>
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light' onClick={() => navigate("/pharmacy")}>Order Now</Button>
      </Card.Body>
    </Card>
          </div>
          </div>
          <div className="row mx-5">
          <h2 className='text-uppercase fw-bold text-center mt-5'  style={{letterSpacing: '5px',color: '#53633f'}}>Serving Humanity</h2>
            <div className="col-6 py-3 text-center">
            <Card className=" text-white">
      <Card.Img src={cow1} alt="Card image" height={'350px'} className=''/>
      <Card.ImgOverlay>
        <Card.Title className='fw-bold'>GAUSAMRAKSHANAM</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light'>Donations</Button>
      </Card.ImgOverlay>
    </Card>
            </div>
            <div className="col-6 py-3 text-center">
            <Card className=" text-white">
      <Card.Img src={butt2} alt="Card image" height={'350px'} />
      <Card.ImgOverlay>
        <Card.Title className='fw-bold'>ANNADHANAM</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
        <Button style={{backgroundColor:'#53633f'}} className='btn btn-sm my-3 text-light'>Donations</Button>
      </Card.ImgOverlay>
    </Card>
            </div>
          </div>
    </div>
  )
}

export default Home