import styles from './Footer.module.css'
import { Link } from 'react-router'

import footerLogo from '../../img/logo.svg'
import facebookImg from '../../img/fc.svg'
import youtubeImg from '../../img/yt.svg'
import instagramImg from '../../img/inst.svg'

export default function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footer__row}>
                    <div className={styles.row__img}>
                        <Link to="/">
                            <img src={footerLogo} alt="STUFF" />
                        </Link>
                    </div>
                    <ul className={styles.socials__list}>
                        <li className={styles.socials__item}>
                            <a href="#">
                                <img src={youtubeImg} alt="youtube" />
                            </a>
                        </li>
                        <li className={styles.socials__item}>
                            <a href="#">
                                <img src={facebookImg} alt="facebook" />
                            </a>
                        </li>
                        <li className={styles.socials__item}>
                            <a href="#">
                                <img src={instagramImg} alt="instagram" />
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    )
}
