import styles from './Banner.module.css'

import bannerImg from '../../img/banner.png'
import shoesImg from '../../img/krosovok.png'
import playImg from '../../img/play.png'

export default function Banner() {
    return (
        <>
            <section className={styles.banner}>
                <div className={styles.banner__row}>
                    <div className={styles.row__content}>
                        <h2 className={styles.row__title}>NEW YEAR</h2>
                        <h1 className={styles.row__subtitle}>SALE</h1>
                        <button className={styles.row__button}>See more</button>
                    </div>
                    <img src={shoesImg} alt="shoes" className={styles.shoes} />
                    <img src={playImg} alt="play" className={styles.play} />
                    <img
                        src={bannerImg}
                        alt="sale"
                        className={styles.banner__img}
                    />
                </div>
            </section>
        </>
    )
}
