import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

// Todo interface
interface Todo {
    id: string,
    text: string,
    complete: boolean,
    category: 'family' | 'work' | 'private'
}

// TodoState interface
export interface TodoState {
    todos: Todo[] 
    filter: {
        category: 'all' | 'family' | 'work' | 'private',
        completed: 'all' | 'completed' | 'incompleted'
    }
}

// Load tasks from local storage
const loadTodoFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
}

// initial todoState
const initialState:TodoState = {
    todos: loadTodoFromLocalStorage(),
    filter: {
        category: 'all',
        completed: 'all',
    },
}

// Task filter
const filteredTodos = (todos: Todo[], filter: TodoState['filter']) => {
    return todos.filter((todo) => {
        const categoryMatch = filter.category === 'all' || todo.category === filter.category
        const completionMatch = filter.completed === 'all' || (filter.completed === 'completed' && todo.complete) ||(filter.completed === 'incompleted' && !todo.complete)
    
    return categoryMatch && completionMatch
    })
}

// todoSlice
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // add new Task
        addTodo: (state, action: PayloadAction<{text: string, category: 'family' | 'work' | 'private' }>) => {
            const newTodo = {
                id: uuidv4(),
                text: action.payload.text,
                complete: false,
                category: action.payload.category
            }
            state.todos.push(newTodo)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        // switch complete status
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload)
            if (todo) {
                todo.complete = !todo.complete
                localStorage.setItem('todos', JSON.stringify(state.todos))
            }
        },
        // delete task
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        // edit task
        editTodo: (state, action: PayloadAction<{id: string, NewText: string, NewCategory: 'family' | 'work' | 'private'}>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id)
            if (todo) {
                todo.text = action.payload.NewText
                todo.category = action.payload.NewCategory
                localStorage.setItem('todos', JSON.stringify(state.todos))
            }
        },
        // update filter
        setFilter: (state, action: PayloadAction<{ category: 'all' | 'family' | 'work' | 'private'; completed: 'all' | 'completed' | 'incompleted' }>) => {
            state.filter = action.payload
        }
    }
})

export const {addTodo, toggleTodo, removeTodo, editTodo} = todoSlice.actions
export default todoSlice.reducer

export const selectFilteredTodos = (state: { todos: TodoState }) => {
    return filteredTodos(state.todos.todos, state.todos.filter);
  };