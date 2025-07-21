import styles from './Poster.module.css'

import Promo from '../Promo/Promo'
import Sidebar from '../Sidebar/Sidebar'

const Poster: React.FC = () => {
    return (
        <>
            <section className={styles.poster}>
                <div className={styles.poster__row}>
                    <Sidebar amount={8} />
                    <Promo />
                </div>
            </section>
        </>
    )
}

export default Poster
