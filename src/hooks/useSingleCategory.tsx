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

interface ProductsState {
    related: Product[]
    list: Product[]
}

interface UserState {
    user: {
        cart: CartItem[]
        fav: FavItem[]
        currentUser: any
    }
}

interface UseSingleCategoryReturn {
    isLoading: boolean
    related: Product[]
    data: Product | undefined
    currentSize: string
    img: number
    needEl: CartItem | undefined
    handleCart: () => void
    needFav: FavItem | undefined
    handleFav: () => void
    fav: boolean
    handleSize: (size: string) => void
    handleFavMinus: () => void
    handleCartMinus: () => void
    cart: boolean
    setImg: any
}

const useSingleCategory = (): UseSingleCategoryReturn => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id?: string }>()
    const { products, user } = useSelector((state: any) => ({
        products: state.products as ProductsState,
        user: state.user as UserState,
    }))
    const { data, isLoading } = useGetProductQuery({ id })

    const [cart, setCart] = useState(false)
    const [fav, setFav] = useState(false)
    const [img, setImg] = useState(0)
    const [currentSize, setCurrentSize] = useState('')

    const currentUser = user.user?.currentUser

    useEffect(() => {
        setImg(0)
        setCart(false)
        setFav(false)
        setCurrentSize('')
        window.scrollTo(0, 0)

        if (!data) return

        dispatch(getRelatedProducts(data.category.id))
    }, [data, dispatch])

    const handleCart = () => {
        if (!currentUser) {
            dispatch(toggleForm(true))
        } else {
            if (data) {
                setCart(true)
                dispatch(addItemToCart(data))
            }
        }
    }

    const handleCartMinus = () => {
        if (data) {
            dispatch(removeItemFromCart(data))
        }
    }

    const handleFav = () => {
        if (data) {
            dispatch(addItemToFav(data))
            setFav(true)
            console.log('hello')
        }
    }

    const handleFavMinus = () => {
        if (data) {
            dispatch(removeItemFromFav(data))
            setFav(false)
        }
    }

    const handleSize = (size: string) => {
        if (size !== currentSize) {
            setCart(false)
            setCurrentSize(size)
        }
    }

    const needEl = user.user?.cart.find((el) => el.id === String(id))
    const needFav = user.user?.fav.find((el) => el.id === String(id))

    return {
        isLoading,
        related: products.related,
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
        cart,
        setImg,
    }
}

export default useSingleCategory
