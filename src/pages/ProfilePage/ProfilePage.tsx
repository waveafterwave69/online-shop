import { useEffect } from 'react'
import Profile from '../../components/Profile/Profile'

const ProfilePage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Profile />
        </>
    )
}

export default ProfilePage
