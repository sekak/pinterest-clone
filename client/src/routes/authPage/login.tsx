import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '@/utils/apiRequest';
import  useStore  from '@/utils/authStore';
import Image from '@/components/image/image';

export default function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const {setCurrentUser} = useStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();
    const form = e.currentTarget; 
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try{
      const res = await apiRequest.post('/users/auth/login', data)
      setCurrentUser(res?.data)
      navigate('/')
    }catch(err){
      setError(err?.response?.data?.message)
    }  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-6 w-full max-w-md">
        <Image media="/general/logo.png" className="h-12 w-12" />

        <h1 className="text-2xl font-bold text-gray-800">Log in to Medspire</h1>
        <p className="text-sm text-gray-500">Find new ideas to try</p>

        <form data-testid='form' onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-600">Email</label>
            <input
              required
              name='email'
              type="email"
              id="email"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              required
              name='password'
              type="password"
              id="password"
              className="border-2 border-gray-300 rounded-full px-4 py-2 outline-none focus:border-red-500 text-gray-800"
              placeholder="Enter your password"
            />
            <span className="text-sm text-red-600">{error}</span>
            <Link to="/auth/forgot-password" className="text-sm text-red-600 hover:underline self-end mt-1">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-semibold mt-4"
          >
            Log in
          </button>

        </form>

        <p className="text-sm text-gray-500 mt-4">
          Don’t have an account?{' '}
          <Link to="/auth/register" className="text-red-600 font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}