// views/URLsView.jsx
import React from 'react';

 const builderLogos = [
    { name: 'KB HOME', color: 'bg-yellow-500', textColor: 'text-black' },
    { name: 'NVR', color: 'bg-red-800', textColor: 'text-white' },
    { name: 'LENNAR', color: 'bg-blue-600', textColor: 'text-white' },
    { name: 'RICHMOND AMERICAN HOMES', color: 'bg-red-600', textColor: 'text-white' },
    { name: 'tri pointe HOMES', color: 'bg-gray-100', textColor: 'text-gray-800' },
    { name: 'SMITH DOUGLAS HOMES', color: 'bg-green-100', textColor: 'text-green-800' }
  ];


 const URLsView = ({  darkMode }) => (
    <div className="space-y-8">
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>URLs</h1>
      <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Builder Portal Access</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builderLogos.map((builder, index) => (
          <div
            key={index}
            className={`${builder.color} ${builder.textColor} rounded-xl p-8 flex items-center justify-center h-40 cursor-pointer hover:scale-105 transition-transform shadow-lg`}
          >
            <div className="text-center">
              <h3 className="font-bold text-lg leading-tight">
                {builder.name.split(' ').map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


export default URLsView;
