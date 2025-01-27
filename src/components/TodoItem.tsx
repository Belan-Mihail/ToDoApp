import React, { useState } from 'react'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { toggleTodo, removeTodo, editTodo, Todo } from '../redux/todoSlice'

interface TodoItemProps {
    task: Todo
}

const TodoItem:React.FC<TodoItemProps> = ({ task }) => {
    const [newText, setNewText] = useState<string>(task.text)
    const [newCategory, setNewCategory] = useState<string>(task.category)
    const [editFormIsOpen, setEditFormIsOpen] = useState<boolean>(false)
    const dispatch = useDispatch()

    const handleToogle = () => {
        dispatch(toggleTodo(task.id))
    }

  return (
    <div>TodoItem</div>
  )
}

export default TodoItem