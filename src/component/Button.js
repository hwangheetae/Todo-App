import React from "react";

function Button({ title, onClick }) {
  return (
    <button
      className="bg-[#6fbaff] mr-[5px] text-white p-2 px-4 rounded-md transition-colors duration-300 ease-in-out hover:bg-[#2f9bff] "
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
