import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TodosType = {
    id: string
    text: string
    completed: boolean
}

interface TodoState {
    todos: TodosType[]
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
    },
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<string>) => {
            state.todos.push({
                id: new Date().toISOString(),
                text: action.payload,
                completed: false,
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(
                (todo: TodosType) => todo.id !== action.payload.id
            )
        },
    },
})

export const { addTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer
