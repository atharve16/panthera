import React from 'react';
import { MoreHorizontal } from 'lucide-react';

 const TopMSATable = ({ title, data, valueKey, valueLabel, darkMode }) => (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <MoreHorizontal className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-500 pb-2 border-b border-gray-200">
          <span>MSA</span>
          <span>{valueLabel}</span>
        </div>
        
        {data.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 text-sm">
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {item.name}
            </span>
            <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {typeof item[valueKey] === 'number' && valueKey === 'priceIncrease' ? `${item[valueKey]}%` : item[valueKey]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );


export default TopMSATable;
