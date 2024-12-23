import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
 
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
    walletBalance: 0,
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/register", formData);
      alert(response.data);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="/images/home.jpg"
              alt="register form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                
                <span className="h1 fw-bold mb-0">Register</span>
              </div>

              <h5 className="fw-normal my-4 pb-3">
                Create your account
              </h5>

              <form onSubmit={handleRegister}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="User Name"
                  id="userName"
                  type="text"
                  size="lg"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="email"
                  type="email"
                  size="lg"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Wallet Balance"
                  id="walletBalance"
                  type="number"
                  size="lg"
                  value={formData.walletBalance}
                  onChange={(e) =>
                    setFormData({ ...formData, walletBalance: e.target.value })
                  }
                  required
                />
                <MDBBtn className="mb-4 px-5" size="lg" type="submit">
                  Register
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register;
