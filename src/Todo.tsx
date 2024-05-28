import React, { useState, useCallback, useMemo } from "react";
import Lists from "./component/Lists";
import Button from "./component/Button";
import { useNavigate } from "react-router-dom";
import Form from "./component/Form";

interface TodoProps {
  id: number;
  title: string;
  complete: boolean;
}

const Todo: React.FC = () => {
  const navigate = useNavigate();
  const handleBackToHome = useCallback(() => navigate("/"), [navigate]);

  const initialTodoData: TodoProps[] = useMemo(() => {
    const storedData = localStorage.getItem("todoData");
    return storedData ? JSON.parse(storedData) : [];
  }, []);

  const [todos, setTodos] = useState<TodoProps[]>(initialTodoData);
  const [value, setValue] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (value.trim() === "") return;

      const newTodo: TodoProps = {
        id: Date.now(),
        title: value,
        complete: false,
      };
      setTodos((prev) => {
        const updateTodos = [...prev, newTodo];
        localStorage.setItem("todoData", JSON.stringify(updateTodos));
        return updateTodos;
      });
      setValue("");
    },
    [value]
  );

  const handleDelete = useCallback((id: number) => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todoData", JSON.stringify(newTodos));
      return newTodos;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setTodos([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  }, []);

  const handleCompleteChange = useCallback((id: number) => {
    setTodos((prev) => {
      const newTodos = prev.map((data) => {
        if (data.id === id) {
          return { ...data, complete: !data.complete };
        }
        return data;
      });
      localStorage.setItem("todoData", JSON.stringify(newTodos));
      return newTodos;
    });
  }, []);

  const memoizedTodos = useMemo(() => todos, [todos]);
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
        todos={memoizedTodos}
        handleDelete={handleDelete}
        handleCompleteChange={handleCompleteChange}
        setTodos={setTodos}
      />
      <Button title={"모두 지우기"} onClick={handleClearAll} />
      <Button title="시작페이지로.." onClick={handleBackToHome}></Button>
    </div>
  );
};

export default React.memo(Todo);
