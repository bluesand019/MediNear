import React, { useState } from "react";
import Personal from "../../components/Signup/Personal";

const Register = () => {
  const [stage, setStage] = useState(1);
  let content;
  if(stage === 1) {
    content = <Personal setStage={setStage} />
  }
  return (
    <div className="form-container">
      <h1>MediNear</h1>
      <h2>Create your account</h2>
      <p>Free patient account — book services and track appointments</p>
    <div className="form">
      {content}
    </div>
    </div>
  );
};

export default Register;
