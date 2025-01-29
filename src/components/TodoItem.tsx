import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo, editTodo, Todo } from "../redux/todoSlice";
import ConfirmModal from "./ConfirmModal";

interface TodoItemProps {
  task: Todo;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, index }) => {
  const [newText, setNewText] = useState<string>(task.text);
  const [newCategory, setNewCategory] = useState<"family" | "work" | "private">(
    task.category
  );
  const [editFormIsOpen, setEditFormIsOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState("");
  const [deleteCallback, setDeleteCallback] = useState<() => void>(
    () => () => {}
  );
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const dispatch = useDispatch();

  const handleToogle = () => {
    dispatch(toggleTodo(task.id));
  };

  const showModal = (message: string, onConfirm: () => void) => {
    setModalMessage(message);
    setDeleteCallback(() => onConfirm);
    setIsConfirmVisible(true);
  };

  const hideModal = () => {
    setIsConfirmVisible(false);
    setModalMessage("");
  };

  const handleDelete = () => {
    const deleteAction = () => {
      dispatch(removeTodo(task.id));
    };

    showModal("Are you sure you want to delete this task?", deleteAction);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newText !== task.text || newCategory !== task.category) {
      dispatch(
        editTodo({ id: task.id, NewText: newText, NewCategory: newCategory })
      );
    }
    setEditFormIsOpen(false);
  };

  // Maximum number of characters
  const maxLength = 500;

  const handleTaskChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTask: string = e.target.value;
    if (newTask.length <= maxLength) {
      setNewText(newTask);
    }
  };

  const handleCancel = () => {
    setNewText(task.text);
    setNewCategory(task.category);
    setEditFormIsOpen(false);
  };

  return (
    <div className="p-2 m-2 flex flex-col gap-2 mb-2 w-full max-w-full">
      {isConfirmVisible && (
        <ConfirmModal
          header={modalMessage}
          onConfirm={() => {
            deleteCallback();
            hideModal();
          }}
          onCancel={hideModal}
        />
      )}
      {!editFormIsOpen ? (
        <div className="w-full flex flex-col">
          <p className="text-sm italic mb-1">Task number: {index + 1}</p>
          <p className="p-2 border-primary-light border-2 bg-lemon rounded-xl text-dark-text">
            {task.text}
          </p>
          <div className="flex justify-between">
            <p className="mt-1 text-sm italic">
              Category: <span className="text-lemon">{task.category}</span>
            </p>
            <div className="flex gap-2">
              <p className="text-sm italic">completed</p>
              <input
                type="checkbox"
                checked={task.complete}
                onChange={handleToogle}
                className="mr-2"
              />
            </div>
          </div>
          <div className="flex justify-around mt-2">
            <button
              type="button"
              onClick={() => setEditFormIsOpen(true)}
              className="w-[8rem] border-primary-light border-2 rounded-2xl bg-edit-button hover:bg-edit-button-hover"
            >
              Edit task
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-[8rem] border-primary-light border-2 rounded-2xl bg-delete-button hover:bg-delete-button-hover"
            >
              Delete task
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <form
            onSubmit={handleSaveEdit}
            className="p-4 mx-4 mt-2 flex flex-col gap-2 border-primary-light border-2 rounded bg-secondary-dark"
          >
            <textarea
              value={newText}
              onChange={handleTaskChange}
              className="p-2 border-primary-light border-2 bg-edit-button rounded-xl text-dark-text resize-none"
              rows={2}
            />
            <div className="flex justify-around items-center mt-2 mx-4 gap-4">
              <div className="flex  justify-around gap-4 items-center">
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(
                      e.target.value as "family" | "work" | "private"
                    )
                  }
                  className="w-[8rem]  border-primary-light border-2 rounded-xl"
                >
                  <option
                    className="bg-secondary-dark text-left"
                    value="family"
                  >
                    family
                  </option>
                  <option className="bg-secondary-dark text-left" value="work">
                    work
                  </option>
                  <option
                    className="bg-secondary-dark text-left"
                    value="private"
                  >
                    private
                  </option>
                </select>
              </div>
              {newText.length >= maxLength ? (
                <div className="text-sm italic text-delete-button mt-1 text-center">
                   the maximum has been reached
                </div>
              ) : (
                <div className="text-sm italic text-primary-light mt-1 text-right">
                  {newText.length} / {maxLength} characters
                </div>
              )}
            </div>

            <div className="flex justify-around mt-2 mx-4 gap-4">
              <button
                type="submit"
                className={`w-[8rem] border-primary-light border-2 rounded-2xl bg-confirm-button hover:bg-confirm-button-hover ${
                  (newText === task.text && newCategory === task.category) || (newText.length < 1)
                    ? "opacity-45 cursor-not-allowed"
                    : ""
                }`}
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className={`w-[8rem] border-primary-light border-2 rounded-2xl bg-delete-button hover:bg-delete-button-hover`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
