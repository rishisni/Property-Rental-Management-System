import React, { useContext } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <MDBNavbarBrand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <MDBIcon fas icon="home" className="me-2" />
          Property Rent
        </MDBNavbarBrand>

        {/* Navigation */}
        <MDBNavbarNav className="d-flex align-items-center">
          {user ? (
            <>
              <MDBNavbarItem>
                <MDBBtn color="link" className="nav-link" onClick={() => navigate("/")}>Home</MDBBtn>
              </MDBNavbarItem>

              {user.role === "USER" && (
                <>
                  <MDBNavbarItem>
                    <MDBBtn color="link" className="nav-link" onClick={() => navigate("/profile")}>Profile</MDBBtn>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBBtn color="link" className="nav-link" onClick={() => navigate("/properties/all")}>Properties</MDBBtn>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBBtn color="link" className="nav-link" onClick={() => navigate("/bookings")}>My Bookings</MDBBtn>
                  </MDBNavbarItem>
                </>
              )}

              {user.role === "ADMIN" && (
                <>
                  <MDBNavbarItem>
                    <MDBBtn color="link" className="nav-link" onClick={() => navigate("/properties/add")}>Add Property</MDBBtn>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBBtn color="link" className="nav-link" onClick={() => navigate("/properties/all")}>All Properties</MDBBtn>
                  </MDBNavbarItem>
                </>
              )}

              {/* Logout */}
              <MDBNavbarItem>
                <MDBBtn size="sm" color="primary" onClick={handleLogout}>Logout</MDBBtn>
              </MDBNavbarItem>
            </>
          ) : (
            <>
              <MDBNavbarItem>
                <MDBBtn color="primary" onClick={() => navigate("/login")}>Login</MDBBtn>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBBtn color="secondary" onClick={() => navigate("/register")}>Register</MDBBtn>
              </MDBNavbarItem>
            </>
          )}
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
