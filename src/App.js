import React from 'react'
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../src/pages/Home'
import Blogpart from '../src/components/Blogpart';
import Aboutus from '../src/pages/Aboutus';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
// import Protected from '../src/components/Protected';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />

          <Route path='/blogpart' element={<Blogpart />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
