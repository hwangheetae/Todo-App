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
  handleEdit: (id: number, newTitle: string) => void;
}

const Lists: React.FC<ListsProps> = ({
  todos,
  handleDelete,
  handleCompleteChange,
  handleEdit,
}) => {
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
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default React.memo(Lists);
