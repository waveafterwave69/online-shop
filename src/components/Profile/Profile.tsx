import styles from './Profile.module.css'
import SideBar from '../Sidebar/Sidebar'
import useProfile from '../../hooks/useProfile'

const Profile: React.FC = () => {
    const { values, handleChange, handleSubmit } = useProfile()

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

export default Profile
