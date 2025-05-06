import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { apiRequest } from '@/utils/apiRequest';
import useStore from '@/utils/authStore';
import Image from '@/components/image/image';

export default function Register() {

  const [error, setError] = useState('');
  const navigate = useNavigate()
  const {setCurrentUser} = useStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; 
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try{
      const res = await apiRequest.post('/users/auth/register', data)
      navigate('/')
      setCurrentUser(res?.data)
    }catch(err){
      setError(err?.response?.data?.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-6 w-full max-w-md">
        <Image media="/general/logo.png" className="h-12 w-12" />
        
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Medspire</h1>
        <p className="text-sm text-gray-500">Find new ideas to try</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm text-gray-600">Username</label>
            <input
              required
              type="text"
              id="username"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Choose a username"
              name='username'
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-gray-600">Full Name</label>
            <input
              required
              type="text"
              id="name"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Enter your full name"
              name='displayName'
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
            <input
              required
              type="email"
              id="email"
              name='email'
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              required
              type="password"
              id="password"
              name='password'
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Create a password"
            />
            <span className="text-sm text-red-600">{error}</span>
          </div>

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