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
    <>
    <div className='flex items-center justify-center text-center mt-2'>
        <h3>Add new task</h3>
    </div>
    <form onSubmit={handleSubmit} className='p-4 mx-4 mt-2 flex gap-2 border-[#f8f4e5] border-2 rounded bg-[#292626cc]'>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Add new task...' className='p-2 border-[#f8f4e5] border-2 bg-[#c5e62fcc] rounded-xl text-[#020920cc]'/>
      <select value={category} onChange={(e) => setCategory(e.target.value as 'family' | 'work' | 'private')} className='px-8 border-[#f8f4e5] border-2 rounded-xl'>
        
        <option className='bg-[#292626cc] text-left' value="family">family</option>
        <option className='bg-[#292626cc] text-left' value="work">work</option>
        <option className='bg-[#292626cc] text-left' value="private">private</option>
      </select>
      <button type='submit' className='p-2 border-[#f8f4e5] border-2 rounded-2xl bg-[#3dd472cc]'>Add Task</button>
    </form>
    </>
    
  )
}


export default TodoForm