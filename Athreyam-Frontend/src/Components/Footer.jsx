import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import logo from '../assets/Images/mainlogo.png'
import aluva from '../assets/Images/qr_aluva.png'
import pampadi from '../assets/Images/pampadi.png'
function Footer() {
  const locationEmbedLink = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.2317716502716!2d76.35277837354188!3d10.080085971654597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080eb12b4482fd%3A0x1b1bf8472c329398!2sAthreya%20Research%20Foundation!5e0!3m2!1sen!2sin!4v1732711012143!5m2!1sen!2sin`
  const locationEmbedLink2 = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8634416219547!2d76.44324947355143!3d10.745006359775548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7df6633f168b3%3A0x7785075658549dfe!2sAthreyam%20Ayurveda%20Hospital%20and%20Research%20Center!5e0!3m2!1sen!2sin!4v1733226704541!5m2!1sen!2sin`
  return (
    <div>
      <MDBFooter bgColor='light' className='text-center text-lg-start' >
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom text-white' style={{ backgroundColor: '#53633f' }}>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4'>
            <MDBIcon color='white' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon color='white' fab icon='twitter' />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon color='white' fab icon='google' />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon color='white' fab icon='instagram' />
          </a>
          <a href='' className='me-4 '>
            <MDBIcon color='white' fab icon='pinterest' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start text-dark'>
          <MDBRow className=''>
            <MDBCol md='3' lg='4' xl='3' className='text-center pt-3'>
            <img src={logo} alt="logo" width={'200px'} />
            </MDBCol>
            <MDBCol md='2' lg='2' xl='2' className='mx-auto my-4 text-center'>
              <h6 className='text-uppercase fw-bolder mb-4' style={{color:'#53633f'}}>Explore Our Space</h6>
              <p>
                <a href='#!' className=' icon-link icon-link-hover link-dark '>
                  About Us
                </a>
              </p>
              <p >
                <a href='#!' className=' icon-link icon-link-hover link-dark '>
                  Activities
                </a>
              </p>
              <p >
                <a href='#!' className=' icon-link icon-link-hover link-dark '>
                  Gallery
                </a>
              </p>
              <p>
                <a href='#!' className='  icon-link icon-link-hover link-dark '>
                News & Events
                </a>
              </p>
            </MDBCol>

            

            <MDBCol md='4' lg='3' xl='3' className=' my-4 '>
              <h6 className='text-uppercase fw-bold mb-4' style={{color:'#53633f'}}>Contact</h6>
              <p>
                <MDBIcon  icon='home' className='me-2 text-dark' />
                Athreya Reserch Foundation
              </p>
              <p>
                <MDBIcon  icon='envelope' className='me-3' />
                athreyamayur@gmail.com,
                info@athreyam.com
              </p>
              <p>
                <MDBIcon  icon='phone' className='me-3' /> +91 - 9446 217069
              </p>
            </MDBCol>
            <MDBCol md='3' lg='2' xl='2' className='mx-auto my-4 '>
             {/* <h5 style={{color:'green'}}>"Nature’s Haven, Your Sanctuary of Calm."</h5> */}
            
              <p onClick={() => window.open(locationEmbedLink, "_blank")} className="fas fa-map-marker-alt text-dark d-flex">
              
              <img src={aluva} alt="" width={'100px'} className='mx-3'/>
              <span
                style={{ color: "black", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => window.open(locationEmbedLink, "_blank")}  className='mt-4'>
                Athreyam : Nochima - Aluva
              </span>
              </p>
              <p onClick={() => window.open(locationEmbedLink2, "_blank")} className="fas fa-map-marker-alt  text-dark d-flex">
              
              <img src={pampadi} alt="" width={'100px'} className='mx-3'/>
              <span
                style={{ color: "black", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => window.open(locationEmbedLink2, "_blank")}  className='mt-4'>
                Athreyam : Thiruvillamala
              </span>
              </p>
            </MDBCol>
          </MDBRow>
                </MDBContainer>
      </section>
   
     <div className='text-center p-4 text-dark' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      Copyright © 2015 ATHREYAM 
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer