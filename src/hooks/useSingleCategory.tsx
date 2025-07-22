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
import { CartItem, FavItem, Product } from '../types'

interface UseSingleCategoryReturn {
    isLoading: boolean
    related: Product[]
    data: Product | undefined
    currentSize: number
    img: number
    needEl: CartItem | undefined
    handleCart: () => void
    needFav: FavItem | undefined
    handleFav: () => void
    fav: boolean
    handleSize: (size: number) => void
    handleFavMinus: () => void
    handleCartMinus: () => void
    cart: boolean
    setImg: any
}

const useSingleCategory = (): UseSingleCategoryReturn => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id?: string }>()
    const {
        products: { related, list },
        user,
    }: any = useSelector((state) => state)
    const { data, isLoading } = useGetProductQuery({ id })

    const [cart, setCart] = useState<boolean>(false)
    const [fav, setFav] = useState<boolean>(false)
    const [img, setImg] = useState<number>(0)
    const [currentSize, setCurrentSize] = useState<number>(0)

    const currentUser = user.currentUser

    useEffect(() => {
        setImg(0)
        setCart(false)
        setFav(false)
        setCurrentSize(0)
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

    const handleSize = (size: number) => {
        if (size !== currentSize) {
            setCart(false)
            setCurrentSize(size)
        }
    }

    let needEl
    let needFav

    user.cart.forEach((el: FavItem) => {
        if (el.id == id) {
            needEl = el
        }
    })

    user.fav.forEach((el: FavItem) => {
        if (el.id == id) {
            needFav = el
        }
    })

    return {
        cart,
        isLoading,
        related,
        data,
        currentSize,
        img,
        setImg,
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

export default useSingleCategory
