import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [propertyName, setPropertyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!propertyName || !ownerName || !rentAmount) {
      setError("Please fill all the required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/properties/add", {
        propertyName,
        ownerName,
        rentAmount,
        availabilityStatus,
      });

      if (response.status === 200) {
        navigate("/properties/all");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      setError("Unable to add property. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">Add New Property</h1>
      <MDBRow>
        <MDBCol md="6" className="mx-auto">
          <MDBCard>
            <MDBCardBody>
              <MDBCardTitle>Add Property Details</MDBCardTitle>
              {error && (
                <div className="text-danger text-center mb-3">
                  <strong>{error}</strong>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <MDBInput
                  label="Property Name"
                  type="text"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="mb-3"
                  required
                />
                <MDBInput
                  label="Owner Name"
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="mb-3"
                  required
                />
                <MDBInput
                  label="Rent Amount"
                  type="number"
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                  className="mb-3"
                  required
                />
                <MDBCheckbox
                  label="Available for Rent"
                  checked={availabilityStatus}
                  onChange={() => setAvailabilityStatus(!availabilityStatus)}
                  className="mb-3"
                />
                <MDBBtn color="primary" type="submit" block disabled={loading}>
                  {loading ? "Adding..." : "Add Property"}
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AddProperty;
