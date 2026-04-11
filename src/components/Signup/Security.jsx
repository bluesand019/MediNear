import React from "react";

const Security = ({setStage}) => {
    const submitHandler = (e) => {
        e.preventDefault();
    }
    const backBtnHandler = () => {
        setStage(2);
    }
  return (
    <div>
      <h4>ACCOUNT SECURITY</h4>
      <form onSubmit={submitHandler}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" /> <br />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
        />{" "}
        <br />
        <input type="checkbox" name="" id="" />
        <label htmlFor="">
          I agree to MediNear's Terms of Service and Privacy Policy. My
          health-related data will be handled securely.
        </label>
        <br />
        <input type="checkbox" name="" id="" />
        <label htmlFor="">
          Send me appointment reminders and health tips via SMS/email (optional)
        </label>
        <br />
        <button type="button" onClick={backBtnHandler}>Back</button>
        <button>Create account</button>
      </form>
      <p>or sign up with</p>
      <p>google</p>
    </div>
  );
};

export default Security;
