import React from "react";
import List from "./List";

function Lists({ todos, handleDelete, handleCompleteChange, setTodos }) {
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
}

export default Lists;
