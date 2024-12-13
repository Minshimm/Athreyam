import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Heading from '../assets/Images/Athreyam.png'
import { FaCartPlus } from "react-icons/fa6";
import { SiGnuprivacyguard } from "react-icons/si";
import { BiSolidContact } from "react-icons/bi";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FcSearch } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { useCart} from '../Context/CartContext'

function Header() {
  const   { cartItems } = useCart();  // Access cart items from CartContext
  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const [searchText, setSearchText] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
   
    const dropdownRef = useRef(null);
  
    const categories = ['All Categories', 'Yoga', 'Farm Fresh Veggies', 'Consultation'];
    const location = useLocation(); // Get the current location (path)

    // Check if the current path is an admin path
    const isAdminPath = location.pathname.startsWith("/admin");
  
    const handleCategorySelect = (category) => {
      setSelectedCategory(category); // Update selected category
      setSearchText(category); // Display the selected category in the input box
      setDropdownVisible(false); // Close dropdown
    };
  
    const handleSearch = () => {
      alert(`Searching for "${searchText}" in category "${selectedCategory}"`);
    };
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownVisible(false); // Close the dropdown
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup listener on component unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
  return (
    <div>
         <Navbar expand="lg" className="bg-white" style={{ padding: '0px',position: 'relative' }}>
        <Container>
          <Navbar.Brand href="#">
            <img src={Heading} alt="" width={'250px'} />
          </Navbar.Brand>
      {/* Search Bar */}
      <div
        ref={dropdownRef}
        style={{
          position: 'relative', // Ensures dropdown positions correctly
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '400px',
          color: 'black'
        }}
      >
        {/* Dropdown Toggle */}
        <div
          onClick={() => setDropdownVisible(!dropdownVisible)}
          style={{
            padding: '10px',
            background: '#f4f4f4',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {selectedCategory} ▾
        </div>

        {/* Dropdown Options */}
        {dropdownVisible && (
          <div
            style={{
              position: 'absolute',
              top: '40px', // Distance from the toggle button
              left: '0',
              zIndex: 999,
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              width: '100%', // Same width as the parent container
            }}
          >
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => handleCategorySelect(category)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  backgroundColor: category === selectedCategory ? '#e0e0e0' : '#fff',
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}

        {/* Input Box */}
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value); // Allow typing in the input box
            setDropdownVisible(false); // Close dropdown when typing
          }}
          placeholder="Search ATHREYAM facilities Here"
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            padding: '10px',
          }}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            padding: '10px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FcSearch />
        </button>
      </div>
       <Link to="/" className='mt-3 text-center' style={{ color: 'green', textDecoration:'none'}}>
      <IoHome className='fs-4'/><p style={{fontSize: 'small'}}>Home</p>
       </Link>
       <Link to="/login" className='mt-3 text-center text-dark' style={{  textDecoration:'none'}}><SiGnuprivacyguard className='fs-4'/><p style={{fontSize: 'small'}}>SignIn/SignUp</p>
       </Link>
       <Link to={'/contactus'} className='mt-3 text-center text-dark' style={{ textDecoration:'none'}}><BiSolidContact className='fs-4'/><p style={{fontSize: 'small'}}>Contact Us</p>
       </Link>
       <Link to={'/cart'} className='mt-3 text-center text-dark' style={{textDecoration:'none',position: "relative"}}>
       <FaCartPlus className='fs-4'/><p style={{fontSize: 'small'}}>Cart</p>
        {/* Cart Count Badge */}
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "10px",
            fontWeight: "bold",
          }}
        >
          {totalItems}
        </span>
      )}
       </Link>
       </Container>
      </Navbar>
      <Navbar expand="lg" collapseOnSelect className="bg-body-tertiary shadow text-dark position-sticky z-1" >
      <Container className='text-dark'>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link href='/aboutus' className='text-black'>AboutUs</Nav.Link>
            <Nav.Link href='/pharmacy' className='text-black'>Herbal Pharmacy</Nav.Link>
            <NavDropdown title="Fecilities">
              
              <NavDropdown.Item href='/holistic-living' className='text-dark  '>Living</NavDropdown.Item>
              
              
              <NavDropdown.Item href='' className='text-dark  '>Dining</NavDropdown.Item>
              <NavDropdown.Item href='' className='text-dark  '>Activities</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Wellness"  >
              <NavDropdown.Item href="" className='text-dark'>Yoga</NavDropdown.Item>
              <NavDropdown.Item href="" className='text-dark'>Karatte</NavDropdown.Item>
              <NavDropdown.Item href="" className='text-dark'>Kalari</NavDropdown.Item>      
            </NavDropdown>
            <NavDropdown title="Services">
              <NavDropdown.Item href="" className='text-dark'>Gausamrakshanam</NavDropdown.Item>
              <NavDropdown.Item href="" className='text-dark'>Annadhanam</NavDropdown.Item>
            </NavDropdown>
             {/* Admin Pages */}
      {isAdminPath && (
        <>
          <Link to="/admin/dashboard" style={{textDecoration:'none'}} className='text-dark mt-2 mx-2'>Admin Dashboard</Link>
          <Link to="/admin/manage-medicines" style={{textDecoration:'none'}} className='text-dark mt-2 mx-2'>Manage Medicines</Link>
          <Link to="/admin/manage-booking" style={{textDecoration:'none'}} className='text-dark mt-2 mx-2'>Manage Booking</Link>
        </>
      )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header