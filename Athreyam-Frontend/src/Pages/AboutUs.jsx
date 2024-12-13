import React from 'react'
import about from '../assets/Images/about.png'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import nirmalSwamy from '../assets/Images/nirmalanandagiri.jpg'
import unni from '../assets/Images/unni.jpg'
function AboutUs() {
  return (
    <div style={{overflow:'hidden'}}>
        <img src={about} alt="" width={'100%'} height={'400px'}/>
        <div className="row pt-5 bg-white">
            <div className="col-6">
                <h2 className='fw-bold ms-5' style={{color:'#53633f'}}>Our Vision:</h2>
                <p className='ms-3 text-dark'>There is not a branch of science or knowledge that did not germinate and sprout out from Bharath of yore. Today, Bharath as well as the whole world are groping in the darkness of ignorance. A world rid of this 'Thamasic' trauma with the Vedic vision of “Loka: Samasta: Sukhino Bhavantu” (let the entire world enjoy the total bliss of happiness and wellness) is our vision.</p>
            </div>
            <div className="col-6">
                <h2 className='fw-bold ms-5' style={{color:'#53633f'}}>Our Mission:</h2>
                <ul className='ms-3 text-dark'>
                    <li>To inculcate a sense of universal bondage as all human beings are one creation</li>
                    <li>To resurrect the lost Dharma, heritage and culture of ancient Bharat</li>
                    <li>To distribute equally and globally the incalculable treasure of ancient wisdom and to re-establish the old concept of harmony.</li>
                </ul>
            </div>
        </div>
        <div className="row py-5 bg-light ps-5">
            <div className="col-4">
            <Card style={{ width: '14rem' }} className='square border border-2 border-success ms-5 bg-white'>
      <Card.Img variant="top" src={nirmalSwamy}  />
      <Card.Body>
        <Card.Title style={{color:'#53633f'}}>Swamy Nirmalanandagiri</Card.Title>
        <Card.Text>
          Founder
        </Card.Text>
      </Card.Body>
    </Card>
            </div>
            <div className="col-4">
            <Card style={{ width: '14rem' }} className='square border border-2 border-success ms-5 bg-white'>
      <Card.Img variant="top" src={unni} height={'230px'}/>
      <Card.Body>
        <Card.Title style={{color:'#53633f'}}>Dr.Unni Swamy</Card.Title>
        <Card.Text>
         Managing Trustee
        </Card.Text>
      </Card.Body>
    </Card>
            </div>
            <div className="col-4">
            <Card style={{ width: '14rem' }} className='square border border-2 border-success ms-5 bg-white'>
      <Card.Img variant="top" src={nirmalSwamy} />
      <Card.Body>
        <Card.Title style={{color:'#53633f'}}>Swamy Nirmalanandagiri</Card.Title>
        <Card.Text>
          Founder
        </Card.Text>
      </Card.Body>
    </Card>
            </div>
        </div>
    </div>
  )
}

export default AboutUs