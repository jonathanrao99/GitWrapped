import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "", count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse bg-gray-700/50 rounded-lg ${className}`}
        />
      ))}
    </>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-3">
      {/* Header Skeleton */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="w-64 h-8" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-4 grid-rows-4 md:grid-cols-8 md:grid-rows-4 gap-2 w-full md:h-[600px]">
        {/* Longest Streak */}
        <Skeleton className="p-2 md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-3 col-start-3 col-end-5 rounded-3xl" />
        
        {/* Current Streak */}
        <Skeleton className="p-2 md:col-start-3 md:col-end-5 md:row-start-1 md:row-end-4 col-start-2 col-end-5 rounded-3xl" />
        
        {/* Followers */}
        <Skeleton className="p-2 md:col-start-7 md:col-end-9 md:row-start-4 md:row-end-5 row-start-4 row-end-4 col-start-2 col-end-3 rounded-3xl" />
        
        {/* Repos */}
        <Skeleton className="p-2 md:col-start-5 md:col-end-9 md:row-start-1 md:row-end-2 col-start-4 col-end-5 row-start-3 row-end-5 rounded-3xl" />
        
        {/* Commits */}
        <Skeleton className="p-2 md:col-start-5 md:col-end-7 md:row-start-2 md:row-end-5 col-start-1 col-end-4 row-start-3 rounded-3xl" />
        
        {/* PRs */}
        <Skeleton className="p-2 md:col-start-7 md:col-end-8 md:row-start-2 md:row-end-4 col-start-1 col-end-2 row-start-2 rounded-3xl" />
        
        {/* Contributed To */}
        <Skeleton className="p-2 md:col-start-3 md:col-end-5 md:row-start-4 md:row-end-5 rounded-3xl" />
        
        {/* Issues */}
        <Skeleton className="p-2 md:col-start-8 md:col-end-9 md:row-start-2 md:row-end-4 col-start-1 row-start-4 rounded-3xl" />
        
        {/* Stars */}
        <Skeleton className="p-2 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 col-start-1 col-end-3 row-start-1 rounded-3xl" />
      </div>

      {/* Contribution Graph Skeleton */}
      <div className="mt-6">
        <Skeleton className="w-64 h-8 mb-4" />
        <Skeleton className="w-full h-32 rounded-2xl" />
      </div>
    </div>
  );
};

export default LoadingSkeleton; 