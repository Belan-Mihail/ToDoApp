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
            dispatch(editTodo(task.id, newText, newCategory))
        }
        setEditFormIsOpen(false)
    }

  return (
    <div>TodoItem</div>
  )
}

export default TodoItem