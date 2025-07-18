import { createSlice } from '@reduxjs/toolkit'

const burgerSlice = createSlice({
    name: 'burger',
    initialState: {
        isOpen: false,
    },
    reducers: {
        setOpen: (state) => {
            state.isOpen = !state.isOpen
        },
    },
})

export const { setOpen } = burgerSlice.actions

export default burgerSlice.reducer
