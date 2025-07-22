import { Link } from 'react-router'
import styles from './Header.module.css'
import headerLogoImg from '../../img/logo.svg'
import avatar from '../../img/avatar.svg'
import heartImg from '../../img/heart.svg'
import cartImg from '../../img/cart.svg'
import useMenu from '../../hooks/useMenu'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import HeaderSearch from '../HeaderSearch/HeaderSearch'

const Header: React.FC = () => {
    const {
        isOpen,
        handleClick,
        handleOverlay,
        currentUser,
        totalCountOfCart,
        totalCountOfFav,
    } = useMenu()

    return (
        <>
            {isOpen && (
                <div className={styles.overlay} onClick={handleOverlay}></div>
            )}
            <BurgerMenu />
            <header className={styles.header}>
                <div className={styles.header__logo}>
                    <Link to="/">
                        <img src={headerLogoImg} alt="STUFF" />
                    </Link>
                </div>
                <div className={styles.info}>
                    <button>
                        {!currentUser ? (
                            <div className={styles.user} onClick={handleClick}>
                                <img
                                    className={styles.user__avatar}
                                    src={avatar}
                                />
                                <div className={styles.user__name}>Guest</div>
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
                    <HeaderSearch />

                    <ul className={styles.list}>
                        <li className={styles.list__item}>
                            <Link to="/favorites">
                                <img src={heartImg} alt="favorites" />
                                {totalCountOfFav > 0 && (
                                    <span className={styles.count2}>
                                        {totalCountOfFav}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li className={styles.list__item} onClick={handleClick}>
                            <Link to={currentUser && '/cart'}>
                                <img src={cartImg} alt="cart" />
                                {totalCountOfCart > 0 && (
                                    <span className={styles.count}>
                                        {totalCountOfCart}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header
