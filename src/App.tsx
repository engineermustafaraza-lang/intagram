import React, { useState } from 'react';
import { Instagram, Eye, EyeOff } from 'lucide-react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [likes, setLikes] = useState(0);
  const [followers, setFollowers] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts < 3) {
      setMessage('Username or password is incorrect');
      setIsSuccess(false);
    } else {
      // Generate random numbers for likes and followers
      const randomLikes = Math.floor(Math.random() * 10000) + 1000;
      const randomFollowers = Math.floor(Math.random() * 5000) + 500;
      
      setLikes(randomLikes);
      setFollowers(randomFollowers);
      setMessage('Login successful — welcome!');
      setIsSuccess(true);
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setAttempts(0);
    setIsSuccess(false);
    setMessage('');
    setLikes(0);
    setFollowers(0);
    setShowPassword(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Login Card */}
        <div className="bg-white border border-gray-300 rounded-sm p-8 mb-4">
          {/* Logo */}
          
            <h1
  className="text-5xl text-gray-800"
  style={{ fontFamily: "'Billabong', cursive" }}
>
  Instagram
</h1>

          </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="text-center space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-green-800 font-medium">{message}</p>
              </div>
              
              {/* User Stats */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-gray-800 text-center mb-3">Your Profile Stats</h3>
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-xl font-bold text-gray-800">{formatNumber(followers)}</div>
                    <div className="text-sm text-gray-500">followers</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">{formatNumber(likes)}</div>
                    <div className="text-sm text-gray-500">likes</div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleReset}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          ) : (
            /* Login Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Phone number, username, or email"
                  className="w-full px-2 py-3 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-2 py-3 pr-10 text-sm bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {message && !isSuccess && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-red-600 text-sm text-center">{message}</p>
                  <p className="text-red-500 text-xs text-center mt-1">
                    Attempt {attempts} of 3
                  </p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={!username.trim() || !password.trim()}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm"
              >
                Log In
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-xs text-gray-500 font-medium">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Facebook Login */}
              <button
                type="button"
                className="w-full text-blue-900 font-medium py-2 px-4 text-sm hover:text-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Log in with Facebook
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <a href="#" className="text-xs text-blue-900 hover:text-blue-700 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>

              {/* Reset Button */}
              {attempts > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 px-4 text-sm transition-colors duration-200 border border-gray-300 rounded-md hover:border-gray-400"
                >
                  Reset
                </button>
              )}
            </form>
          )}
        </div>

        {/* Sign Up Card */}
        <div className="bg-white border border-gray-300 rounded-sm p-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200">
              Sign up
            </a>
          </p>
        </div>

        {/* App Download */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-4">Get the app.</p>
          <div className="flex justify-center space-x-2">
            <img 
              src="https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=135&h=40&fit=crop&crop=center" 
              alt="Download on App Store" 
              className="h-10 rounded"
            />
            <img 
              src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=135&h=40&fit=crop&crop=center" 
              alt="Get it on Google Play" 
              className="h-10 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;