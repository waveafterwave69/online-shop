import { useParams } from 'react-router'
import { useGetProductQuery } from '../store/api/apiSlice'
import { useEffect, useState } from 'react'
import {
    addItemToCart,
    addItemToFav,
    removeItemFromCart,
    removeItemFromFav,
    toggleForm,
} from '../store/slices/userSlice'
import { getRelatedProducts } from '../store/slices/productsSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function useSingleCategory() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const {
        products: { related, list },
        user,
    } = useSelector((state) => state)
    const { data, isLoading } = useGetProductQuery({ id })

    const [cart, setCart] = useState(false)
    const [fav, setFav] = useState(false)
    const [img, setImg] = useState(0)
    const [currentSize, setCurrentSize] = useState('')

    const currentUser = user.currentUser

    useEffect(() => {
        setImg(0)
        setCart(false)
        setFav(false)
        setCurrentSize('')
        window.scrollTo(0, 0)

        if (!data || !list.length) return

        dispatch(getRelatedProducts(data.category.id))
    }, [data, dispatch, !list.length])

    const handleCart = () => {
        if (!currentUser) {
            dispatch(toggleForm(true))
        } else {
            setCart(true)
            dispatch(addItemToCart(data))
        }
    }

    const handleCartMinus = () => {
        dispatch(removeItemFromCart(data))
    }

    const handleFav = () => {
        dispatch(addItemToFav(data))
        setFav(true)
    }

    const handleFavMinus = () => {
        dispatch(removeItemFromFav(data))
        setFav(false)
    }

    const handleSize = (size) => {
        if (size !== currentSize) {
            setCart(false)
            setCurrentSize(size)
        }
    }

    let needEl
    let needFav

    user.cart.forEach((el) => {
        if (el.id == id) {
            needEl = el
        }
    })

    user.fav.forEach((el) => {
        if (el.id == id) {
            needFav = el
        }
    })

    return {
        isLoading,
        related,
        data,
        currentSize,
        img,
        needEl,
        handleCart,
        needFav,
        handleFav,
        fav,
        handleSize,
        handleFavMinus,
        handleCartMinus,
    }
}
