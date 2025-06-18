import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register, clearError } from '../../redux/authSlice';

interface RegisterProps {
  onRegistered: () => void;
}

const getPasswordStrength = (password: string) => {
  if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    return 'Strong';
  } else if (password.length > 5) {
    return 'Medium';
  } else {
    return 'Weak';
  }
};

const Register: React.FC<RegisterProps> = ({ onRegistered }) => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('All fields are required');
      return;
    }
    // For demo, store email as username in Redux
    dispatch(register({ username: email, password }));
    dispatch(clearError());
    onRegistered();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-pink-400">
    <div className="w-full max-w-md p-8 bg-black bg-opacity-90 rounded-2xl shadow-xl">
      <div className="flex items-center justify-center">
        {/* Logo/icon can go here */}
      </div>
      
      {/* Header Section */}
      <div className="mb-8"> {/* Increased bottom margin */}
        <h2 className="text-3xl font-bold text-white mb-3">Sign Up For Free.</h2> {/* Increased mb */}
        <p className="text-gray-400">Please fill the form to register.</p>
      </div>
  
      <form onSubmit={handleSubmit} className="space-y-6"> {/* Added space-y-6 for consistent gaps */}
        {/* Full Name Field */}
        <div className="space-y-2"> {/* Group with consistent spacing */}
          <label className="block text-gray-300 text-sm">Full Name</label>
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>
        </div>
  
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-gray-300 text-sm">Email Address</label>
          <div className="relative">
            <input
              type="email"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
  
        {/* Password Field */}
        <div className="space-y-3"> {/* Slightly more space for password section */}
          <label className="block text-gray-300 text-sm">Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <div className={`h-1.5 rounded ${passwordStrength === 'Strong' ? 'bg-green-500' : passwordStrength === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-gray-400">Password strength: {passwordStrength}</span>
          </div>
        </div>
  
        {/* Error Message */}
        {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 mt-2"
        >
          Sign Up
        </button>
      </form>
  
      {/* Sign In Link */}
      <div className="text-center text-gray-400 mt-6"> 
        Enter your email and password to Sign Up{' '}
        {/* <span className="text-indigo-400 cursor-pointer hover:underline" onClick={onRegistered}>Sign In.</span> */}
      </div>
    </div>
  </div>

  );
};

export default Register; 