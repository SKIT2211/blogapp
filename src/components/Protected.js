import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Userdata from './pages/Userdata';



function Protected() {
  let navigate = useNavigate();
  const [admin, setAdmin] = useState(false)
  let user = JSON.parse(localStorage.getItem("Loggedinuser"))


  useEffect(() => {
    if (user?.role === "Admin") {
      setAdmin(true)
    } else {
      navigate("/login")
    }
     

  }, [user?.role]);

  return (
    <>
     {admin ? <Userdata /> : null}
    </>

  )
}


export default Protected;
