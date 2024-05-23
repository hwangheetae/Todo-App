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
        <div className="item-list">
          <form
            className="flex w-[100%] p-[10px] text-[16px] rounded-[5px] mx-[5px]"
            onSubmit={handleEditSubmit}
          >
            <input
              type="text"
              className="w-full p-2 text-lg border border-gray-300 rounded-md mr-2"
              value={editedTitle}
              onChange={handleEditChange}
            />
            <input
              type="submit"
              className="p-2 px-4 border-none rounded-md bg-[#6fbaff] text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#2f9bff] mr-2"
              value="완료"
            />
            <Button title={"취소"} onClick={() => setisEditing(false)} />
          </form>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex items-center	justify-between p-[10px] my-4 bg-[#fff] rounded-[5px] shadow-md">
        <input
          type="checkbox"
          className="mr-[10px]"
          checked={complete}
          onChange={() => handleCompleteChange(id)}
        />
        <span
          className={`${
            complete ? "line-through text-gray-400" : "text-black"
          }text-left flex-1`}
        >
          {title}
        </span>
        <div>
          <Button title={"수정"} onClick={() => setisEditing(true)} />
          <Button title={"삭제"} onClick={() => handleDelete(id)} />
        </div>
      </div>
    );
  }
}

export default List;
