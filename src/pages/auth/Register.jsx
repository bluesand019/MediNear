import React from "react";
import Personal from "../../components/Signup/Personal";

const Register = () => {
  return (
    <div className="form-container">
      <h1>MediNear</h1>
      <h2>Create your account</h2>
      <p>Free patient account — book services and track appointments</p>
    <div className="form">
      <Personal />
    </div>
    </div>
  );
};

export default Register;
