import React, { useState } from 'react';
import { Link } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-6 w-full max-w-md">
        {/* Logo */}
        <img src="/general/logo.png" alt="Pinterest Logo" className="h-12 w-12" />

        {/* Title and Subtitle */}
        <h1 className="text-2xl font-bold text-gray-800">Log in to Medspire</h1>
        <p className="text-sm text-gray-500">Find new ideas to try</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/auth/forgot-password" className="text-sm text-red-600 hover:underline self-end mt-1">
              Forgot password?
            </Link>
          </div>

          {/* Log In Button */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-semibold mt-4"
          >
            Log in
          </button>
        </form>

        {/* Registration Link */}
        <p className="text-sm text-gray-500 mt-4">
          Don’t have an account?{' '}
          <Link to="/auth/register" className="text-red-600 font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}