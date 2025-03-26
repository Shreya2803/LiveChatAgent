import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";

import { sendPasswordResetEmail } from "firebase/auth";
const ResetPassword = () => {
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      navigate("/login");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Hope Buddy</span>
        <span className="title">Reset Password</span>
        <form onSubmit={handleResetPassword}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="New Password"></input>
          <input type="password" placeholder="Confirm Password"></input>
          <button>Reset Password</button>
        </form>
        <p>
          {" "}
          Go Back to <a href="/login"> Login Page </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
