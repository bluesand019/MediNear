import React from 'react'

const Contact = ({setStage}) => {
    const submitHandler = (e) => {
        e.preventDefault();
        setStage(3);
    }
    const backBtnHandler = () => {
        setStage(1);
    }
  return (
    <form onSubmit={submitHandler}>
        <h4>CONTACT DETAILS</h4>
        <label htmlFor="phone">Phone number</label> <br />
        <input type="text" id='phone' name='phone' /> <br />
        <label htmlFor="email">Email address</label> <br />
        <input type="email" id='email' name='email' /> <br />
        <label htmlFor="division">Division</label> <br />
        <input type="text" id='division' name='division' /> <br />
        <label htmlFor="city">City/Upazila</label> <br />
        <input type="text" id='city' name='city' /> <br />
        <button type= "button" onClick={backBtnHandler}>Back</button>
        <button>Continue</button>
    </form>
  )
}

export default Contact
