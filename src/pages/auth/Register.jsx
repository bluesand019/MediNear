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
        <input type="date" name="date-of-birth" id="date-of-birth" /> <br />
        <label>Gender</label> <br />
        <label htmlFor="male">Male</label>
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="female">Female</label>
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="other">Other</label>
        <input type="radio" id="other" name="gender" value="other" /> <br />
        <label htmlFor="bg">Blood group</label>
        {/* will change later */}
        <input type="text" name="bg" id="bg" /> <br />
        <button>Continue</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
