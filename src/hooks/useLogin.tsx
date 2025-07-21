import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, toggleFormType } from '../store/slices/userSlice'

interface UseLoginReturn {
    toggleForm: () => void
    handleChange: (e: any) => void
    handleSubmit: (e: any) => void
    showForm: boolean
    values: {
        email: string
        password: string
    }
}

const useLogin = (closeForm: () => void): UseLoginReturn => {
    const { showForm } = useSelector((state: any) => state.user)

    const dispatch = useDispatch<any>()

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const toggleForm = () => {
        dispatch(toggleFormType('signup'))
    }

    const handleChange = (e: any) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        dispatch(loginUser(values))
        closeForm()
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
