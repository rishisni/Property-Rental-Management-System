import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import API from "../services/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(""); // State for storing booking status message

  // Wrap fetchPropertyDetails with useCallback
  const fetchPropertyDetails = useCallback(async () => {
    try {
      const response = await API.get(`/properties/${id}`);
      setProperty(response.data);
    } catch (err) {
      console.error("Error fetching property details:", err);
      setError("Failed to load property details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [id]); // Dependency array includes `id`

  useEffect(() => {
    fetchPropertyDetails();
  }, [fetchPropertyDetails]); // Include fetchPropertyDetails in the dependency array

  const handleBookProperty = async () => {
    try {
      let token = localStorage.getItem("token")?.trim();
      if (!token) {
        alert("You are not logged in. Please log in to book a property.");
        navigate("/login");
        return;
      }

      if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`;
      }

      const response = await API.post(`/bookings/book/${property.propertyId}`, null, {
        headers: { Authorization: token },
      });

      const message = response.data.message; // Fetch the message from the response

      // Check if the response contains a success message or error
      if (response.data.success === false || message.startsWith("Error:")) {
        setBookingStatus(message); // Display error message
      } else {
        setBookingStatus(message); // Display success message (Booking successful)
        navigate("/profile"); // Redirect to Profile page
      }
    } catch (error) {
      console.error("Error booking property:", error);
      setBookingStatus("Error: Insufficient wallet balance!"); // Handle unexpected errors
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error)
    return (
      <MDBTypography tag="h6" className="text-center text-danger my-5">
        {error}
      </MDBTypography>
    );

  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">Property Details</h1>
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="mb-3">
            <MDBCol sm="4">
              <strong>Property Name:</strong>
            </MDBCol>
            <MDBCol sm="8">{property.propertyName}</MDBCol>
          </MDBRow>
          <hr />
          <MDBRow className="mb-3">
            <MDBCol sm="4">
              <strong>Owner Name:</strong>
            </MDBCol>
            <MDBCol sm="8">{property.ownerName}</MDBCol>
          </MDBRow>
          <hr />
          <MDBRow className="mb-3">
            <MDBCol sm="4">
              <strong>Rent Amount:</strong>
            </MDBCol>
            <MDBCol sm="8">₹{property.rentAmount.toFixed(2)}</MDBCol>
          </MDBRow>
          <hr />
          <MDBRow className="mb-3">
            <MDBCol sm="4">
              <strong>Availability Status:</strong>
            </MDBCol>
            <MDBCol sm="8">
              {property.availabilityStatus ? "Available" : "Not Available"}
            </MDBCol>
          </MDBRow>
          <hr />
          <MDBRow>
            <MDBCol sm="12" className="text-center">
              <MDBBtn
                color="primary"
                onClick={handleBookProperty}
                disabled={!property.availabilityStatus}
              >
                {property.availabilityStatus ? "Book Property" : "Unavailable"}
              </MDBBtn>
            </MDBCol>
          </MDBRow>

          {/* Display booking status message */}
          {bookingStatus && (
            <MDBRow className="mt-4">
              <MDBCol sm="12" className="text-center">
                {bookingStatus.startsWith("Error:") ? (
                  <MDBTypography tag="h5" className="text-danger">
                    {bookingStatus}
                  </MDBTypography>
                ) : (
                  <MDBTypography tag="h5" className="text-success">
                    {bookingStatus}
                  </MDBTypography>
                )}
              </MDBCol>
            </MDBRow>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default PropertyDetails;
