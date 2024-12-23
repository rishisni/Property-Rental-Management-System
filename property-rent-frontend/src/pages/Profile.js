import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";
import API from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState("");

  // Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in. Please log in to view your profile.");
        setLoading(false);
        return;
      }

      const response = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Get Wallet Balance
  const getWalletBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/users/wallet-balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Wallet Balance:", response.data.walletBalance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      setError("Failed to fetch wallet balance.");
    }
  };

  // Handle Top-Up Wallet
  const handleTopUp = async () => {
    if (!topUpAmount || topUpAmount <= 0) {
      setError("Please enter a valid amount to top up.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in. Please log in to top up.");
        return;
      }

      const response = await API.post(
        "/users/wallet/topup",
        {
          token: token,
          amount: topUpAmount,
        }
      );

      if (response.status === 200) {
        alert(response.data); // Display success message from backend
        setModalOpen(false);
        fetchUserProfile(); // Refresh balance after successful top-up
      } else {
        setError("Failed to add balance. Please try again.");
      }
    } catch (err) {
      console.error("Error topping up wallet:", err);
      setError("Failed to top up wallet. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center my-5 text-danger">{error}</div>;
  }

  return (
    <MDBContainer className="my-5">
      <h1 className="text-center mb-4">My Profile</h1>
      <MDBCard>
        <MDBCardBody>
          {/* Email */}
          <MDBRow className="mb-3">
            <MDBCol sm="4">
              <strong>Email:</strong>
            </MDBCol>
            <MDBCol sm="8">{user.email}</MDBCol>
          </MDBRow>
          <hr />
          {/* User Name */}
          <MDBRow className="mb-3">
            <MDBCol sm="4">
              <strong>User Name:</strong>
            </MDBCol>
            <MDBCol sm="8">{user.userName}</MDBCol>
          </MDBRow>
          <hr />
          {/* Wallet Balance */}
          <MDBRow className="mb-3">
            <MDBCol sm="4">
              <strong>Wallet Balance:</strong>
            </MDBCol>
            <MDBCol sm="4">₹{user.walletBalance.toFixed(2)}</MDBCol>
            <MDBCol sm="4">
              <MDBBtn
                color="primary"
                onClick={() => {
                  setModalOpen(true);
                }}
                className="w-100"
              >
                Add Balance
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <hr />
          {/* Role */}
          <MDBRow>
            <MDBCol sm="4">
              <strong>Role:</strong>
            </MDBCol>
            <MDBCol sm="8">{user.role}</MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

      {/* Modal for Wallet Top-Up */}
      {user && (
        <MDBModal open={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Top Up Wallet</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => setModalOpen(false)}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <div className="text-center">
                  <p>Current Balance: ₹{user.walletBalance.toFixed(2)}</p>
                  <MDBInput
                    type="number"
                    label="Enter Amount to Top Up"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    min="1"
                  />
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={() => setModalOpen(false)}>
                  Close
                </MDBBtn>
                <MDBBtn color="primary" onClick={handleTopUp}>
                  Submit
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </MDBContainer>
  );
};

export default Profile;
