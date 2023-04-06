import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import Home from '../pages/Home'
import Blogpart from '../Blogpart';
import Aboutus from '../pages/Aboutus';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import BlogDetails from '../BlogDetails';
import Myblogs from '../Myblogs';
import Userdata from '../pages/Userdata';
import Protected from '../Protected';

function Router() {
  let user = JSON.parse(localStorage.getItem("Loggedinuser"))
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/aboutus' element={<Aboutus />} />

          <Route path='/blogpart' element={<Blogpart />} />
          <Route path='/blogs/:id' element={user ? <BlogDetails /> : <Login />} />

          <Route path='/myblogs' element={<Myblogs />} />


          <Route path='/Userdetails' element={<Protected><Userdata /></Protected>} />
          <Route path='/login' element={user ? <Home /> : <Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router;
