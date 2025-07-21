import useMenu from '../../hooks/useMenu'
import BurgerOpen from '../BurgerOpen/BurgerOpen'
import BurgerClose from '../BurgerCLose/BurgerClose'

const BurgerMenu: React.FC = () => {
    const { isOpen } = useMenu()

    return <>{!isOpen ? <BurgerClose /> : <BurgerOpen />}</>
}

export default BurgerMenu
