import React, { useState, useCallback } from "react";
import Lists from "./component/Lists";
import Button from "./component/Button";
import Form from "./component/Form";
import { useNavigate } from "react-router-dom";
import useTodoStore from "./store";

const Todo: React.FC = () => {
  const navigate = useNavigate();
  const handleBackToHome = useCallback(() => navigate("/"), [navigate]);

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const clearTodos = useTodoStore((state) => state.clearTodos);
  const editTodo = useTodoStore((state) => state.editTodo);
  const [value, setValue] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (value.trim() === "") return;
      addTodo(value);
      setValue("");
    },
    [value, addTodo]
  );

  const handleEdit = useCallback(
    (id: number, newTitle: string) => {
      editTodo(id, newTitle);
    },
    [editTodo]
  );

  return (
    <div className="bg-white max-w-xl mx-auto my-10 p-5 rounded-lg shadow-lg">
      <div className="m-0 text-[36px] text-[#333] text-center">Todo App</div>

      <Form
        formChange={handleSubmit}
        formEditChange={handleChange}
        value={value}
        showCancelButton={false}
      />
      <Lists
        todos={todos}
        handleDelete={removeTodo}
        handleCompleteChange={toggleTodo}
        handleEdit={handleEdit}
      />
      <Button title={"모두 지우기"} onClick={clearTodos} />
      <Button title="시작페이지로.." onClick={handleBackToHome}></Button>
    </div>
  );
};

export default React.memo(Todo);
