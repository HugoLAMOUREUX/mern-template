import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="border-2 border-l-gray-700 animate-spin text-gray-700 inline-block h-4 w-4 rounded-full"
        role="status">
        <span className="hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
