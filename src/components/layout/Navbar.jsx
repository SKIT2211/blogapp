import { Avatar } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  let user = JSON.parse(localStorage.getItem("Loggedinuser"));
  user = user?.data;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("Loggedinuser");
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    toast("Logout Successfully.!!");
    navigate("/login");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light  border border-dark rounded"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          {user?.role === "Admin" && (
            <>
              <button
                style={{
                  marginRight: "20px",
                  backgroundColor: "rgb(153, 31, 205)",
                }}
                className="btn"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <img
                  src="https://img.icons8.com/ios/1x/line-width.png"
                  alt="img"
                  width={"25px"}
                ></img>
              </button>

              <div
                style={{ width: "180px", backgroundColor: "#e3f2fd" }}
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div className="offcanvas-header" style={{ marginTop: "15px" }}>
                  <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                    AdminAccess
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  className="offcanvas-body"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "rgb(135, 185, 205)",
                  }}
                >
                  <Link to="/home" className="dropdown-item">
                    Home
                  </Link>
                  <Link to="/myblogs" className="dropdown-item">
                    My Blogs
                  </Link>
                  <Link to="/blogpart" className="dropdown-item">
                    All Blogs
                  </Link>
                  <Link to="/Userdetails" className="dropdown-item">
                    All Users
                  </Link>
                </div>
              </div>
            </>
          )}

          <Link to="/home" className="navbar-brand">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAACHCAMAAABXs/kcAAAAeFBMVEX///9EUEWe1cs8ST1BTULo6eh3fng0QjWkqKT8/PwoOSma08k5Rjrs7ewvPjDx8vHP0c/a3Nq6vbqu29N+hX8iNCSR0MVgaWHGycYeMR8SKRSXm5dvd3D0+vlnb2fG5uBMV03V7OeLkYtXYVjh8e6tsa0EIgi74dqnwdgmAAAECUlEQVR4nO2Z2XabMBBAAQlkdrOYxSwG2yn//4dlkVhFmtMixzmd+5CTmABXwzAjyZIEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8Duv7JsddpfBE1q1DucQ/pSYnK03spqw8HY4ucecc+DISRcX8nYT0kcseVc8y79ocu/sut9rGRPEhxApwNQ0H567V2UY3B1+EEURvGgvHrtXb5iq/8eq1dwFcszJf4uu2dz6o9K148X71o2Slwutsi1HbyxaVmpC1I+7D3fZ+3JjBNJWjqjbLuZ/mjeuR3X6gy85UxLWyIyCw11r5FoJitrdL/rFe2D4sgjDEiVpUJbDCj74xLafN8b1HnyoiCYrqKV17wdD6Rk5f6yiRWt77N3LYLsjIKexZanI+IsJbI9ZWtyl37NpGywjSpsGfg9QWMj5f6ys595Vuba91WuOkv4VYb3VZYfamvTJKFb6FwfBXz2V1CI5zzcSzmpZv5YueaWmNGhAvfepMNY4C9SRejKdKOmHdu8iWlr3qZzO54dee+PNuuSLRXuLMxIjkP82r8KxbrS7T+AXrM1/BnvgUvG7oA15Jb0tpgPbpFipezUvFLSEKM/S2mbe18ofEJZ768t40mBEsH/BjeMP1BR2wISQjmi+70Ax0P98PlzPe25xuM47NYBUvYDEpISWO+1on50geK46/5JtSXsCWrzQaQCfEl6/jKfxffccXqsg+E+Lo03f4yfwPJW4eT5QM57d70H9BDi18fnHl9eO753iSVPY9qSIix24nxlU6s3H9af7ntoq2/T8llBQz1wmrM6tmxvu6pImGXcqrMWPY3bdHf1pMz5tsNeDwnlbVHOna4Y31jB2PidMIhr/2v5w9PboCjWzdyZxoxms+Cj/TNnCHn3K4gLCevQ/au52f8APcTSt/Znn+0b0wD0QU42d5vOf/t9kt4b1w0rIn0nP+EDvRlTRP1PTNxVhNYur6gM5l+5sKpwFHDrhbzhA+NLw1dNfT8BFvzO7H123nY7zPaG+vBxrdP3gG75KTEob620QpjY2zCGibb9bEeOn2wW/siapc/ijlKt78959fLrE2Ij60P5/h6nXd4Lys3+w+Sm1lXJ+yeQbs2DuqiDqKoXcubURTciuX1vDtOiYUQuThCfCVX9ezlB/3+jructdp0w0epez+9qG9N09TFyrY/38vCXMsSj7YcQf3tcNyUxlfUEvlgkk92EN+Qcb6T8r/DeTPUcly/fbfKn9H9ab5D7n/+/29Gz2a7fkTcnt9R+OnULaz3D69UThM9fBG90X4A49pExtZPKA4amzVZDvfr3XfjTL8PJaWgzdSj8VPHctL4hzTiFu90P3k/4E0DAAAAAAAAAAAAAAAAAAAAAAAAAOA9+A20dzlVUgvK0wAAAABJRU5ErkJggg=="
              height="70"
              alt="Blog-logo"
              style={{ borderRadius: "20px" }}
            ></img>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
              <Link to="/home" className="nav-item nav-link ">
                Home
              </Link>
              <Link to="/blogpart" className="nav-item nav-link">
                Blogs
              </Link>
              <Link to="/aboutus" className="nav-item nav-link">
                About Us
              </Link>
            </div>

            <div className="navbar-nav ms-auto ">
              <div className="navbar-nav">
                {user ? (
                  <div>
                    <div
                      style={{ textDecoration: "none" }}
                      className="dropdown-toggle d-flex align-items-center hidden-arrow"
                      id="navbarDropdownMenuAvatar"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <Avatar
                        alt={user.name}
                        src="..."
                        style={{
                          marginLeft: "200px",
                          backgroundColor: "rgb(153, 31, 205)",
                        }}
                      />
                    </div>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdownMenuAvatar"
                    >
                      <li>
                        <Button variant="outlined" onClick={handleClickOpen}>
                          Profile
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <div style={{ backgroundColor: "#e3f2fd" }}>
                            <DialogTitle id="alert-dialog-title">
                              My Profile
                              <Avatar
                                alt={user.name}
                                src="..."
                                style={{ marginLeft: "200px" }}
                                sx={{ bgcolor: "gray" }}
                              />
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                <div>Name : {user.name}</div>
                                <div>Email : {user.email}</div>
                                <div>Number : {user.number}</div>
                                <div>Role : {user.role}</div>
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Close</Button>
                            </DialogActions>
                          </div>
                        </Dialog>
                      </li>
                      <li>
                        <Button variant="outlined" onClick={logoutHandler}>
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <Button variant="outlined">
                      <Link to="/login" className=" btn-outline-info">
                        {" "}
                        Login
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}
export default Navbar;
