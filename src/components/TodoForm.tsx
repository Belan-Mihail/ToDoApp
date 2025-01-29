import React, { useState } from "react";
import { addTodo } from "../redux/todoSlice";
import { useDispatch } from "react-redux";

const TodoForm: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [category, setCategory] = useState<"family" | "work" | "private">(
    "family"
  );
  const dispatch = useDispatch();

  // Maximum number of characters
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (task.trim()) {
        dispatch(addTodo({ text: task, category }));
        setTask("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTask: string = e.target.value;
    if (newTask.length <= maxLength) {
      setTask(newTask);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center text-center mt-2">
        <h3>Add new task</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 mx-4 mt-2 flex flex-col gap-2 border-primary-light border-2 rounded bg-secondary-dark"
      >
        <textarea
          
          value={task}
          onChange={handleTaskChange}
          placeholder="Add new task..."
          className="p-2 border-primary-light border-2 bg-lemon rounded-xl text-dark-text resize-none"
          rows={4}
        />
        {task.length >= maxLength ? (
          <div className="text-sm italic text-delete-button mt-1 text-center">
          you have reached the maximum number of characters
        </div>
        ) : (
          <div className="text-sm italic text-primary-light mt-1 text-right">
          {task.length} / {maxLength} characters
        </div>
        )}
        
        <div className="flex justify-around mt-2 mx-4 gap-4">
          <div className="flex  justify-around gap-4 items-center">
            <h4 className="text-sm italic">Select category:</h4>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as "family" | "work" | "private")
              }
              className="w-[8rem]  border-primary-light border-2 rounded-xl"
            >
              <option className="bg-secondary-dark text-left" value="family">
                family
              </option>
              <option className="bg-secondary-dark text-left" value="work">
                work
              </option>
              <option className="bg-secondary-dark text-left" value="private">
                private
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-[8rem] border-primary-light border-2 rounded-2xl bg-confirm-button"
          >
            Add Task
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
