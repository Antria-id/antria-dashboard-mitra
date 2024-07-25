// Loading.js
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-600"></div>
        <h2 className="text-lg font-bold mt-4">Loading...</h2>
      </div>
    </div>
  );
}
