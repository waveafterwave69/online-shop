import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/slices/userSlice'

export default function useProfile() {
    const { currentUser } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar: 'https://picsum.photos/800',
    })

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every((val) => val)

        if (!isNotEmpty) return

        dispatch(updateUser(values))
    }

    useEffect(() => {
        if (!currentUser) return

        setValues(currentUser)
    }, [currentUser])

    return {
        values,
        handleChange,
        handleSubmit,
    }
}
