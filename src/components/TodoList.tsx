import React from 'react'
import { UseSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { selectFilteredTodos } from '../redux/todoSlice'


interface TodoListProps {
  todos: Todo[]
  filter: {category: "family" | "work" | "private" | "all"; completed: "all" | "completed" | "incompleted"}
}

const TodoList = () => {

  return (
    <div>TodoList</div>
  )
}

export default TodoList