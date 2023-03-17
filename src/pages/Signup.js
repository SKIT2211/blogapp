import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        number: "",
        password: ""
    })
    const [errors, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    // const [isAlreadyUser, setIsAlreadyUser] = useState(false);
    const navigate = useNavigate();



    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }


    async function handleSubmit(e) {
        e.preventDefault();
        setError(Validation(values));
        setIsSubmit(true)
        
        {
            let result = await fetch("http://localhost:5000/userDetails", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(values)
            });
            result = await result.json();
            localStorage.setItem("Userdetails", JSON.stringify(result));
            navigate("/Login")
        }
    }   

    useEffect(() => {
        if (Object.keys(errors).length === 0 & isSubmit) {
            console.log(values);
        }
    }, [errors, isSubmit, values]
    )



    const Validation = (values) => {
        let errors = {}
        let regexForEmail = /^([A-Za-z0-9._-])+@([A-Za-z0-9._-])+\.([A-Za-z]{2,4})$/;
        let regexForPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

        if (!values.name) {
            errors.name = "Name required!!"
        }
        else if (values.name.length < 8) {
            errors.name = "Name should have 8 letters!! "
        }

        if (!values.email) {
            errors.email = "Email required!!"
        }
        else if (!regexForEmail.test(values.email)) {
            errors.email = "Email must be like this test@gmail.com "
        }

        if (!values.number) {
            errors.number = "Number required!!"
        }
        else if (isNaN(values.number)) {
            errors.number = "Number should have numbers!! "
        }
        else if (values.number.length < 10) {
            errors.number = "Number should have 10 numbers!! "
        }


        if (!values.password) {
            errors.password = "Password required!!"
        }
        else if (!regexForPassword.test(values.password)) {
            errors.password = "Password must be like this \"Test@123\"!!"
        }

        return errors;
    }

    return (
        <>
            <Wrapper>
                <section className="background-radial-gradient overflow-hidden">
                    <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                        <div className="row gx-lg-5 align-items-center mb-5">
                            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
                                <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                                    Blog WebApp <br />
                                    <span style={{ color: "hsl(218, 81%, 75%)" }}>Register to access blogWeb Community!</span>
                                </h1>
                                <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                                    We also like to include free offers related to our content at the end of each blog post. When we do this, a reader can learn more about the topic we've just taught them about. And, when they fill out a simple form requesting the free resource, they can choose whether or not they'd like to be contacted about one of our products. This allows the reader to feel like they are receiving valuable information without being forced to learn about our products.
                                </p>
                            </div>

                            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                                <div className="card bg-glass">
                                    <div className="card-body px-4 py-5 px-md-5">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                {/* <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="form3Example1" className="form-control" />
                                                        <label className="form-label" htmlFor="form3Example1">First name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="form3Example2" className="form-control" />
                                                        <label className="form-label" htmlFor="form3Example2">Last name</label>
                                                    </div>
                                                </div> */}
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <label className="form-label" htmlFor="form3Example1">Name</label>
                                                        <input type="text" placeholder="Name" id="form3Example1" className="form-control" name='name' value={values.name} onChange={handleChange} />
                                                        <p style={{ color: '#ad1fff' }}>{errors.name}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                                                <input type="text" placeholder="Email ID" id="form3Example3" className="form-control" name='email' value={values.email} onChange={handleChange} />
                                                <p style={{ color: '#ad1fff' }}>{errors.email}</p>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4">Mobile Number</label>
                                                <input type="text" placeholder="Mobile Number" id="form3Example4" className="form-control" name='number' value={values.number} onChange={handleChange} />
                                                <p style={{ color: '#ad1fff' }}>{errors.number}</p>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example5">Password</label>
                                                <input type="password" placeholder="Password" id="form3Example5" className="form-control" name='password' value={values.password} onChange={handleChange} />
                                                <p style={{ color: '#ad1fff' }}>{errors.password}</p>
                                            </div>



                                            <button type="submit" className="btn btn-primary btn-block mb-4 justify-content-center">
                                                Sign Up
                                            </button>

                                            <div>
                                                Alreday have an account?
                                                <a href='/Login'> Sign In</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Wrapper>
        </>
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
export default Signup;