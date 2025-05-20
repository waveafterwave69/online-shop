import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createUser = createAsyncThunk(
    'users/createUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(
                'https://api.escuelajs.co/api/v1/users',
                payload
            )
            return res.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (payload, thunkAPI) => {
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
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (payload, thunkAPI) => {
        try {
            const res = await axios.put(
                `https://api.escuelajs.co/api/v1/users/${payload.id}`,
                payload
            )
            return res.data
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(err)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: false,
        cart: [],
        fav: [],
        isLoading: false,
        formType: 'signup',
        showForm: false,
    },
    reducers: {
        addItemToCart: (state, action) => {
            let newCart = [...state.cart]
            const found = state.cart.find(({ id }) => id === action.payload.id)
            console.log(action)
            console.log(action.payload)

            if (found) {
                newCart = newCart.map((item) => {
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
            let newCart = [...state.cart]

            newCart = newCart.map((item) => {
                return item.id === action.payload.id
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item
            })

            state.cart = newCart
        },
        addItemToFav: (state, action) => {
            let newFav = state.fav

            newFav.push({ ...action.payload, fav: true })

            state.fav = newFav
        },
        removeItemFromFav: (state, action) => {
            let newFav = [...state.fav]

            newFav = newFav.map((item) => {
                return item.id === action.payload.id
                    ? {
                          ...item,
                          fav: (item = false),
                      }
                    : item
            })

            state.fav = newFav
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
} = userSlice.actions

export default userSlice.reducer
