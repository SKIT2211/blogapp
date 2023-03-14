import React, {  useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

function Protected(props) {
    let navigate = useNavigate();
    let Cmp= props.Cmp

    useEffect(() => {
        if (!localStorage.getItem("Userdetails")) {
            navigate("/Login")
        }
        
    }, []);

    return (
      <>
      <Cmp />
      </>

    )
  }

export default Protected;
