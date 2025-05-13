import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './slices/categoriesSlice'
import productsSlice from './slices/productsSlice'
import userSlice from './slices/userSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
