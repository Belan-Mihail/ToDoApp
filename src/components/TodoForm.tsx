import React, {useState} from 'react'
import { addTodo } from '../redux/todoSlice'
import { useDispatch } from 'react-redux'

const TodoForm:React.FC = () => {
  const [task, setTask] = useState<string>('')
  const [category, setCategory] = useState<'family' | 'work' | 'private'>('family')
  const dispatch = useDispatch()

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()

    try {
      if (task.trim()) {
        dispatch(addTodo({text: task, category}))
        setTask('')
      }
    } catch (error) {
      console.log(error)
    }

    
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 m-4 flex gap-2 border-[#f8f4e5] border-2 rounded bg-[#292626cc]'>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Add new task...' className='p-2 border-[#f8f4e5] border-2 bg-[#c5e62fcc] rounded-xl text-[#020920cc]'/>
      <select value={category} onChange={(e) => setCategory(e.target.value as 'family' | 'work' | 'private')} className='p-2'>
        <option value="family">family</option>
        <option value="work">work</option>
        <option value="private">private</option>
      </select>
      <button type='submit' className='p-2 border-[#f8f4e5] border-2 rounded-2xl bg-[#3dd472cc]'>Add Task</button>
    </form>
  )
}

export default TodoForm