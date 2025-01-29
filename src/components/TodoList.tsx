import React from 'react'
import { filteredTodos, Todo } from '../redux/todoSlice'
import TodoItem from './TodoItem';


interface TodoListProps {
  todos: Todo[]
  filter: {category: "family" | "work" | "private" | "all"; completed: "all" | "completed" | "incompleted"}
}

const TodoList:React.FC<TodoListProps> = ({todos, filter}) => {
  const filteredTask = filteredTodos(todos, filter)
  return (
    <>
    <div className='flex items-center justify-center text-center mt-2'>
        <h3>Current tasks</h3>
    </div>
    <div className='p-4 mx-4 mt-2 flex flex-col gap-2 border-[#f8f4e5] border-2 rounded bg-[#292626cc] items-center justify-around'>
      {filteredTask.length > 0 ? (filteredTask.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))) : (
        <p>You don't have any tasks yet.</p>
      )}
    </div>
    </>
   
  )
}

export default TodoList