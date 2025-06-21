import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import "./App.css"
import {Routes,Route} from "react-router-dom";
import Login from './vendorDashboard/Components/forms/Login';
import Register from './vendorDashboard/Components/forms/Register';
import Addfirm from './vendorDashboard/Components/forms/Addfirm';
import Addproducts from './vendorDashboard/Components/forms/Addproducts';
import Navbar from './vendorDashboard/Components/Navbar';
import Allproducts from './vendorDashboard/Components/Allproducts';
import NotFound from './vendorDashboard/Components/NotFound';


const App = () => {
  return (
    <>
     <Navbar/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/addfirm' element={<Addfirm/>}/>
      <Route path='/addproduct' element={<Addproducts/>}/>
      <Route path='/allproducts' element={<Allproducts/>}/>
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
    </>
  )
}

export default App
