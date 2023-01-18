import React from "react";

const Loading = () => {
  return (
    <div className="w-32 mx-auto flex justify-center items-center border rounded mt-12">
      <p className='text-xl text-primary text-center font-bold'>L</p>
      <div className='w-4 h-4 border-4 border-dashed rounded-full animate-spin  border-red-600'></div>
      <p className='text-xl text-primary text-center font-bold'>ading...</p>
    </div>
  );
};

export default Loading;
