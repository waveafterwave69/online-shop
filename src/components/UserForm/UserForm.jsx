import styles from './UserForm.module.css'

import close from '../../img/close.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../../store/slices/userSlice'

export default function UserForm() {
    const { showForm } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...value, [name]: value })
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
                    <div className={styles.overlay}></div>
                    <div className={styles.user}>
                        <button className={styles.user__close}>
                            <img
                                src={close}
                                alt="close"
                                onClick={() => dispatch(toggleForm(false))}
                            />
                        </button>

                        <h2 className={styles.user__title}>Register</h2>
                        <form action="" className={styles.user__form}>
                            <input
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                required
                                className={`${styles.form__item} ${styles.form__email}`}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                required
                                className={`${styles.form__item} ${styles.form__name}`}
                                placeholder="Username"
                            />
                            <input
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                required
                                className={`${styles.form__item} ${styles.form__password}`}
                                placeholder="Password"
                            />
                            <button className={styles.user__button}>
                                Sign Up
                            </button>
                        </form>
                        <button
                            className={styles.user__button}
                            style={{ marginTop: '10px' }}
                        >
                            Log In
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
