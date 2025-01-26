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

