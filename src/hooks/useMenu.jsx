import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../store/api/apiSlice'
import { toggleForm, toggleFormType } from '../store/slices/userSlice'
import { setOpen } from '../store/slices/burgerSlice'

export default function useMenu() {
    const [searchValue, setSearchValue] = useState('')
    const [showSearchValue, setShowSearchValue] = useState(false)

    const dispatch = useDispatch()
    const { isOpen } = useSelector((state) => state.burger)
    const { user } = useSelector((state) => state)
    const { data, isLoading } = useGetProductsQuery({ title: searchValue })
    let totalCountOfCart = 0
    let totalCountOfFav = 0

    const currentUser = user.currentUser

    const handleSearch = (e) => {
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

    user.cart.forEach((el) => {
        totalCountOfCart += el.quantity
    })

    user.fav.forEach((el) => {
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
        setOpen,
        currentUser,
    }
}
