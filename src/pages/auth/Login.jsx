import React, { useState } from 'react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const inputStyle = "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100";
  const labelStyle = "text-xs font-medium text-gray-500 mb-1 block";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Log in to your MediNear patient account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className={labelStyle}>Email address</label>
            <input 
              type="email" 
              id="email"
              placeholder="name@example.com"
              className={inputStyle} 
              required 
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className={labelStyle}>Password</label>
              <a href="#" className="text-[11px] font-semibold text-teal-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                placeholder="••••••••"
                className={inputStyle} 
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition"
              >
                {showPassword ? (
                  <span className="text-xs font-medium">Hide</span>
                ) : (
                  <span className="text-xs font-medium">Show</span>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 cursor-pointer group w-fit">
            <input type="checkbox" className="accent-teal-600 h-4 w-4" />
            <span className="text-xs text-gray-500 group-hover:text-gray-700">Keep me logged in</span>
          </label>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 active:scale-95 transition shadow-lg shadow-teal-100 mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-400">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <button className="flex items-center justify-center gap-2 w-full border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition mb-6">
          <img 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="Google" 
            className="h-4 w-4" 
          />
          <span>Google</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-teal-600 font-semibold hover:underline">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;