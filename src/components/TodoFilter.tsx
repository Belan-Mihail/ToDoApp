import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../redux/todoSlice'
import { RootState } from '../redux/store'

const TodoFilter:React.FC = () => {
  const dispatch = useDispatch()

  // get current filters
  const currentFilters = useSelector((state:RootState) => state.todos.filter)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({category: e.target.value as "family" | "work" | "private" | "all", completed: currentFilters.completed}))
  }

  const handleCompletionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter({category: currentFilters.category, completed: e.target.value as "all" | "completed" | "incompleted"}))
  }



  return (
    <div className='p-4 m-4 flex gap-2 border-[#f8f4e5] border-2 rounded bg-[#292626cc] items-center justify-around'>
      <h3>Filters</h3>
      <select value={currentFilters.category} onChange={handleCategoryChange} className='px-8 border-[#f8f4e5] border-2 rounded-xl'>
        <option value="all" className='bg-[#292626cc] text-left'>all</option>
        <option value="family" className='bg-[#292626cc] text-left'>family</option>
        <option value="work" className='bg-[#292626cc] text-left'>work</option>
        <option value="private" className='bg-[#292626cc] text-left'>private</option>
      </select>
      <select value={currentFilters.completed} onChange={handleCompletionChange} className='px-8 border-[#f8f4e5] border-2 rounded-xl'>
        <option value="all" className='bg-[#292626cc] text-left'>all</option>
        <option value="completed" className='bg-[#292626cc] text-left'>completed</option>
        <option value="incompleted" className='bg-[#292626cc] text-left'>incompleted</option>
      </select>
    </div>
  )
}

export default TodoFilter