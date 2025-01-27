import React from 'react'
import { UseDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { toggleTodo, removeTodo, editTodo, Todo } from '../redux/todoSlice'

interface TodoItemProps {
    task: Todo
}

const TodoItem:React.FC<TodoItemProps> = ({ task }) => {
  return (
    <div>TodoItem</div>
  )
}

export default TodoItem