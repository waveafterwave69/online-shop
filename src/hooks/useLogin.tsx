import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, toggleFormType } from '../store/slices/userSlice'

interface UseLoginReturn {
    toggleForm: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent) => void
    showForm: boolean
    values: {
        email: string
        password: string
    }
}

const useLogin = (): UseLoginReturn => {
    const { showForm } = useSelector((state: any) => state.user)

    const dispatch = useDispatch<any>()

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const toggleForm = () => {
        dispatch(toggleFormType('signup'))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every((val) => val)

        if (!isNotEmpty) return

        dispatch(loginUser(values))
    }

    useEffect(() => {
        if (showForm) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
        return () => {
            document.body.classList.remove('no-scroll')
        }
    }, [showForm])

    return { toggleForm, handleChange, handleSubmit, showForm, values }
}

export default useLogin
