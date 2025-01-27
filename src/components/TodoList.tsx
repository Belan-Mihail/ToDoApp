import React from 'react'
import { filteredTodos, Todo } from '../redux/todoSlice'


interface TodoListProps {
  todos: Todo[]
  filter: {category: "family" | "work" | "private" | "all"; completed: "all" | "completed" | "incompleted"}
}

const TodoList:React.FC<TodoListProps> = ({todos, filter}) => {
  const filteredTask = filteredTodos(todos, filter)
  return (
    <div className='m-4'>
      {filteredTask.map((task) => (
        
      ))}
    </div>
  )
}

export default TodoList