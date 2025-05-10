import styles from './Poster.module.css'

import Promo from '../Promo/Promo'
import Sidebar from '../Sidebar/Sidebar'

export default function Poster() {
    return (
        <>
            <section className={styles.poster}>
                <div className={styles.poster__row}>
                    <Sidebar />
                    <Promo />
                </div>
            </section>
        </>
    )
}
