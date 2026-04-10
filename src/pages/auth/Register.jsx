import React from "react";

const Register = () => {
  return (
    <div className="form-container">
      <h1>MediNear</h1>
      <h2>Create your account</h2>
      <p>Free patient account — book services and track appointments</p>
    <div className="form">
      <form>
        <h4>PERSONAL INFORMATION</h4>
        <label htmlFor="First-name">First name</label> <br />
        <input type="text" id="First-name" name="First-name" /> <br />
        <label htmlFor="Last-name">Last name</label> <br />
        <input type="text" id="Last-name" name="Last-name" /> <br />
        <label htmlFor="date-of-birth">Date of birth</label>
        <input type="date" name="date-of-birth" id="date-of-birth" />
      </form>
    </div>
    </div>
  );
};

export default Register;
