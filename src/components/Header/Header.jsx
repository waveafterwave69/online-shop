import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import styles from './Header.module.css'

import headerLogoImg from '../../img/logo.svg'
import avatar from '../../img/avatar.svg'
import formSearchOmg from '../../img/search.svg'
import heartImg from '../../img/heart.svg'
import cartImg from '../../img/cart.svg'
import categoryImg from '../../img/category.svg'
import closeImg from '../../img/close.svg'
import { useSelector } from 'react-redux'

export default function Header() {
    const { user } = useSelector((state) => state)

    let totalCountOfCart = 0

    user.cart.forEach((el) => {
        totalCountOfCart += el.quantity
    })

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const handleOverlay = () => {
        if (isOpen) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
        return () => {
            document.body.classList.remove('no-scroll')
        }
    }, [isOpen])
    return (
        <>
            {isOpen && (
                <div className={styles.overlay} onClick={handleOverlay}></div>
            )}

            <div className={styles.burgerMenu}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '20px',
                        opacity: isOpen && '0',
                        transitionDuration: '0s',
                    }}
                >
                    <form
                        className={styles.form}
                        style={{
                            border: '1px solid rgba(97, 110, 116, 0.82)',
                            borderRadius: '6px',
                        }}
                    >
                        <div className={styles.form__row}>
                            <img
                                className={styles.form__search}
                                src={formSearchOmg}
                            />
                            <input
                                type="search"
                                name="search"
                                placeholder="Search for anything..."
                                autoComplete="off"
                                onChange={() => {}}
                                value=""
                            />
                        </div>

                        {false && <div className={styles.form__box}>da</div>}
                    </form>
                    <button
                        className={styles.burgerButton}
                        onClick={toggleMenu}
                    >
                        <div className={styles.burgerLine}></div>
                        <div className={styles.burgerLine}></div>
                        <div className={styles.burgerLine}></div>
                    </button>
                </div>

                {isOpen && (
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
                                <Link to="/" onClick={toggleMenu}>
                                    <div className={styles.user}>
                                        <img
                                            className={styles.user__avatar}
                                            src={avatar}
                                        />
                                        <div className={styles.user__name}>
                                            Guest
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li className={styles.count22}>
                                <Link to="/categoriespage" onClick={toggleMenu}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            columnGap: '15px',
                                        }}
                                    >
                                        <img src={categoryImg} alt="cart" />
                                        <p className={styles.count__text}>
                                            Categories
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" onClick={toggleMenu}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            columnGap: '15px',
                                        }}
                                    >
                                        <img src={heartImg} alt="favorites" />
                                        <p className={styles.count__text}>
                                            Favorites
                                        </p>
                                    </div>
                                </Link>
                            </li>
                            <li className={styles.count22}>
                                <Link to="/cart" onClick={toggleMenu}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            columnGap: '15px',
                                        }}
                                    >
                                        <img src={cartImg} alt="cart" />
                                        <p className={styles.count__text}>
                                            Cart
                                        </p>
                                    </div>

                                    {totalCountOfCart > 0 && (
                                        <span className={styles.count2}>
                                            {totalCountOfCart}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <header className={styles.header}>
                <div className={styles.header__logo}>
                    <Link to="/">
                        <img src={headerLogoImg} alt="STUFF" />
                    </Link>
                </div>

                <div className={styles.info}>
                    <Link to="/">
                        <div className={styles.user}>
                            <img className={styles.user__avatar} src={avatar} />
                            <div className={styles.user__name}>Guest</div>
                        </div>
                    </Link>

                    <form className={styles.form}>
                        <div className={styles.form__row}>
                            <img
                                className={styles.form__search}
                                src={formSearchOmg}
                            />
                            <input
                                type="search"
                                name="search"
                                placeholder="Search for anything..."
                                autoComplete="off"
                                onChange={() => {}}
                                value=""
                            />
                        </div>

                        {false && <div className={styles.form__box}>da</div>}
                    </form>

                    <ul className={styles.list}>
                        <li className={styles.list__item}>
                            <Link to="/favorites">
                                <img src={heartImg} alt="favorites" />
                            </Link>
                        </li>
                        <li className={styles.list__item}>
                            <Link to="/cart">
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
