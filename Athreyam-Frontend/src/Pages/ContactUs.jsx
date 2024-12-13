import React from 'react'
import { BsFillTelephoneFill } from "react-icons/bs";
import { TbHomeFilled } from "react-icons/tb";
import { FaGlobe } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import back from '../assets/Images/backCon1.jpg'
function ContactUs() {
  const locationEmbedLink = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.2317716502716!2d76.35277837354188!3d10.080085971654597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080eb12b4482fd%3A0x1b1bf8472c329398!2sAthreya%20Research%20Foundation!5e0!3m2!1sen!2sin!4v1732711012143!5m2!1sen!2sin`
  const locationEmbedLink2 = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.8634416219547!2d76.44324947355143!3d10.745006359775548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7df6633f168b3%3A0x7785075658549dfe!2sAthreyam%20Ayurveda%20Hospital%20and%20Research%20Center!5e0!3m2!1sen!2sin!4v1733226704541!5m2!1sen!2sin`
  return (
    <div className='bg-white' style={{
      backgroundImage: `url(${back})`,
      backgroundSize: 'cover',

    }}>
        <div className="row " >
          <div className="col-1"></div>
          <div className="col-4 text-light ps-5 pb-5 border border-4" style={{backgroundColor:'#53633f'}}>
               <h2 className='text-uppercase fw-bold  text-light mt-5' >Contact us</h2>
               <p className='text-decoration-underline'>We're here to help you!</p>
               <table className='mt-5'>
                <tbody>
                  <tr>
                    <td><TbHomeFilled/></td>
                    <td className='pt-2 ps-4'> Athreya Research Foundation</td>
                  </tr>
                  <tr>
                    <td className='pt-4'><BsFillTelephoneFill /></td>
                    <td className='pt-4 ps-4'>+91 - 9446 217 069</td>
                  </tr>
                  <tr>
                    <td className='pt-4'><FaGlobe /></td>
                    <td className='pt-4 ps-4'>www.athreyam.com</td>
                  </tr>
                  <tr>
                    <td className='pt-4'><IoIosMail /></td>
                    <td className='pt-4 ps-4'></td>
                  </tr>
                  <tr>
                    <td className='py-4 fas fa-map-marker-alt '></td>
                    <td className='pt-2 ps-4 '  style={{ color: "white", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => window.open(locationEmbedLink, "_blank")} > Athreyam : Nochima - Aluva</td>
                  </tr>
                  <tr>
                  <td className='py-4 fas fa-map-marker-alt '></td>
                  <td className='pt-2 ps-4 '  style={{ color: "white", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => window.open(locationEmbedLink2, "_blank")} > Athreyam : Thiruvilluamala - Pampadi</td>
                  </tr>
                </tbody>
               </table>
           </div>
          <div className="col-7 ps-5" >
            <form className=' mx-3 px-4 mb-2 mt-2 py-4 text-center'>
            <div className='form-floating mb-3 text-black'>
            <input type="text" placeholder='Username' className='form-control text-dark' />
            <label for="floatingInput">Full Name :</label>
            </div>
           <div className='form-floating mb-3 text-black'>
            <input type="email" placeholder='Email' className='form-control text-dark' />
            <label for="floatingInput">Email address :</label>
            </div>
            <div className='form-floating mb-3 text-black'>
            <input type="text" placeholder='phone' className='form-control text-dark' />
            <label for="floatingInput">Phone Number :</label>
            </div> 
             <div className='form-floating  text-black'>
              <textarea type="text" className='form-control text-dark' placeholder='message' rows="3"></textarea>
              <label for="floatingInput">Message :</label>
             </div>
              <button type='button' className='btn mt-3 text-white' style={{backgroundColor:'#53633f'}}>Send Message</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default ContactUs