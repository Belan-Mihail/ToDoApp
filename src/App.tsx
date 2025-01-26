import React from 'react';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from './redux/store'
import  setFilter  from './redux/todoSlice';
import './App.css'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state:RootState) => state.todos.todos)
  const filter = useSelector((state:RootState) => state.todos.filter)
  

  return (

      <div className='mx-auto my-4' >
        {/* form to add new task */}
        <TodoForm />

        {/* filters */}
        <div className='mt-4'>
          <TodoFilter />
        </div>

        {/* Task List */}
        <TodoList todos={todos} filter={filter} />
      </div>

  )
}

export default App
