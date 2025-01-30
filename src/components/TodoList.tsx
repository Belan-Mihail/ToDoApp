import React from 'react'
import { filteredTodos, Todo } from '../redux/todoSlice'
import TodoItem from './TodoItem';


interface TodoListProps {
  todos: Todo[]
  filter: {category: "family" | "work" | "private" | "all"; completed: "all" | "completed" | "incompleted"}
}

const TodoList:React.FC<TodoListProps> = ({todos, filter}) => {
  const filteredTask = filteredTodos(todos, filter)

  const sortedTask = filteredTask.sort((a, b) => a.id > b.id ? 1 : -1)

  
  return (
    <>
    <div className='flex items-center justify-center text-center mt-2'>
        <h3>Current tasks</h3>
    </div>
    <div className='p-4 mx-4 mt-2 mb-4 flex flex-col gap-2 border-primary-light border-2 rounded bg-secondary-dark items-center justify-around'>
      {filteredTask.length > 0 ? (filteredTask.map((task, index) => (
        <TodoItem key={task.id} task={task} index={index} />
      ))) : (
        <p>You don't have any tasks yet.</p>
      )}
    </div>
    </>
   
  )
}

export default TodoList