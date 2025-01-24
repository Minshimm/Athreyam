import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import backImage from '../assets/Images/in5.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { loginAPI, registerAPI, mergeCartAPI } from '../Services/allApi';

function Auth() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  // to hold registration details
  const [userDetails,setUserDetails] = useState({
    username : "",
    email : "",
    password : "",
    phone : "",
    address : ""
  })

  const handleRegister = async()=>{
    console.log(userDetails);
    const {username,email,password,phone,address} = userDetails;
    if(!username || !email || !password || !phone || !address){
      alert("Plz Fill Fields")
    }
    else{
      try{
           // API fetching
       const response = await registerAPI(userDetails);
       console.log(response);
       if(response.status==200){
        alert(response.data)
       }
       else{
        alert(response.response.data.message)
       }
       handleClose();
       navigate('/login')
      }
      catch(err){      
        console.log(err);
        
      }
    }
  }

  const handleSignIn = async () => {
  
    console.log(userDetails)
    const {email,password} = userDetails;
  if(!email || !password){
    alert("Plz Fill Fields")
  }
  else{
    try{
       // API fetching
       const response = await loginAPI(userDetails);
       console.log(response);
       if(response.status==200){
        const { currentUser, token } = response.data;
        sessionStorage.setItem('userId', currentUser._id);
        sessionStorage.setItem("username", currentUser.username);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", currentUser.role);
        sessionStorage.setItem("email",currentUser.email)
        sessionStorage.setItem("password",currentUser.password)
        sessionStorage.setItem("address",currentUser.address)
        sessionStorage.setItem("phone",currentUser.phone)
        // Merge guest cart with user's cart
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      if (guestCart.length > 0) {
        await mergeCartAPI(currentUser._id, guestCart);
        localStorage.removeItem("guestCart"); // Clear guest cart after merging
      }
        alert("Login Successfull")
        navigate(currentUser.role === 'admin' ? '/admin/dashboard' : '/');
       }
       else{
        console.log("error");
        
        alert("User Not Registered")
       }
    }
    catch(err){
      console.log(err);
      
    }
  }
  };

  return (
    <div
        style={{
      backgroundImage:`url(${backImage})`,
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'center',
      height:'450px',
      overflow:'hidden'
      }}>
        <div className="row">
        <div className="col-6 ">
            <form className='mx-5 px-5 text-center'>
            <h2 className='text-center mt-4 fw-bold' style={{color:'#53633f',letterSpacing: '5px'}}>SIGN IN</h2>
            <div className='form-floating mb-3 text-black'>
            <input type="email" placeholder='Email' className='form-control text-dark' onChange={e=>setUserDetails({...userDetails,email : e.target.value})}/>
            <label for="floatingInput">Email address</label>
            </div>
            <div className='form-floating mb-3 text-black'>
            <input type="password" placeholder='password' className='form-control text-dark' onChange={e=>setUserDetails({...userDetails,password : e.target.value})}/>
            <label for="floatingInput">Password</label>
            </div> 
              <div>
              <button className='btn text-light' style={{backgroundColor:'#53633f'}} type='button' onClick={handleSignIn}>Sign In</button>
              <p className='my-3 text-dark '>New to Here ? <Link to={'/register'}><a href="" className='text-danger fw-bold' onClick={handleShow}>Register Now</a> </Link></p>              
            </div>
            </form>         
        </div>
          <div className="col-6"></div>        
          </div>
          <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        
      >
        <Modal.Header closeButton className='bg-white'>
          <Modal.Title style={{color:'#53633f',letterSpacing: '5px'}} className='fw-bold text-uppercase'>User Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-white'>
         <form >
         <div className='form-floating mb-3 text-black'>
            <input type="text" placeholder='Username' className='form-control text-dark' onChange={e=>setUserDetails({...userDetails,username : e.target.value})}/>
            <label for="floatingInput">Full Name :</label>
            </div>
           <div className='form-floating mb-3 text-black'>
            <input type="email" placeholder='Email' className='form-control text-dark' onChange={e=>setUserDetails({...userDetails,email : e.target.value})}/>
            <label for="floatingInput">Email address :</label>
            </div>
            <div className='form-floating mb-3 text-black'>
            <input type="password" placeholder='password' className='form-control text-dark' onChange={e=>setUserDetails({...userDetails,password : e.target.value})}/>
            <label for="floatingInput">Password :</label>
            </div> 
            <div className='form-floating mb-3 text-black'>
            <input type="text" placeholder='phone' className='form-control text-dark' onChange={e=>setUserDetails({...userDetails,phone : e.target.value})}/>
            <label for="floatingInput">Phone Number :</label>
            </div> 
             <div className='form-floating  text-black'>
              <textarea type="text" className='form-control text-dark' placeholder='address' rows="3" onChange={e=>setUserDetails({...userDetails,address : e.target.value})}/>
              <label for="floatingInput">Billing Address :</label>
             </div>
         </form>
        </Modal.Body>
        <Modal.Footer className='bg-white'>
          <Button variant="success" style={{backgroundColor:'#53633f',color:'white'}} onClick={handleRegister}>REGISTER</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Auth