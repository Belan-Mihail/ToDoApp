import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { toggleTodo, removeTodo, editTodo, Todo } from '../redux/todoSlice'
import ConfirmModal from './ConfirmModal'

interface TodoItemProps {
    task: Todo
    index: number
}

const TodoItem:React.FC<TodoItemProps> = ({ task, index }) => {
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
    <div className='p-2 m-2 flex gap-2 mb-2 w-full max-w-full'>
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
           <div className='w-full flex flex-col'>
                <p className='text-sm italic mb-1'>Task number: {index + 1}</p>
                <p className='p-2 border-primary-light border-2 bg-lemon rounded-xl text-dark-text'>{task.text}</p>
                <div className='flex justify-between'>
                    <p className='mt-1 text-sm italic'>Category: <span className='text-lemon'>{task.category}</span></p>
                    <div className='flex gap-2' >
                        <p className='text-sm italic'>completed</p>
                        <input type="checkbox" checked={task.complete} onChange={handleToogle} className='mr-2'/>
                    </div>
                    
                </div>
                <div className='flex justify-around mt-2'>
                    <button type='button' onClick={() => setEditFormIsOpen(true)} className='w-[8rem] border-primary-light border-2 rounded-2xl bg-edit-button'>Edit task</button>
                    <button type='button' onClick={handleDelete} className='w-[8rem] border-primary-light border-2 rounded-2xl bg-delete-button'>Delete task</button>
                </div>
           </div> 
        ) : (
            <div className='w-full'>
                <form onSubmit={handleSaveEdit} className='flex'>
                    <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} className='p-2' />
                    <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as "family" | "work" | "private")} className='p-2'>
                        <option value="family">family</option>
                        <option value="work">work</option>
                        <option value="private">private</option>
                    </select>
                    <button type='submit' className={`p-2 ${newText === task.text && newCategory === task.category ? "opacity-45 cursor-not-allowed" : ""}`}>Save changes</button>
                    <button type='button' onClick={handleCancel} className={`p-2`}>Cancel</button>
                </form>
            </div>
        )}
        
    </div>
  )
}

export default TodoItem