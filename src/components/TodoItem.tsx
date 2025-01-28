import React, { useState } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { toggleTodo, removeTodo, editTodo, Todo } from '../redux/todoSlice'

interface TodoItemProps {
    task: Todo
}

const TodoItem:React.FC<TodoItemProps> = ({ task }) => {
    const [newText, setNewText] = useState<string>(task.text)
    const [newCategory, setNewCategory] = useState<"family" | "work" | "private">(task.category)
    const [editFormIsOpen, setEditFormIsOpen] = useState<boolean>(false)
    const dispatch = useDispatch()

    const handleToogle = () => {
        dispatch(toggleTodo(task.id))
    }

    const handleDelete = () => {
        dispatch(removeTodo(task.id))
    }

    const handleEditButtonClick = () => {
        setEditFormIsOpen(true)
    }

    const handleSaveEdit = (e:React.FormEvent) => {
        e.preventDefault()
        if (newText !== task.text || newCategory !== task.category) {
            dispatch(editTodo({id: task.id, NewText: newText, NewCategory: newCategory}))
        }
        setEditFormIsOpen(false)
    }

    const handleCancel = () => {
        setNewText(task.text);
        setNewCategory(task.category);
        setEditFormIsOpen(false);
    }

  return (
    <div className='p-2 m-2 flex gap-2'>
        {!editFormIsOpen ? (
           <div>
                <p>{task.text} - {task.category}</p>
                <input type="checkbox" checked={task.complete} onChange={handleToogle} className='mr-2'/>
                <button>Edit task</button>
                <button>Delete task</button>
           </div> 
        ) : (
            <div>
                <form onSubmit={handleSaveEdit} className='flex'>
                    <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} className='p-2' />
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as "family" | "work" | "private")} className='p-2'>
                        <option value="family">family</option>
                        <option value="work">work</option>
                        <option value="private">private</option>
                    </select>
                    <button type='submit' className='p-2'>Save changes</button>
                    <button type='button' onClick={handleCancel} className='p-2'>Cancel</button>
                </form>
            </div>
        )}
        
    </div>
  )
}

export default TodoItem