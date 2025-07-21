import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../store/api/apiSlice'
import { toggleForm, toggleFormType } from '../store/slices/userSlice'
import { setOpen } from '../store/slices/burgerSlice'

import { CartItem, FavItem, Product } from '../types'

interface UseMenuReturn {
    isOpen: boolean
    searchValue: string
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    setShowSearchValue: React.Dispatch<React.SetStateAction<boolean>>
    showSearchValue: boolean
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    itemClick: () => void
    toggleMenu: () => void
    handleOverlay: () => void
    handleClick: () => void
    data: Product[] | undefined
    isLoading: boolean
    totalCountOfCart: number
    totalCountOfFav: number
    setOpen: (value: boolean) => void
    currentUser: any
}

const useMenu = (): UseMenuReturn => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [showSearchValue, setShowSearchValue] = useState<boolean>(false)

    const dispatch = useDispatch()
    const { isOpen } = useSelector((state: any) => state.burger)
    const { user } = useSelector((state: any) => state)
    const { data, isLoading } = useGetProductsQuery({ title: searchValue })
    let totalCountOfCart = 0
    let totalCountOfFav = 0

    const currentUser = user.currentUser

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        setShowSearchValue(true)
    }

    window.onclick = () => {
        setShowSearchValue(false)
    }

    const itemClick = () => {
        setSearchValue('')
        setShowSearchValue(false)
    }

    user.cart.forEach((el: CartItem) => {
        totalCountOfCart += el.quantity
    })

    user.fav.forEach((el: FavItem) => {
        if (el.fav) {
            totalCountOfFav++
        }
    })

    const toggleMenu = () => {
        dispatch(setOpen())
    }

    const handleOverlay = () => {
        if (isOpen) {
            dispatch(setOpen())
        }
    }

    const handleClick = () => {
        if (!currentUser) {
            dispatch(toggleFormType('signup'))
            dispatch(toggleForm(true))
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
        return () => {
            document.body.classList.remove('no-scroll')
        }
    }, [isOpen])

    return {
        isOpen,
        searchValue,
        setSearchValue,
        setShowSearchValue,
        showSearchValue,
        handleSearch,
        itemClick,
        toggleMenu,
        handleOverlay,
        handleClick,
        data,
        isLoading,
        totalCountOfCart,
        totalCountOfFav,
        setOpen: (value: boolean | any) => dispatch(setOpen(value)),
        currentUser,
    }
}

export default useMenu
