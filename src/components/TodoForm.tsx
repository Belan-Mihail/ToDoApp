import React, {useState} from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import { addTodo } from '../redux/todoSlice'
import { useDispatch } from 'react-redux'

const TodoForm:React.FC = () => {
  const [task, setTask] = useState<string>('')
  const [category, setCategory] = useState<'family' | 'work' | 'privat'>('family')
  const dispatch = useDispatch()

  return (
    <div>TodoForm</div>
  )
}

export default TodoForm