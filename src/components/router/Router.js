import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Home from '../pages/Home'
import Blogpart from '../pages/Blogpart';
import Aboutus from '../pages/Aboutus';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import BlogDetails from '../pages/BlogDetails';
import Myblogs from '../pages/Myblogs';
import Userdata from '../pages/Userdata';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import PageNotFound from '../pages/PageNotFound';
import Protected from '../auth/ProtectedUsers';
import ProtectedBlog from '../auth/ProtectedBlog';

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

          <Route path='/login' element={ <Login />} />
          <Route path='/signup' element={<Signup />} />
          
          <Route path='/Userdetails' element={<Protected><Userdata /></Protected>} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/forgotpassword/:id/:token' element={<ForgotPassword />} />
          <Route path='*' element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router;
