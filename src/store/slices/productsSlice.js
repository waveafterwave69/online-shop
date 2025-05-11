import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        try {
            const res = await axios('https://api.escuelajs.co/api/v1/products')
            return res.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        // filtered: [],
        // related: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.list = action.payload
            state.isLoading = false
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export default productsSlice.reducer
