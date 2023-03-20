import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';


function Home() {
  return (
    <Wrapper>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                Welcome to the Blog WebApp!! <br />
                <span  style={{ color: "hsl(218, 81%, 75%)" }}>
                  For more details refer <Link to="/blogpart">Blogs</Link> section
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                We also like to include free offers related to our content at
                the end of each blog post. When we do this, a reader can learn
                more about the topic we've just taught them about. And, when
                they fill out a simple form requesting the free resource, they
                can choose whether or not they'd like to be contacted about one
                of our products. This allows the reader to feel like they are
                receiving valuable information without being forced to learn
                about our products.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
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
export default Home;
