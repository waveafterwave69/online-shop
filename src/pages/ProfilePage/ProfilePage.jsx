import { useEffect } from 'react'
import Profile from '../../components/Profile/Profile'

export default function ProfilePage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Profile />
        </>
    )
}
