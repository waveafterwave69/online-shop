import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, toggleFormType } from '../store/slices/userSlice'

export default function useLogin() {
    const { showForm } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const toggleForm = () => {
        dispatch(toggleFormType('signup'))
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every((val) => val)

        if (!isNotEmpty) return

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
