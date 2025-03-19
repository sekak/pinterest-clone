import React, { useState } from 'react';
import { Link } from 'react-router'; 

export default function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-6 w-full max-w-md">
        {/* Logo */}
        <img src="/general/logo.png" alt="Logo" className="h-12 w-12" />
        
        {/* Title and Subtitle */}
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Medspire</h1>
        <p className="text-sm text-gray-500">Find new ideas to try</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              id="name"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-semibold mt-4"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-red-600 font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
}