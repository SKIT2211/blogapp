import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Blogpart from './Blogpart';
import Userdata from '../pages/Userdata';

// import Navbar from './Navbar';

function Protected() {
  let navigate = useNavigate();
  const [admin, setAdmin] = useState(false)
  let user = JSON.parse(localStorage.getItem("Loggedinuser"))


  useEffect(() => {
    if (user?.role === "Admin") {
      setAdmin(true)
    } else {
      navigate("/Login")
    }
     

  }, [user?.role]);

  return (
    <>
     {admin ? <Userdata /> : null}
    </>

  )
}

export default Protected;
