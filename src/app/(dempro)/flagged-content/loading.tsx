import React from "react";

function loading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col gap-6 py-10">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="h-68 p-6 border border-gray-200 rounded-lg shadow-sm bg-white animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
        </div>
      ))}
    </div>
  );
}

export default loading;
