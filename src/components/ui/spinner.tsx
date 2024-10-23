import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 w-12 h-12"></div>
    </div>
  );
};

export default Spinner;
