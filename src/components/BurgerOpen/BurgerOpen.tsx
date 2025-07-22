import useMenu from '../../hooks/useMenu'
import styles from './BurgerOpen.module.css'
import closeImg from '../../img/close.svg'
import { Link } from 'react-router'
import headerLogoImg from '../../img/logo.svg'
import avatar from '../../img/avatar.svg'
import { routesConfig } from '../../routes/routesConfig'
import BurgerOpenItems from '../BurgerOpenItems/BurgerOpenItem'

const BurgerOpen: React.FC = () => {
    const {
        handleClick,
        toggleMenu,
        currentUser,
        totalCountOfCart,
        totalCountOfFav,
        isOpen,
    } = useMenu()

    return (
        <>
            {isOpen && (
                <>
                    <div className={styles.menu}>
                        <button className={styles.close} onClick={toggleMenu}>
                            <img src={closeImg} alt="close" />
                        </button>
                        <ul className={styles.burgerList}>
                            <li>
                                <Link to="/" onClick={toggleMenu}>
                                    <img
                                        src={headerLogoImg}
                                        className={styles.header__logo}
                                        alt="STUFF"
                                    />
                                </Link>
                            </li>
                            <li>
                                <button onClick={toggleMenu}>
                                    {!currentUser ? (
                                        <div
                                            className={styles.user}
                                            onClick={handleClick}
                                        >
                                            <img
                                                className={styles.user__avatar}
                                                src={avatar}
                                            />
                                            <div className={styles.user__name}>
                                                Guest
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/profile"
                                            className={styles.user}
                                            onClick={handleClick}
                                        >
                                            <img
                                                className={styles.user__avatar}
                                                src={avatar}
                                            />
                                            <div className={styles.user__name}>
                                                {currentUser.name}
                                            </div>
                                        </Link>
                                    )}
                                </button>
                            </li>
                            {routesConfig.map(
                                (el) =>
                                    el.burger && (
                                        <BurgerOpenItems
                                            key={el.url}
                                            url={el.url}
                                            text={el.text}
                                            img={el.img}
                                            toggleMenu={toggleMenu}
                                            totalCountOfCart={totalCountOfCart}
                                            totalCountOfFav={totalCountOfFav}
                                            handleClick={handleClick}
                                        />
                                    )
                            )}
                        </ul>
                    </div>
                </>
            )}
        </>
    )
}

export default BurgerOpen
