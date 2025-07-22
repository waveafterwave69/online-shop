import styles from './Promo.module.css'

import pcImg from '../../img/pc.png'

const Promo: React.FC = () => {
    return (
        <>
            <section className={styles.promo}>
                <h1 className={styles.promo__title}>BIG SALE 20%</h1>
                <div className={styles.promo__product}>
                    <div className={styles.product__text}>
                        <h3 className={styles.product__title}>
                            the bestseller of 2022
                        </h3>
                        <h2 className={styles.product__subtitle}>
                            LENNON r2d2 <br />
                            with NVIDIA 5090 TI
                        </h2>
                        <button className={styles.product__button}>
                            Shop Now
                        </button>
                    </div>
                    <img src={pcImg} alt="pc" className={styles.product__img} />
                </div>
            </section>
        </>
    )
}

export default Promo
