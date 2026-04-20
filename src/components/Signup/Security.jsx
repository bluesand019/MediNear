import React from "react";

const Security = ({ setStage }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    alert("Account Created!"); // Replace with your logic
  };

  const inputStyle = "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100";
  const labelStyle = "text-xs font-medium text-gray-500 mb-1 block";

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-xs font-medium tracking-widest text-teal-600 uppercase text-center">Account Security</h4>
      
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div>
          <label className={labelStyle}>Password</label>
          <input type="password" className={inputStyle} placeholder="••••••••" required />
        </div>
        
        <div>
          <label className={labelStyle}>Confirm password</label>
          <input type="password" className={inputStyle} placeholder="••••••••" required />
        </div>

        <div className="space-y-3 mt-2">
          <label className="flex gap-3 cursor-pointer group">
            <input type="checkbox" className="mt-1 accent-teal-600 h-4 w-4" required />
            <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700">
              I agree to MediNear's <span className="text-teal-600 font-medium">Terms of Service</span> and <span className="text-teal-600 font-medium">Privacy Policy</span>.
            </span>
          </label>

          <label className="flex gap-3 cursor-pointer group">
            <input type="checkbox" className="mt-1 accent-teal-600 h-4 w-4" />
            <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700">
              Send me appointment reminders and health tips via SMS/email (optional)
            </span>
          </label>
        </div>

        <div className="flex gap-3 mt-4">
          <button type="button" onClick={() => setStage(2)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Back
          </button>
          <button type="submit" className="flex-[2] bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 active:scale-95 transition shadow-lg shadow-teal-100">
            Create account
          </button>
        </div>
      </form>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or sign up with</span></div>
      </div>

      <button className="flex items-center justify-center gap-2 w-full border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" className="h-4 w-4" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default Security;