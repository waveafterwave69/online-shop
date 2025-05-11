import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import styles from './Header.module.css'

import headerLogoImg from '../../img/logo.svg'
import avatar from '../../img/avatar.svg'
import formSearchOmg from '../../img/search.svg'
import heartImg from '../../img/heart.svg'
import cartImg from '../../img/cart.svg'
import closeImg from '../../img/close.svg'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
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
            {isOpen && <div className={styles.overlay}></div>}
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
                                <Link to="/">
                                    <img
                                        src={headerLogoImg}
                                        className={styles.header__logo}
                                        alt="STUFF"
                                    />
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
                                <Link to="/cart">
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
                                <span className={styles.count}>2</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}
