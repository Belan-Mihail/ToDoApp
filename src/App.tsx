import React from 'react';
import TodoForm from './components/TodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from './redux/store'
import  setFilter  from './redux/todoSlice';
import './App.css'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const App: React.FC = () => {
  
  const todos = useSelector((state:RootState) => state.todos.todos)
  const filter = useSelector((state:RootState) => state.todos.filter)
  

  return (

    
      <div className='bg-primary-dark rounded-xl text-[#f8f4e5] max-w-[500px] mx-auto my-4 main flex flex-col' >
        {/* form to add new task */}
        <TodoForm />

        {/* filters */}
        <div className='mt-4'>
          <TodoFilter />
        </div>

        {/* Task List */}
        <TodoList todos={todos} filter={filter} />
        <ToastContainer 
              position="top-left" 
              autoClose={2000} 
              hideProgressBar={false} 
              newestOnTop={true} 
              closeOnClick={true} 
              rtl={false} 
              pauseOnFocusLoss
              draggable
              pauseOnHover
             />
      </div>

  )
}

export default App
