import React from 'react';

export const CircleSkeleton = ({ className = "w-12 h-12" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-full ${className}`}></div>
);

export const TextSkeleton = ({ className = "h-4 w-3/4", lines = 1 }) => {
  if (lines <= 1) {
    return <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>;
  }
  
  return (
    <div className="space-y-3 w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`animate-pulse bg-gray-200 rounded ${i === lines - 1 ? 'w-5/6' : 'w-full'} ${className.split(' ')[0] || 'h-4'}`}></div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
    <CircleSkeleton className="w-12 h-12 flex-shrink-0" />
    <div className="flex-1">
      <TextSkeleton className="h-5 w-1/3 mb-4" />
      <TextSkeleton lines={3} className="h-4" />
    </div>
  </div>
);

export const PageSkeleton = () => (
  <div className="min-h-screen py-10 px-4 max-w-4xl mx-auto space-y-8">
    <div className="mb-8">
      <TextSkeleton className="h-8 w-1/2 mb-4" />
      <TextSkeleton className="h-4 w-1/4" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  </div>
);
