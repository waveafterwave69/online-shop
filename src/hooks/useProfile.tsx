import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../store/slices/userSlice'
import { User } from '../types'

interface UseProfileReturn {
    values: User
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent) => void
}

const useProfile = (): UseProfileReturn => {
    const { currentUser } = useSelector((state: any) => state.user) as {
        currentUser: User
    }

    const dispatch = useDispatch<any>()

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar: 'https://picsum.photos/800',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
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

export default useProfile
