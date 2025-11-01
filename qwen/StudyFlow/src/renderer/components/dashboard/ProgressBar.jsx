import React from 'react';

const ProgressBar = ({ label, current, total, color = 'blue' }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500', 
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-700">{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${colorClasses[color] || colorClasses.blue} transition-all duration-300 ease-in-out`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="text-right text-xs text-gray-500 mt-1">{Math.round(percentage)}%</div>
    </div>
  );
};

export default ProgressBar;