import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <h5>About Us</h5>
            <p>
              We provide the best property rental services with a wide range
              of properties to choose from. Our mission is to make renting
              simple and easy for everyone.
            </p>
          </MDBCol>
          <MDBCol md="6">
            <h5>Contact Us</h5>
            <p>
              Email: support@propertyrent.com
              <br />
              Phone: +1 234 567 890
            </p>
            <MDBRow>
              <MDBCol>
                <a href="https://www.facebook.com" className="text-white">
                  <MDBIcon fab icon="facebook-f" size="lg" />
                </a>
              </MDBCol>
              <MDBCol>
                <a href="https://www.twitter.com" className="text-white">
                  <MDBIcon fab icon="twitter" size="lg" />
                </a>
              </MDBCol>
              <MDBCol>
                <a href="https://www.instagram.com" className="text-white">
                  <MDBIcon fab icon="instagram" size="lg" />
                </a>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow className="text-center">
          <MDBCol>
            <p>&copy; {new Date().getFullYear()} Easy Rent. All rights reserved.</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </footer>
  );
};

export default Footer;
