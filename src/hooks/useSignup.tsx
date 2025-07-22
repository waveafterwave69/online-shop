import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createUser,
    toggleFormType,
    toggleForm,
} from '../store/slices/userSlice'

interface UseSignupReturn {
    showForm: boolean
    handleSubmit: (e: React.FormEvent) => void
    values: {
        name: string
        email: string
        password: string
        avatar: string
    }
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    toggleForm: any
    toggleFormToSign: any
}

const useSignup = (): UseSignupReturn => {
    const { showForm } = useSelector((state: any) => state.user)

    const dispatch = useDispatch<any>()

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar: 'https://picsum.photos/800',
    })

    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
    })

    const toggleFormToSign = () => {
        dispatch(toggleFormType('login'))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every((val) => val)

        if (!isNotEmpty) return

        if (!errors.nameError && !errors.emailError && !errors.passwordError) {
            dispatch(createUser(values))
            dispatch(toggleForm(false))
        }
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

    return {
        showForm,
        handleSubmit,
        values,
        handleChange,
        toggleForm,
        toggleFormToSign,
    }
}

export default useSignup
