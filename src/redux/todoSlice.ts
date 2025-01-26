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
interface TodoState {
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
    todos: loadTodoFromLocalStorage()
}

// todoSlice
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // add new Task
        addTodo: (state, action: PayloadAction<{text: string, category: string }>) => {
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
        editTodo: (state, action: PayloadAction<{id: string, NewText: string, NewCategory: string}>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id)
            if (todo) {
                todo.text = action.payload.NewText
                todo.category = action.payload.NewCategory
                localStorage.setItem('todos', JSON.stringify(state.todos))
            }
        }
    }
})

export const {addTodo, toggleTodo, removeTodo, editTodo} = todoSlice.actions
export default todoSlice.reducer