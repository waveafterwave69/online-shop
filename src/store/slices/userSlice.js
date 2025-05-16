import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createUser = createAsyncThunk(
    'users/getCategories',
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

const userSlice = createSlice({
    name: 'user',
    initialState: {
        curretnUser: {},
        cart: [],
        fav: [],
        isLoading: false,
        formType: 'signup',
        showForm: true,
    },
    reducers: {
        addItemToCart: (state, action) => {
            let newCart = [...state.cart]
            const found = state.cart.find(({ id }) => id === action.payload.id)

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
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.curretnUser = action.payload
        })
    },
})

export const {
    addItemToCart,
    removeItemFromCart,
    addItemToFav,
    removeItemFromFav,
    toggleForm,
} = userSlice.actions

export default userSlice.reducer
