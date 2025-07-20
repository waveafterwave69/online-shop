import styles from './UserForm.module.css'
import close from '../../img/close.svg'
import useLogin from '../../hooks/useLogin'

export default function UserLogin({ closeForm }) {
    const { toggleForm, handleChange, handleSubmit, showForm, values } =
        useLogin()

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
