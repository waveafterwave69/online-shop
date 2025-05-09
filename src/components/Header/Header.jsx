import { Link } from 'react-router'
import styles from './Header.module.css'

import headerLogoImg from '../../img/logo.svg'
import avatar from '../../img/avatar.svg'
import formSearchOmg from '../../img/search.svg'
import heartImg from '../../img/heart.svg'
import cartImg from '../../img/cart.svg'

export default function Header() {
    return (
        <>
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
                        <div className={styles.form__box}></div>
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
