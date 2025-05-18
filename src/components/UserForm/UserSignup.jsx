import styles from './UserForm.module.css'

import close from '../../img/close.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createUser,
    toggleForm,
    toggleFormType,
} from '../../store/slices/userSlice'

export default function UserSignup({ closeForm }) {
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

    return (
        <>
            {showForm && (
                <>
                    <div className={styles.user}>
                        <button className={styles.user__close}>
                            <img src={close} alt="close" onClick={closeForm} />
                        </button>

                        <h2 className={styles.user__title}>Register</h2>
                        <form
                            onSubmit={handleSubmit}
                            className={styles.user__form}
                        >
                            <p className={styles.error}>
                                Почта должна быть написана корректно
                            </p>
                            <input
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={values.email}
                                onChange={handleChange}
                                required
                                className={`${styles.form__item} ${styles.form__email}`}
                                placeholder="Email"
                            />
                            <p className={styles.error}>
                                Длина имени должна быть более 2 символов
                            </p>
                            <input
                                type="text"
                                name="name"
                                autoComplete="off"
                                value={values.name}
                                onChange={handleChange}
                                required
                                className={`${styles.form__item} ${styles.form__name}`}
                                placeholder="Username"
                            />
                            <p className={styles.error}>
                                В пароле должны быть цифры и буквы
                            </p>
                            <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                value={values.password}
                                onChange={handleChange}
                                required
                                className={`${styles.form__item} ${styles.form__password}`}
                                placeholder="Password"
                            />
                            <button className={styles.user__button}>
                                Create an account
                            </button>
                        </form>
                        <button
                            onClick={toggleForm}
                            type="button"
                            className={styles.user__button__another}
                        >
                            I already have an account
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
