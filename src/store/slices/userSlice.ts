import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CartItem, FavItem, User, UserLogin } from '../../types'

interface UserState {
    form: boolean
    formType: 'login' | 'signup'
    cart: CartItem[]
    fav: FavItem[]
}

const initialState: UserState = {
    form: false,
    formType: 'login',
    cart: [],
    fav: [],
}

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload: User, thunkAPI) => {
        try {
            const res = await axios.post(
                'https://api.escuelajs.co/api/v1/users',
                payload
            )
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (payload: UserLogin, thunkAPI) => {
        try {
            const res = await axios.post(
                'https://api.escuelajs.co/api/v1/auth/login',
                payload
            )
            const login = await axios(
                'https://api.escuelajs.co/api/v1/auth/profile',
                {
                    headers: {
                        Authorization: `Bearer ${res.data.access_token}`,
                    },
                }
            )
            return login.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>(
    'users/updateUser',
    async (payload: User, thunkAPI) => {
        try {
            const res = await axios.put<User>(
                `https://api.escuelajs.co/api/v1/users/${payload.id}`,
                payload
            )
            return res.data
        } catch (error: any) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.message) //Reject with a string, and not an error.
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            )

            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex].quantity +=
                    action.payload.quantity
            } else {
                state.cart.push({ ...action.payload })
            }
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart
                .map((item: any) => {
                    if (item.id === action.payload && item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    return item
                })
                .filter(
                    (item) => item.id !== action.payload || item.quantity > 0
                )
        },
        addItemToFav: (state, action: PayloadAction<FavItem>) => {
            const existingItemIndex = state.fav.findIndex(
                (item) => item.id === action.payload.id
            )
            if (existingItemIndex === -1) {
                state.fav.push(action.payload)
            }
        },
        removeItemFromFav: (state, action: PayloadAction<number>) => {
            state.fav = state.fav.filter(
                (item: any) => item.id !== action.payload
            )
        },
        toggleForm: (state, action: PayloadAction<boolean>) => {
            state.form = action.payload
        },
        toggleFormType: (state, action: PayloadAction<'login' | 'signup'>) => {
            state.formType = action.payload
        },
        removeItemFromCartAll: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(
                (item: any) => item.id !== action.payload
            )
        },
    },
})

export const {
    addItemToCart,
    removeItemFromCart,
    addItemToFav,
    removeItemFromFav,
    toggleForm,
    toggleFormType,
    removeItemFromCartAll,
} = userSlice.actions

export default userSlice.reducer
