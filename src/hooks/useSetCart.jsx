import { useDispatch } from 'react-redux'
import { addItemToCart, removeItemFromCartAll } from '../store/slices/userSlice'

export default function useSetCart() {
    const dispatch = useDispatch()

    const setCart = (item, quantity) => {
        if (quantity > 0) {
            dispatch(addItemToCart({ ...item, quantity }))
        } else {
            dispatch(removeItemFromCartAll(item))
        }
    }

    return { setCart }
}
