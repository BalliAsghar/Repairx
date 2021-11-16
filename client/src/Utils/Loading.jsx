import React from "react";
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen animate-pulse">
      <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
      <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
      <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
    </div>
  );
};

export default Loading;
