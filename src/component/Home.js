import React from "react";
import Button from "./Button.js";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/todo");
  };
  return (
    <>
      <div className="m-0 text-[36px] text-[#333] text-center">Home Page</div>

      <Button title="시작하기" onClick={handleClick} />
    </>
  );
}

export default Home;
