import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Category } from '../../types'

interface CategoriesState {
    list: any
    isLoading: boolean
}

export const getCategories = createAsyncThunk<
    Category[],
    void,
    { rejectValue: any }
>('categories/getCategories', async (_, thunkAPI) => {
    try {
        const res = await axios.get<Category[]>(
            'https://api.escuelajs.co/api/v1/categories'
        )
        return res.data
    } catch (error: any) {
        console.log(error)
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState: CategoriesState = {
    list: [],
    isLoading: false,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.list = action.payload
            state.isLoading = true
        })
        builder.addCase(
            getCategories.fulfilled,
            (state, action: PayloadAction<Category[]>) => {
                state.list = action.payload
                state.isLoading = false
            }
        )
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false
        })
    },
})

export default categoriesSlice.reducer
