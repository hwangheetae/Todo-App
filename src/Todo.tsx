import React, { useState } from "react";
import Lists from "./component/Lists";
import Button from "./component/Button";
import { useNavigate } from "react-router-dom";

interface TodoProps {
  id: number;
  title: string;
  complete: boolean;
}

const Todo: React.FC = () => {
  const navigate = useNavigate();
  const handleBackToHome = () => navigate("/");

  const initialTodoData: TodoProps[] = localStorage.getItem("todoData")
    ? JSON.parse(localStorage.getItem("todoData") as string)
    : [];

  const [todos, setTodos] = useState<TodoProps[]>(initialTodoData);
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") return;

    const newTodo: TodoProps = {
      id: Date.now(),
      title: value,
      complete: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setValue("");
    localStorage.setItem("todoData", JSON.stringify([...todos, newTodo]));
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todoData", JSON.stringify(newTodos));
  };

  const handleClearAll = () => {
    setTodos([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  const handleCompleteChange = (id: number) => {
    const newTodos = todos.map((data) => {
      if (data.id === id) {
        return { ...data, complete: !data.complete };
      }
      return data;
    });
    setTodos(newTodos);
    localStorage.setItem("todoData", JSON.stringify(newTodos));
  };

  return (
    <div className="bg-white max-w-xl mx-auto my-10 p-5 rounded-lg shadow-lg">
      <div className="m-0 text-[36px] text-[#333] text-center">Todo App</div>
      <form
        className="flex w-[100%] p-[10px] text-[16px] rounded-[5px] mx-[5px]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full p-2 text-lg border border-gray-300 rounded-md mr-2"
          name="value"
          placeholder="할 일을 입력하세요."
          value={value}
          onChange={handleChange}
        />
        <input
          type="submit"
          className="p-2 px-4 border-none rounded-md bg-[#6fbaff] text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#2f9bff] mr-2"
          value="입력"
        />
      </form>
      <Lists
        todos={todos}
        handleDelete={handleDelete}
        handleCompleteChange={handleCompleteChange}
        setTodos={setTodos}
      />
      <Button title={"모두 지우기"} onClick={handleClearAll} />
      <Button title="시작페이지로.." onClick={handleBackToHome}></Button>
    </div>
  );
};

export default Todo;
