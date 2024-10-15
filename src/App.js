// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserForm from "./components/UserForm";
import Login from "./components/Login"; // Import the Login component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin login route */}
        <Route path="/" element={<Login />} /> {/* This will be the default route */}

        {/* User Submission Form route */}
        <Route path="/userform" element={<UserForm />} />

        {/* Admin Dashboard route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
