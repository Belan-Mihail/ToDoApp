import React, {useState} from 'react'
import { addTodo } from '../redux/todoSlice'
import { useDispatch } from 'react-redux'

const TodoForm:React.FC = () => {
  const [task, setTask] = useState<string>('')
  const [category, setCategory] = useState<'family' | 'work' | 'private'>('family')
  const dispatch = useDispatch()

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    if (!task.trim()) {
      dispatch(addTodo({text: task, category}))
      setTask('')
    }
  }

  return (
    <div>TodoForm</div>
  )
}

export default TodoForm