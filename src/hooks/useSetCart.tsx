import { useDispatch } from 'react-redux'
import {
    addItemToCart,
    removeItemFromCart,
    removeItemFromCartAll,
} from '../store/slices/userSlice'
import { CartItem } from '../types'

const useSetCart = () => {
    const dispatch = useDispatch()

    const setCart = (item: CartItem, quantity: number) => {
        dispatch(addItemToCart({ ...item, quantity }))
    }

    const removeItem = (item: CartItem | any) => {
        dispatch(removeItemFromCartAll(item))
    }

    const removeItemOne = (item: CartItem | any) => {
        dispatch(removeItemFromCart(item))
    }

    return { setCart, removeItem, removeItemOne }
}

export default useSetCart
