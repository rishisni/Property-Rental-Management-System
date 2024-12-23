import React, { useContext } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  
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
        <div className="d-flex align-items-center">
          <MDBNavbarBrand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img
              src="/images/logo.png" // Replace with your image path
              alt="Property Rent Logo"
              style={{ width: "110px", height: "40px", marginRight: "10px" }} // Adjust size and margin
            />
           
          </MDBNavbarBrand>

        </div>

        {/* Spacer */}
        <div className="flex-grow-1"></div>

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
                <MDBBtn size="sm" onClick={handleLogout}>Logout</MDBBtn>
              </MDBNavbarItem>
            </>
          ) : (
            <>
              <MDBNavbarItem>
                <MDBBtn onClick={() => navigate("/login")}>Login</MDBBtn>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBBtn onClick={() => navigate("/register")}>Register</MDBBtn>
              </MDBNavbarItem>
            </>
          )}
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Navbar;
