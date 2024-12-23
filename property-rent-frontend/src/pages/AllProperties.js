import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await API.get("/properties/all");
        setProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
        setError("Unable to fetch properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleViewProperty = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  if (loading) {
    return <div className="text-center my-5">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center text-danger my-5">{error}</div>;
  }

  if (properties.length === 0) {
    return <div className="text-center my-5">No properties available at the moment.</div>;
  }

  // Separate properties based on availability
  const availableProperties = properties.filter((property) => property.availabilityStatus);
  const bookedProperties = properties.filter((property) => !property.availabilityStatus);

  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">All Properties</h1>

      {/* Available Properties Section */}
      <section>
        <h2 className="mb-3 text-success">🏡 Available Properties</h2>
        {availableProperties.length === 0 ? (
          <div className="text-center mb-4">No available properties at the moment.</div>
        ) : (
          <MDBRow>
            {availableProperties.map((property) => (
              <MDBCol key={property.propertyId} md="4" className="mb-4">
                <MDBCard border="success">
                  <MDBCardBody>
                    <MDBCardTitle>{property.propertyName}</MDBCardTitle>
                    <MDBCardText>
                      <strong>Owner:</strong> {property.ownerName}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>Rent Amount:</strong> ${property.rentAmount}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>Status:</strong> Available
                    </MDBCardText>
                    <MDBBtn
                      color="success"
                      onClick={() => handleViewProperty(property.propertyId)}
                    >
                      View Details
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        )}
      </section>

      <hr className="my-5" />

      {/* Booked Properties Section */}
      <section>
        <h2 className="mb-3 text-primary">🏢 Booked Properties</h2>
        {bookedProperties.length === 0 ? (
          <div className="text-center mb-4">No booked properties at the moment.</div>
        ) : (
          <MDBRow>
            {bookedProperties.map((property) => (
              <MDBCol key={property.propertyId} md="4" className="mb-4">
                <MDBCard border="primary">
                  <MDBCardBody>
                    <MDBCardTitle>{property.propertyName}</MDBCardTitle>
                    <MDBCardText>
                      <strong>Owner:</strong> {property.ownerName}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>Rent Amount:</strong> ₹{property.rentAmount}
                    </MDBCardText>
                    <MDBCardText>
                      <strong>Status:</strong> Booked
                    </MDBCardText>
                    <MDBBtn
                      color="primary"
                      onClick={() => handleViewProperty(property.propertyId)}
                    >
                      View Details
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        )}
      </section>
    </MDBContainer>
  );
};

export default AllProperties;
