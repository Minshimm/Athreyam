import { Route , Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Home from './Pages/Home'
import AboutUs from './Pages/AboutUs'
import Auth from './Pages/Auth'
import ContactUs from './Pages/ContactUs'
import Alertmsg from './Components/Alertmsg'
import Pharmacy from './Pages/Pharmacy'
import MedicineRow from './Components/MedicineRow'
import Cart from './Pages/Cart'
import { CartProvider } from './Context/CartContext'
import PaymentGateway from './Pages/PaymentGateway'
import AdminDashboard from './Admin/AdminDashboard'
import ManageMedicine from './Admin/ManageMedicine'
import { Navigate } from 'react-router-dom'
import Living from './Pages/Living'
import ResortBooking from './Pages/ResortBooking'
import ManageBooking from './Admin/ManageBooking'

function App() {
  
  return (
    <>
     <CartProvider>     
      <Header/>
      <Alertmsg/>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Auth />} />
         <Route path="/register" element={<Auth/>} />
         <Route path="/aboutus" element={<AboutUs/>} />
         <Route path='/contactus' element={<ContactUs/>}/>
         <Route path='/pharmacy' element={<Pharmacy/>}/>
         <Route path='/medicine/:id' element={<MedicineRow/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/payment-gateway' element={<PaymentGateway/>}/>
         <Route path='/holistic-living' element={<Living/>}/>
         <Route path='/room-booking' element={<ResortBooking/>}/>
         {/* Admin Pages - Restricted to Admin Only */}
         <Route path="/admin/dashboard" element={<AdminDashboard />} />
         <Route path="/admin/manage-medicines" element={<ManageMedicine />} />
        <Route path='/admin/manage-booking' element={<ManageBooking/>}/>
          {/* Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer/>
   
      </CartProvider>
    </>
  )
}

export default App
