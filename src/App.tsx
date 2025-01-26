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

      <div >
        
      </div>

  )
}

export default App
