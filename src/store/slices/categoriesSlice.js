import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        try {
            const res = await axios(
                'https://api.escuelajs.co/api/v1/categories'
            )
            return res.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.list = action.payload
            state.isLoading = true
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.list = action.payload
            state.isLoading = false
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export default categoriesSlice.reducer
