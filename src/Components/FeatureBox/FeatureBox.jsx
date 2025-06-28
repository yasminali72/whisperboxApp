import React from "react";

export default function FeatureBox({ icon, title, description }) {
  return (
    <>
     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center">
  <div className="flex items-center justify-center text-4xl text-blue-500 mb-3">
    {icon}
  </div>
  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</p>
  <p className="text-gray-500 dark:text-gray-400">{description}</p>
</div>

    </>
  );
}
