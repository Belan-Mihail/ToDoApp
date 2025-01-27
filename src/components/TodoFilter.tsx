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
    <div className='flex gap-2'>
      <select value={currentFilters.category} onChange={handleCategoryChange} className='p-2'>
        <option value="all">all</option>
        <option value="family">family</option>
        <option value="work">work</option>
        <option value="private">private</option>
      </select>
    </div>
  )
}

export default TodoFilter