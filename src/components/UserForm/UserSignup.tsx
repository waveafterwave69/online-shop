import styles from './UserForm.module.css'
import close from '../../img/close.svg'
import useSignup from '../../hooks/useSignup'

interface UserSignupProps {
    closeForm: () => void
}

const UserSignup: React.FC<UserSignupProps> = ({ closeForm }) => {
    const { showForm, handleSubmit, values, handleChange, toggleFormToSign } =
        useSignup()

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
                            onClick={toggleFormToSign}
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

export default UserSignup
