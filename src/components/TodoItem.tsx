import React from 'react'
import { UseDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { toggleTodo, removeTodo, editTodo, Todo } from '../redux/todoSlice'

interface TodoItemProps {
    todo: Todo
}

const TodoItem = () => {
  return (
    <div>TodoItem</div>
  )
}

export default TodoItem