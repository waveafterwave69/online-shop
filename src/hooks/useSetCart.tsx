import { useDispatch } from 'react-redux'
import { addItemToCart, removeItemFromCartAll } from '../store/slices/userSlice'

const useSetCart = () => {
    const dispatch = useDispatch()

    const setCart = (item: any, quantity: any) => {
        if (quantity > 0) {
            dispatch(addItemToCart({ ...item, quantity }))
        } else {
            dispatch(removeItemFromCartAll(item))
        }
    }

    return { setCart }
}

export default useSetCart
