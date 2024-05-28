import React, { useState, useCallback } from "react";
import Button from "./Button";
import Form from "./Form";

interface Todo {
  id: number;
  title: string;
  complete: boolean;
}

interface ListProps {
  todos: Todo[];
  id: number;
  title: string;
  complete: boolean;
  handleDelete: (id: number) => void;
  handleCompleteChange: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const List: React.FC<ListProps> = ({
  todos,
  id,
  title,
  complete,
  handleDelete,
  handleCompleteChange,
  setTodos,
}) => {
  console.log("리스트아이템 렌더링.....");

  const [isEditing, setisEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTitle(e.target.value);
    },
    []
  );

  const handleEditSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
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
    },
    [editedTitle, id, setTodos, todos]
  );

  if (isEditing) {
    return (
      <div className="item-list">
        <Form
          formEditChange={handleEditChange}
          formChange={handleEditSubmit}
          value={editedTitle}
          setisEditing={setisEditing}
          showCancelButton={true}
        />
      </div>
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
};

export default React.memo(List);
