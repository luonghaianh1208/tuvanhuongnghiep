import React from 'react';

function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-be-vietnam text-sm text-gray-600">
          Tiến độ
        </span>
        <span className="font-be-vietnam text-sm font-medium text-navy">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-navy to-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-1 text-center">
        <span className="font-be-vietnam text-xs text-gray-400">
          {current} / {total} câu
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;