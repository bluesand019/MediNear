import React, { useState } from "react";
import Personal from "../../components/Signup/Personal";
import Contact from "../../components/Signup/Contact"
import Security from "../../components/Signup/Security"

const Register = () => {
  const [stage, setStage] = useState(1);
  let content;
  if(stage === 1) {
    content = <Personal setStage={setStage} />
  }
  else if (stage === 2) {
    content = <Contact setStage={setStage} />
  }
  else if (stage === 3) {
    content = <Security setStage={setStage} />
  }
  return (
    <div className="">
      <h2 >Create your account</h2>
      <p>Free patient account — book services and track appointments</p>
    <div className="form">
      {content}
    </div>
    </div>
  );
};

export default Register;
