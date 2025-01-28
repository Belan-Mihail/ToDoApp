import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { toggleTodo, removeTodo, editTodo, Todo } from '../redux/todoSlice'
import ConfirmModal from './ConfirmModal'

interface TodoItemProps {
    task: Todo
}

const TodoItem:React.FC<TodoItemProps> = ({ task }) => {
    const [newText, setNewText] = useState<string>(task.text)
    const [newCategory, setNewCategory] = useState<"family" | "work" | "private">(task.category)
    const [editFormIsOpen, setEditFormIsOpen] = useState<boolean>(false)
    const [modalMessage, setModalMessage] = useState('')
    const [deleteCallback, setDeleteCallback] = useState<() => void>(() => () => {})
    const [isConfirmVisible, setIsConfirmVisible] = useState(false)

    const dispatch = useDispatch()

    const handleToogle = () => {
        dispatch(toggleTodo(task.id))
    }

    const showModal = (message:string, onConfirm: () => void) => {
        setModalMessage(message)
        setDeleteCallback(() => onConfirm)
        setIsConfirmVisible(true)
    }

    const hideModal = () => {
        setIsConfirmVisible(false)
        setModalMessage('')
    }

    const handleDelete = () => {
        const deleteAction = () => {
            dispatch(removeTodo(task.id))
        }
        
        showModal('Are you sure you want to delete this task?', deleteAction)
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
        {isConfirmVisible && (
            <ConfirmModal
            header={modalMessage}
            onConfirm={() => {
              deleteCallback()
              hideModal()
            }}
            onCancel={hideModal}
          />
        )}
        {!editFormIsOpen ? (
           <div>
                <p>{task.text} - {task.category}</p>
                <input type="checkbox" checked={task.complete} onChange={handleToogle} className='mr-2'/>
                <button type='button' onClick={() => setEditFormIsOpen(true)} className='p-2'>Edit task</button>
                <button type='button' onClick={handleDelete} className='p-2'>Delete task</button>
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
                    <button type='submit' className={`p-2 ${newText === task.text && newCategory === task.category ? "opacity-45 cursor-not-allowed" : ""}`}>Save changes</button>
                    <button type='button' onClick={handleCancel} className={`p-2 ${newText !== task.text || newCategory !== task.category ? "opacity-45 cursor-not-allowed" : ""}`}>Cancel</button>
                </form>
            </div>
        )}
        
    </div>
  )
}

export default TodoItem