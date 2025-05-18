import styles from './Profile.module.css'
import SideBar from '../Sidebar/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateUser } from '../../store/slices/userSlice'

export default function Profile() {
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

    return (
        <>
            <section className={styles.profile}>
                <SideBar amount={8} />
                <form onSubmit={handleSubmit} className={styles.user__form}>
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
                    <button className={styles.user__button}>Update</button>
                </form>
            </section>
        </>
    )
}
