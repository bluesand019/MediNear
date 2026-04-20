import React from 'react';

const Contact = ({ setStage }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    setStage(3);
  };

  const inputStyle = "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100";
  const labelStyle = "text-xs font-medium text-gray-500 mb-1 block";

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-5">
      <h4 className="text-xs font-medium tracking-widest text-teal-600 uppercase">Contact Details</h4>
      
      <div>
        <label className={labelStyle}>Phone number</label>
        <input type="text" className={inputStyle} placeholder="017XX XXXXXX" required />
      </div>

      <div>
        <label className={labelStyle}>Email address</label>
        <input type="email" className={inputStyle} placeholder="example@mail.com" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelStyle}>Division</label>
          <input type="text" className={inputStyle} placeholder="Dhaka" />
        </div>
        <div>
          <label className={labelStyle}>City/Upazila</label>
          <input type="text" className={inputStyle} placeholder="Dhanmondi" />
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <button 
          type="button" 
          onClick={() => setStage(1)} 
          className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button 
          type="submit" 
          className="flex-[2] bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 active:scale-95 transition"
        >
          Continue →
        </button>
      </div>
    </form>
  );
};

export default Contact;