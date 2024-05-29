import React, { useState, useCallback } from "react";
import Button from "./Button";
import Form from "./Form";

interface ListProps {
  id: number;
  title: string;
  complete: boolean;
  handleDelete: (id: number) => void;
  handleCompleteChange: (id: number) => void;
  handleEdit: (id: number, newTitle: string) => void;
}

const List: React.FC<ListProps> = ({
  id,
  title,
  complete,
  handleDelete,
  handleCompleteChange,
  handleEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTitle(e.target.value);
    },
    []
  );

  const handleEditSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleEdit(id, editedTitle);
      setIsEditing(false);
    },
    [id, editedTitle, handleEdit]
  );

  return (
    <>
      {isEditing ? (
        <div className="item-list">
          <Form
            formEditChange={handleEditChange}
            formChange={handleEditSubmit}
            value={editedTitle}
            showCancelButton={true}
            setisEditing={setIsEditing}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-2 my-4 bg-white rounded-md shadow-md">
          <input
            id={`${id}-checkbox`}
            name="checkbox"
            type="checkbox"
            className="mr-2"
            checked={complete}
            onChange={() => handleCompleteChange(id)}
          />
          <span
            className={`flex-1 ${
              complete ? "line-through text-gray-400" : "text-black"
            } text-left`}
          >
            {title}
          </span>
          <div>
            <Button title={"수정"} onClick={() => setIsEditing(true)} />
            <Button title={"삭제"} onClick={() => handleDelete(id)} />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(List);
