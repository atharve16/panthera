import React from 'react';

const HeroBanner = () => (
  <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-pink-800 rounded-xl p-8 mb-8 overflow-hidden">
    <div className="relative z-10">
      <h1 className="text-3xl font-bold text-white mb-2">
        Revolutionising Real Estate with Data Insights
      </h1>
      <p className="text-purple-100 mb-6">
        Harness actionable intelligence to simplify, optimise, and transform your real estate strategies.
      </p>
      <div className="flex space-x-4">
        <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Discover now
        </button>
        <button className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors">
          Watch video
        </button>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-pink-600/30"></div>
  </div>
);

export default HeroBanner;
