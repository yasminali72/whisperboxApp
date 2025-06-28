import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
    <h1 className="text-6xl font-bold text-red-500">404</h1>
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
      Oops! Page Not Found
    </h2>
    <p className="text-gray-600 dark:text-gray-400 mt-2">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all">
      Go Back Home
    </Link>
  </div>
  
  );
}
