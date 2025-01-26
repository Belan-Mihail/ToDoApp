import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

interface Todo {
    id: string,
    text: string,
    complete: boolean,
    category: string
}

interface TodoState {
    todos: Todo[] 
}

// Load tasks from local storage
const loadTodoFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
}

const initialState:TodoState = {
    todos: loadTodoFromLocalStorage()
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
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
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload)
            if (todo) {
                todo.complete = !todo.complete
                localStorage.setItem('todos', JSON.stringify(state.todos))
            }
        }
    }
})