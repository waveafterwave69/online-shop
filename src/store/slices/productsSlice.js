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
        filtered: [],
        related: [],
        isLoading: false,
    },
    reducers: {
        filterByPrice: (state, action) => {
            state.filtered = state.list.filter(
                ({ price }) => price < action.payload
            )
        },
        getRelatedProducts: (state, action) => {
            const list = state.list.filter(
                ({ category: { id } }) => id === action.payload
            )
            state.related = [...list].sort(() => 0.5 - Math.random())
        },
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

export const { filterByPrice, getRelatedProducts } = productsSlice.actions

export default productsSlice.reducer
