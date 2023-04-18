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
import ProtectedBlog from '../ProtectedBlog';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import PageNotFound from '../pages/PageNotFound';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/aboutus' element={<Aboutus />} />

          <Route path='/blogpart' element={<Blogpart />} />
          <Route path='/blogs/:id' element={<ProtectedBlog> <BlogDetails /> </ProtectedBlog> } />

          <Route path='/myblogs' element={<Myblogs />} />


          <Route path='/Userdetails' element={<Protected><Userdata /></Protected>} />
          <Route path='/login' element={ <Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/forgotpassword/:id/:token' element={<ForgotPassword />} />
          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router;
