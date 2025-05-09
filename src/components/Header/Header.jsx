import { Link } from 'react-router'
import styles from './Header.module.css'

import headerLogoImg from '../../img/logo.svg'
import avatar from '../../img/avatar.svg'
import formSearchOmg from '../../img/search.svg'
import heartImg from '../../img/heart.svg'
import cartImg from '../../img/cart.svg'
import { useState } from 'react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {isOpen && <div className={styles.overlay}></div>}
            <div className={styles.burgerMenu} style={{ padding: '20px 30px' }}>
                <button
                    className={styles.burgerButton}
                    onClick={toggleMenu}
                    style={{ opacity: isOpen && '0', transitionDuration: '0s' }}
                >
                    <div className={styles.burgerLine}></div>
                    <div className={styles.burgerLine}></div>
                    <div className={styles.burgerLine}></div>
                </button>
                {isOpen && (
                    <div className={styles.menu}>
                        <button onClick={toggleMenu} style={{ color: 'red' }}>
                            close
                        </button>
                        <ul className={styles.burgerList}>
                            <li>
                                <Link to="/">
                                    <img src={headerLogoImg} alt="STUFF" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
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
                            <li>
                                <Link to="/favorites">
                                    <img src={heartImg} alt="favorites" />
                                </Link>
                            </li>
                            <li className={styles.count22}>
                                <Link to="/cart">
                                    <img src={cartImg} alt="cart" />
                                    <span className={styles.count2}>2</span>
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

                        <div className={styles.form__box}>da</div>
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
                                <span className={styles.count}>2</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}
