import styles from './UserForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import UserSignup from './UserSignup'
import UserLogin from './UserLogin'
import { toggleForm } from '../../store/slices/userSlice'

export default function UserForm() {
    const dispatch = useDispatch()
    const { showForm, formType } = useSelector((state) => state.user)

    const closeForm = () => {
        dispatch(toggleForm(false))
    }

    return (
        showForm && (
            <>
                <div className={styles.overlay} onClick={closeForm}></div>
                {formType === 'signup' ? (
                    <UserSignup closeForm={closeForm} />
                ) : (
                    <UserLogin closeForm={closeForm} />
                )}
            </>
        )
    )
}
