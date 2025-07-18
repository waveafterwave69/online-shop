import useMenu from '../../hooks/useMenu'
import BurgerOpen from '../BurgerOpen/BurgerOpen'
import BurgerClose from '../BurgerCLose/BurgerClose'

export default function BurgerMenu() {
    const { isOpen } = useMenu()

    return <>{!isOpen ? <BurgerClose /> : <BurgerOpen />}</>
}
