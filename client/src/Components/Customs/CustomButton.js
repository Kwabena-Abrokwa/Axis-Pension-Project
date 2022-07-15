import React from "react";

const CustomButton = ({children, onclick}) => {
  return (
    <button type="submit" onClick={onclick} className="bg-black w-full h-12 text-center text-white rounded-md my-5">
      {children}
    </button>
  );
};

export default CustomButton;
