import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todoList: [],
        doneList: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
        },
        moveTodo: (state, action) => {
            const item = state.todoList.splice(action.payload, 1);
            state.doneList.push(item);
        },
        deleteDone: (state, action) => {
            state.doneList.splice(action.payload, 1);
        },
    },
});

export const { addTodo, moveTodo, deleteDone } = todoSlice.actions;
export default todoSlice.reducer;
