import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div>
          <div className="relative">
            <h1 className="text-9xl font-bold text-indigo-600 opacity-20">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-48 h-48 text-indigo-500 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Oops! Page not found
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="mt-2 text-sm text-gray-500 bg-white p-3 rounded-md shadow-sm">
            Requested URL: <span className="font-mono text-indigo-600">{location.pathname}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Go back home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;