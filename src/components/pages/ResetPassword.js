import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import styled from "styled-components";


const ResetPassword = () => {

    const [values, setValues] = useState({
        email: ""
    })
    const [msg, setMsg] = useState("");

    
    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }
    
    const sendLink = async(e) =>{
        e.preventDefault();

        const res = await axios.post("http://localhost:9000/users/sendpasslink", values, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        console.log("res",res);
        const data = await res

        if(data?.status === 201 ){
            setValues({ [e.target.name]:""})
            setMsg(true)
        }else{
            toast.error("Invalid user.")
        }
    }
    return (
        <Wrapper>
            <section className="background-radial-gradient overflow-hidden">
                <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                    <div className="row gx-lg-5 align-items-center mb-5">
                        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                            <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                                Blog WebApp <br />
                                <span style={{ color: "hsl(218, 81%, 75%)" }}>for your better knowledge</span>
                            </h1>
                        </div>

                        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                            <div className="card bg-glass">
                                <div className="card-body px-4 py-5 px-md-5">
                                    <form>
                                        {/* {Object.keys(errors).length === 0 && isSubmit ? (<div className="alert alert-success" role="alert">Successfully login!!</div>) : (<div className="alert alert-info" role="alert">Please enter required details to Sign in !!</div>)} */}
                                        {msg ? <div className="alert alert-success" role="alert">password reset link send Successfully.!!</div> : ""}
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="form3Example3">Email address </label>
                                            <input type="text" placeholder="Email ID" id="form3Example3" className="form-control" name='email' value={values.email} onChange={handleChange} />
                                            {/* <p style={{ color: '#ad1fff' }}>{errors.email}</p> */}
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block mb-4 justify-content-center" onClick={sendLink}>
                                            Send
                                        </button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    .background-radial-gradient {
      background-color: hsl(218, 41%, 15%);
      background-image: radial-gradient(650px circle at 0% 0%,
          hsl(218, 41%, 35%) 15%,
          hsl(218, 41%, 30%) 35%,
          hsl(218, 41%, 20%) 75%,
          hsl(218, 41%, 19%) 80%,
          transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
          hsl(218, 41%, 45%) 15%,
          hsl(218, 41%, 30%) 35%,
          hsl(218, 41%, 20%) 75%,
          hsl(218, 41%, 19%) 80%,
          transparent 100%);
    }

    #radius-shape-1 {
      height: 220px;
      width: 220px;
      top: -60px;
      left: -130px;
      background: radial-gradient(#44006b, #ad1fff);
      overflow: hidden;
    }

    #radius-shape-2 {
      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
      bottom: -60px;
      right: -110px;
      width: 300px;
      height: 300px;
      background: radial-gradient(#44006b, #ad1fff);
      overflow: hidden;
    }

    .bg-glass {
      background-color: hsla(0, 0%, 100%, 0.9) !important;
      backdrop-filter: saturate(200%) blur(25px);
    }
  `;

export default ResetPassword