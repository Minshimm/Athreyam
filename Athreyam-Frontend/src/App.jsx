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
import SoldMedicine from './Admin/SoldMedicine'
import { Navigate } from 'react-router-dom'
import Living from './Pages/Living'
import ResortBooking from './Pages/ResortBooking'
import ManageBooking from './Admin/ManageBooking'
import PrivateRoute from './Components/PrivateRoute'
import Payment from './Components/Payment'
import UserProfile from './Pages/UserProfile'
import ViewUsers from './Admin/ViewUsers'
import ManageRooms from './Admin/ManageRooms'
// import { AuthProvider } from './Context/AuthContext'
// import ProtectedRoute from './Components/ProtectedRoute';
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
         <Route path="/user/profile" element={<UserProfile />} />
         <Route path="/aboutus" element={<AboutUs/>} />
         <Route path='/contactus' element={<ContactUs/>}/>
         <Route path='/pharmacy' element={<Pharmacy/>}/>
         <Route path='/medicine/:id' element={<MedicineRow/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path="/payment-gateway" element={<PaymentGateway />} />
         <Route path='/holistic-living' element={<Living/>}/>
         <Route path='/room-booking' element={<ResortBooking/>}/>
         <Route path='/payment' element={<Payment/>}/>
         {/* Admin Pages - Restricted to Admin Only */}
         <Route path="/admin/dashboard" element={<PrivateRoute> <AdminDashboard /></PrivateRoute>} />
         <Route path="/admin/manage-medicines" element={<PrivateRoute ><ManageMedicine /></PrivateRoute>} />
         <Route path="/admin/sold-medicines" element={<PrivateRoute><SoldMedicine/></PrivateRoute>} />
         <Route path="/admin/view-users" element={<PrivateRoute><ViewUsers/></PrivateRoute>} />
         <Route path='/admin/manage-rooms' element={<PrivateRoute><ManageRooms/></PrivateRoute>}/>
        <Route path='/admin/manage-booking' element={<PrivateRoute><ManageBooking/></PrivateRoute>}/>
          {/* Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer/>
     
      </CartProvider>
    </>
  )
}

export default App
