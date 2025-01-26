import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

