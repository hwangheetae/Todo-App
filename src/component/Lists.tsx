import React from "react";
import List from "./List";

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}
interface ListsProps {
  todos: Todo[];
  handleDelete: (id: number) => void;
  handleCompleteChange: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Lists: React.FC<ListsProps> = ({
  todos,
  handleDelete,
  handleCompleteChange,
  setTodos,
}) => {
  console.log("리스트 전체 렌더링.....");

  return (
    <div>
      {todos.map((todo) => (
        <List
          key={todo.id}
          id={todo.id}
          title={todo.title}
          complete={todo.complete}
          handleCompleteChange={handleCompleteChange}
          handleDelete={handleDelete}
          setTodos={setTodos}
          todos={todos} // todos를 전달
        />
      ))}
    </div>
  );
};

export default React.memo(Lists);
