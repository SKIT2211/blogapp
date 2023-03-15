import React, {  useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

function Protected(props) {
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("Userdetails")) {
            navigate("/Login")
            return 
        }
        
    }, []);

    return (
      <>
      {props.childrens}
      </>

    )
  }

export default Protected;
