import React, { useState } from "react";
import { addTodo } from "../redux/todoSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify'

const TodoForm: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [category, setCategory] = useState<"family" | "work" | "private">(
    "family"
  );
  const dispatch = useDispatch();

  // Maximum number of characters
  const maxLength = 500;

  const maxOneWordlLength = 40; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (task.trim()) {
        dispatch(addTodo({ text: task, category }));
        setTask("");
        toast.success('Task added successfully!')
        
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newTask: string = e.target.value;

    const words = newTask.split(' ');

    const modifiedWords = words.map((word) => {
      if (word.length > maxOneWordlLength) {
        return word.substring(0, maxOneWordlLength) + '...'
      }
      return word;
    })

    newTask = modifiedWords.join(' ');
     setTask(newTask);

    if (newTask.length <= maxLength) {
      setTask(newTask);
    } else {
      toast.warning('you have reached the maximum number of characters')
    }
  };

  const handleClearForm = () => {
    setTask('')
  }

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
          className="p-2 border-primary-light border-2 bg-lemon rounded-xl text-dark-text resize-none focus:outline-none focus:border-0 hover:border-confirm-button transition-all break-words overflow-hidden overflow-ellipsis"
          rows={4}
          
        />
        
        
        <div className="flex justify-around mt-2 mx-4 gap-4">
          <div className="flex  justify-around gap-4 items-center">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as "family" | "work" | "private")
              }
              className="custom-width border-primary-light border-2 rounded-xl focus:outline-none hover:border-lemon transition-all"
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
          {task.length >= maxLength ? (
          <div className="text-sm italic text-delete-button mt-1 text-center">
          you have reached the maximum number of characters
        </div>
        ) : (
          <div className="text-sm italic text-primary-light mt-1 text-right">
          {task.length} / {maxLength} characters
        </div>
        )}

          
        </div>
        <div className="flex justify-around mt-2 mx-4 gap-4">
        <button
            type="submit"
            className={`custom-width border-primary-light border-2 rounded-2xl bg-confirm-button hover:bg-confirm-button-hover ${
              task.length < 1
                ? "opacity-45 cursor-not-allowed"
                : ""
            }`}
          >
            Add Task
          </button>
          <button
                type="button"
                onClick={handleClearForm}
                className={`custom-width custom-padding border-primary-light border-2 rounded-2xl bg-edit-button hover:bg-edit-button-hover ${
                  task.length < 1
                    ? "opacity-45 cursor-not-allowed"
                    : ""
                }`}
              >
                Clear form
              </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
