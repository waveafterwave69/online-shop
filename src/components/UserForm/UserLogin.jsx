import styles from './UserForm.module.css'

import close from '../../img/close.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, toggleFormType } from '../../store/slices/userSlice'

export default function UserLogin({ closeForm }) {
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
                                Log in
                            </button>
                        </form>
                        <button
                            onClick={toggleForm}
                            type="button"
                            className={styles.user__button__another}
                        >
                            Create an account
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
