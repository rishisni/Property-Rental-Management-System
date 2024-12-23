import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AllProperties from "./pages/AllProperties";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import MyBookings from "./pages/MyBookings";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/properties/add" element={<AddProperty />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/properties/all" element={<AllProperties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
