import React from "react";
import Button from "./Button";
interface FormProps {
  formEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
  value: string;
  showCancelButton?: boolean;
  setisEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = React.memo(
  ({ formChange, formEditChange, value, setisEditing, showCancelButton }) => {
    return (
      <form
        className="flex w-[100%] p-[10px] text-[16px] rounded-[5px] mx-[5px]"
        onSubmit={formChange}
      >
        <input
          type="text"
          id="todo-input"
          name="todo"
          className="w-full p-2 text-lg border border-gray-300 rounded-md mr-2"
          value={value}
          onChange={formEditChange}
        />
        <input
          type="submit"
          className="p-2 px-4 border-none rounded-md bg-[#6fbaff] text-white cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#2f9bff] mr-2"
          value="완료"
        />
        {showCancelButton && setisEditing && (
          <Button title={"취소"} onClick={() => setisEditing(false)} />
        )}
      </form>
    );
  }
);

export default Form;
