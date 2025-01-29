import React, {useState} from 'react'
import { addTodo } from '../redux/todoSlice'
import { useDispatch } from 'react-redux'

const TodoForm:React.FC = () => {
  const [task, setTask] = useState<string>('')
  const [category, setCategory] = useState<'family' | 'work' | 'private'>('family')
  const dispatch = useDispatch()

  // Maximum number of characters
  const maxLength = 500

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
    <form onSubmit={handleSubmit} className='p-4 mx-4 mt-2 flex flex-col gap-2 border-[#f8f4e5] border-2 rounded bg-[#292626cc]'>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Add new task...' className='p-2 border-[#f8f4e5] border-2 bg-[#c5e62fcc] rounded-xl text-[#020920cc]'/>
      <div className='flex justify-around mt-2 mx-4 gap-4'>
        <div className='flex  justify-around gap-4 items-center'>
          <h4 className='text-sm italic'>Select category:</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value as 'family' | 'work' | 'private')} className='w-[8rem]  border-[#f8f4e5] border-2 rounded-xl'>
        
        <option className='bg-[#292626cc] text-left' value="family">family</option>
        <option className='bg-[#292626cc] text-left' value="work">work</option>
        <option className='bg-[#292626cc] text-left' value="private">private</option>
      </select>
        </div>
        
      <button type='submit' className='w-[8rem] border-[#f8f4e5] border-2 rounded-2xl bg-[#3dd472cc]'>Add Task</button>
      </div>
      
    </form>
    </>
    
  )
}


export default TodoForm