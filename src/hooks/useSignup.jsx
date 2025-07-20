import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, toggleFormType } from '../store/slices/userSlice'

export default function useSignup() {
    const { showForm } = useSelector((state) => state.user)

    const dispatch = useDispatch()

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

    const toggleForm = () => {
        dispatch(toggleFormType('login'))
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every((val) => val)

        if (!isNotEmpty) return

        if (!errors.nameError && !errors.emailError && !errors.passwordError) {
            dispatch(createUser(values))
            closeForm()
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

    return { showForm, handleSubmit, values, handleChange, toggleForm }
}
