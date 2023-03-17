import React from 'react'
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../src/pages/Home'
import Blogpart from '../src/components/Blogpart';
import Aboutus from '../src/pages/Aboutus';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import BlogDetails from './components/BlogDetails';
import AdminNavbar from './components/AdminNavbar';
import Userdata from './pages/Userdata';
import Protected from './components/Protected';
let user =JSON.parse(localStorage.getItem("Loggedinuser"))

function App() {
  return (
    <>
      <BrowserRouter>
      {user?.role === "Admin" ? <AdminNavbar /> : <Navbar />}
    
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/aboutus' element={<Aboutus />} />

          
          <Route path='/blogpart' element={<Blogpart />} />
          <Route path='/blogs/:id' element={<BlogDetails />} />

          <Route path='/Userdetails' element={<Userdata />} /> 
          <Route path='/login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
