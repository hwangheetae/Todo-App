import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Todo from "./Todo";
import "./App.css";
const App: React.FC = () => {
  return (
    <div className="bg-white max-w-xl mx-auto my-10 p-5 rounded-lg shadow-lg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
