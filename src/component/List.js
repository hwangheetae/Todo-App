import React, { useState } from "react";
import Button from "./Button";

function List({
  todos,
  id,
  title,
  complete,
  handleDelete,
  handleCompleteChange,
  setTodos,
}) {
  const [isEditing, setisEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const newTodos = todos.map((data) => {
      if (data.id === id) {
        return { ...data, title: editedTitle };
      }
      return data;
    });
    setTodos(newTodos);
    localStorage.setItem("todoData", JSON.stringify(newTodos));

    setisEditing(false);
  };

  if (isEditing) {
    return (
      <>
        <div>
          <form onSubmit={handleEditSubmit}>
            <input value={editedTitle} onChange={handleEditChange} />
            <input type="submit" value="완료" />
          </form>
        </div>
        <div>
          <Button title={"취소"} onClick={() => setisEditing(false)} />
        </div>
      </>
    );
  } else {
    return (
      <div>
        <input
          type="checkbox"
          checked={complete}
          onChange={() => handleCompleteChange(id)}
        />
        <span style={{ textDecoration: complete ? "line-through" : undefined }}>
          {title}
        </span>
        <Button title={"수정"} onClick={() => setisEditing(true)} />
        <Button title={"삭제"} onClick={() => handleDelete(id)} />
      </div>
    );
  }
}

export default List;
