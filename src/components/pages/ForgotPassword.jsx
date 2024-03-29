import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";
import { userValidd } from "../../services/UserApi";
import { APIS } from "../../constants/constant";

const ForgotPassword = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const userValid = async () => {
    let response = await userValidd(params);
    if (response.status === 201) {
      toast.success("user valid");
    } else {
      navigate("/*");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  const sendPassword = async (e) => {
    e.preventDefault();
    //  let response = await userValidd(params)

    const res = await axios.post(
      `${APIS.USERS_API}/${params.id}/${params.token}`,
      { password: password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await res;

    if (data.status === 201) {
      setPassword("");
      setMsg(true);
    } else {
      toast.error("token expired..");
    }
  };
  useEffect(() => {
    return () => userValid();
  }, []);

  return (
    <Wrapper>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form>
                    {msg ? (
                      <div className="alert alert-success" role="alert">
                        password Reset Successfully.!!
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3">
                        Reset Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter New Password"
                        id="form3Example3"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={setval}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4 justify-content-center"
                      onClick={sendPassword}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .background-radial-gradient {
    background-color: hsl(218, 41%, 15%);
    background-image: radial-gradient(
        650px circle at 0% 0%,
        hsl(218, 41%, 35%) 15%,
        hsl(218, 41%, 30%) 35%,
        hsl(218, 41%, 20%) 75%,
        hsl(218, 41%, 19%) 80%,
        transparent 100%
      ),
      radial-gradient(
        1250px circle at 100% 100%,
        hsl(218, 41%, 45%) 15%,
        hsl(218, 41%, 30%) 35%,
        hsl(218, 41%, 20%) 75%,
        hsl(218, 41%, 19%) 80%,
        transparent 100%
      );
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
export default ForgotPassword;
