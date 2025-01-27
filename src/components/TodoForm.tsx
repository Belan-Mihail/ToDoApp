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
    <form onSubmit={handleSubmit} className='p-2 m-2 flex gap-2'>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Add new task...' className='p-2'/>
      <select value={category} onChange={(e) => setCategory(e.target.value as 'family' | 'work' | 'private')} className='p-2'>
        <option value="family">family</option>
        <option value="work">work</option>
        <option value="private">private</option>
      </select>
      <button type='button' className='p-2'>Add Task</button>
    </form>
  )
}

export default TodoForm