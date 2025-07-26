import React from 'react';
import { DollarSign } from 'lucide-react';

 const StatsCard = ({ title, darkMode, value, subtitle, trend, trendColor = "text-green-500" }) => (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{title}</p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          {subtitle && (
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{subtitle}</p>
          )}
        </div>
        <DollarSign className="w-6 h-6 text-blue-600" />
      </div>
      {trend && (
        <div className={`text-sm ${trendColor} mt-2`}>
          {trend}
        </div>
      )}
    </div>
  );


export default StatsCard;
