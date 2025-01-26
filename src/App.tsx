import React from 'react';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from './redux/todoSlice';
import './App.css'

function App() {
  

  return (
    <>
      <div>
        <p className=' text-2xl text-red-400'>Hello world</p>
      </div>
    </>
  )
}

export default App
