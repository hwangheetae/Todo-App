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
      <h1>Home Page</h1>
      <Button title="시작하기" onClick={handleClick} />
    </>
  );
}

export default Home;
