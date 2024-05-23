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

  const spanStyle = {
    textDecoration: complete ? "line-through" : "none",
    color: complete ? "#808080" : "#000000",
  };

  if (isEditing) {
    return (
      <>
        <div className="item-list">
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editedTitle}
              onChange={handleEditChange}
            />
            <input type="submit" value="완료" />
            <Button title={"취소"} onClick={() => setisEditing(false)} />
          </form>
        </div>
      </>
    );
  } else {
    return (
      <div className="item-list">
        <input
          type="checkbox"
          checked={complete}
          onChange={() => handleCompleteChange(id)}
        />
        <span style={spanStyle}>{title}</span>
        <div>
          <Button title={"수정"} onClick={() => setisEditing(true)} />
          <Button title={"삭제"} onClick={() => handleDelete(id)} />
        </div>
      </div>
    );
  }
}

export default List;
