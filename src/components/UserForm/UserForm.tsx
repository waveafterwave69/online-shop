import styles from './UserForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import UserSignup from './UserSignup'
import UserLogin from './UserLogin'
import { toggleForm } from '../../store/slices/userSlice'

const UserForm: React.FC = () => {
    const dispatch = useDispatch()
    const { showForm, formType } = useSelector((state: any) => state.user)

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

export default UserForm
