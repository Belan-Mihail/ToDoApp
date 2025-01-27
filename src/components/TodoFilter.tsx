import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../redux/todoSlice'
import { RootState } from '../redux/store'

const TodoFilter:React.FC = () => {
  const dispatch = useDispatch()

  // get current filters
  const currentFilters = useSelector((state:RootState) => state.todos.filter)

  return (
    <div>TodoFilter</div>
  )
}

export default TodoFilter