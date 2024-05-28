import React from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = React.memo(({ title, onClick }) => {
  console.log("버튼 렌더링.....");
  return (
    <button
      className="p-2 px-4 border-none rounded-md bg-[#6fbaff] text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#2f9bff] mr-2"
      onClick={onClick}
    >
      {title}
    </button>
  );
});

export default Button;
