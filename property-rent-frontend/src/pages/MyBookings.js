import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBSpinner,
} from "mdb-react-ui-kit";
import API from "../services/api"; // Ensure this points to your API service configuration

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch bookings for the logged-in user
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token")?.trim();
  
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }
  
      const formattedToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  
      const response = await API.get("/bookings/user/properties", {
        headers: { Authorization: formattedToken },
      });
  
      setBookings(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized access. Please log in again.");
      } else if (err.response?.status === 404) {
        setError("No bookings found for your account.");
      } else {
        setError("Failed to fetch bookings. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch bookings when the component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-center my-5 text-danger">{error}</div>;
  }

  if (bookings.length === 0) {
    return <div className="text-center my-5">No bookings found.</div>;
  }

  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">My Bookings</h1>
      {bookings.map((property) => (
        <MDBCard key={property.propertyId} className="mb-3">
          <MDBCardBody>
            <MDBRow className="mb-3">
              <MDBCol sm="4">
                <strong>Property Name:</strong>
              </MDBCol>
              <MDBCol sm="8">{property.propertyName}</MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol sm="4">
                <strong>Owner Name:</strong>
              </MDBCol>
              <MDBCol sm="8">{property.ownerName}</MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
              <MDBCol sm="4">
                <strong>Rent Amount:</strong>
              </MDBCol>
              <MDBCol sm="8">₹{property.rentAmount.toFixed(2)}</MDBCol>
            </MDBRow>
            
          </MDBCardBody>
        </MDBCard>
      ))}
    </MDBContainer>
  );
};

export default MyBookings;
