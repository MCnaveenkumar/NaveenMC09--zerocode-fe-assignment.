import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../redux/authSlice';
import type { RootState } from '../../redux/store'; // Changed to type-only import

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state: RootState) => state.auth.error);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username: email, password }));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearError());
      onLoginSuccess();
    }
  }, [isAuthenticated, dispatch, onLoginSuccess]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-blue-500 to-pink-400">
      <div className="background w-full max-w-md p-8 bg-black bg-opacity-90 rounded-2xl shadow-xl">
        <div className="flex items-center justify-center mb-6">
          {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">S</div> */}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-gray-400 mb-6">Welcome back! Please login to your account.</p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-300 text-sm">Email Address</label>
          <div className="relative mb-4">
            <input
              type="email"
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <label className="block mb-2 text-gray-300 text-sm">Password</label>
          <div className="relative mb-2">
            <input
              type="password"
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-400 mb-2 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-semibold transition mb-2 flex items-center justify-center gap-2"
          >
            Sign In 
          </button>
        </form>
        <div className="text-center text-gray-400 mt-2">
         Please enter your email and password to Sign In{' '}
          {/* <span className="text-indigo-400 cursor-pointer hover:underline" onClick={onLoginSuccess}>Sign Up.</span> */}
        </div>
        {/* <button className="w-full mt-4 bg-white text-black py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
          Sign In With Google
        </button> */}
      </div>
    </div>
  );
};

export default Login; 