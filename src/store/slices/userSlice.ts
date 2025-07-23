import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from '../../types'

interface UserPayload {
    id?: number
    name: string
    email: string
    password: string
    avatar: string
}

interface loginUserPayload {
    email: string
    password: string
}

interface Cart {
    quantity: number
    id: number
    currentUser: boolean
    cart: never[]
    fav: never[]
    isLoading: boolean
    formType: string
    showForm: boolean
}

interface initialState {
    currentUser: boolean
    cart: Cart[] | never[]
    fav: Product[] | never[]
    isLoading: boolean
    formType: 'signup' | 'login'
    showForm: boolean
}

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload: UserPayload, thunkAPI) => {
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
    async (payload: loginUserPayload, thunkAPI) => {
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

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload: UserPayload, thunkAPI) => {
        try {
            const res = await axios.put(
                `https://api.escuelajs.co/api/v1/users/${payload.id}`,
                payload
            )
            return res.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const initialState: initialState = {
    currentUser: false,
    cart: [],
    fav: [],
    isLoading: false,
    formType: 'signup',
    showForm: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            let newCart: Cart[] = [...state.cart]
            const found = state.cart.find(({ id }) => id === action.payload.id)

            if (found) {
                newCart = newCart.map((item: Cart) => {
                    return item.id === action.payload.id
                        ? {
                              ...item,
                              quantity:
                                  action.payload.quantity || item.quantity + 1,
                          }
                        : item
                })
            } else newCart.push({ ...action.payload, quantity: 1 })

            state.cart = newCart
        },
        removeItemFromCart: (state, action) => {
            let newCart: Cart[] = [...state.cart]

            newCart = newCart.map((item: Cart) => {
                return item.id === action.payload.id
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item
            })

            state.cart = newCart
        },
        removeItemFromCartAll: (state, action) => {
            state.cart = state.cart.filter(({ id }) => id !== action.payload.id)
        },
        addItemToFav: (state, action) => {
            let newFav: Product[] = state.fav

            newFav.push({ ...action.payload, fav: true })

            state.fav = newFav
        },
        removeItemFromFav: (state, action) => {
            state.fav = state.fav.filter(({ id }) => id !== action.payload.id)
        },
        toggleForm: (state, action) => {
            state.showForm = action.payload
        },
        toggleFormType: (state, action) => {
            state.formType = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
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
