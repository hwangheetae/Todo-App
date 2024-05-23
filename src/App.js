import "./App.css";
import Lists from "./component/Lists"; // 경로 수정
import Button from "./component/Button"; // 경로 수정
import { useState } from "react";

function App() {
  const initialTodoData = localStorage.getItem("todoData")
    ? JSON.parse(localStorage.getItem("todoData"))
    : [];
  const [todos, setTodos] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      title: value,
      complete: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setValue("");
    localStorage.setItem("todoData", JSON.stringify([...todos, newTodo]));
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todoData", JSON.stringify(newTodos));
  };

  const handleClearAll = () => {
    setTodos([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  const handleCompleteChange = (id) => {
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
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="value"
          placeholder="할 일을 입력하세요."
          value={value}
          onChange={handleChange}
        />
        <input type="submit" value="입력" />
      </form>
      <Lists
        todos={todos}
        handleDelete={handleDelete}
        handleCompleteChange={handleCompleteChange}
        setTodos={setTodos}
      />
      <Button title={"모두 지우기"} onClick={handleClearAll} />
    </div>
  );
}

export default App;
