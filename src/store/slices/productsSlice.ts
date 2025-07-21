import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from '../../types'

interface ProductsState {
    list: Product[]
    filtered: Product[]
    related: Product[]
    isLoading: boolean
}

export const getProducts = createAsyncThunk<
    Product[],
    void,
    { rejectValue: any }
>('products/getProducts', async (_, thunkAPI) => {
    try {
        const res = await axios.get<Product[]>(
            'https://api.escuelajs.co/api/v1/products'
        )
        return res.data
    } catch (error: any) {
        console.log(error)
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState: ProductsState = {
    list: [],
    filtered: [],
    related: [],
    isLoading: false,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        filterByPrice: (state, action: PayloadAction<number>) => {
            state.filtered = state.list.filter(
                ({ price }) => price < action.payload
            )
        },
        getRelatedProducts: (state, action: PayloadAction<number>) => {
            const list = state.list.filter(
                ({ category: { id } }) => id === action.payload
            )
            state.related = [...list].sort(() => 0.5 - Math.random())
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            getProducts.fulfilled,
            (state, action: PayloadAction<Product[]>) => {
                state.list = action.payload
                state.isLoading = false
            }
        )
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export const { filterByPrice, getRelatedProducts } = productsSlice.actions

export default productsSlice.reducer
