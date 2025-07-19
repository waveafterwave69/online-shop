import { Link } from 'react-router'
import styles from './Products.module.css'

export default function Products({ title, products = [], amount, style = {} }) {
    const list = products.filter((_, i) => i < amount)

    return (
        <>
            <section className={styles.products} style={style}>
                {title && <h2 className={styles.products__title}>{title}</h2>}
                <ul className={styles.products__list}>
                    {list.map(({ id, images, title, price }) => (
                        <li key={id} className={styles.list__item}>
                            <Link to={`/products/${id}`}>
                                <img
                                    src={images[0]}
                                    alt=""
                                    className={styles.products__image}
                                />

                                <div className={styles.products__wrapper}>
                                    <div className={styles.products__1}>
                                        <h3 className={styles.wrapper__title}>
                                            {title}
                                        </h3>
                                        <div className={styles.wrapper__text}>
                                            {title}
                                        </div>
                                    </div>

                                    <div className={styles.wrapper__info}>
                                        <div className={styles.price}>
                                            <div className={styles.info__price}>
                                                {price}$
                                            </div>
                                            <div
                                                className={
                                                    styles.info__oldprice
                                                }
                                            >
                                                {Math.floor(price * 0.8)}$
                                            </div>
                                        </div>

                                        <div className={styles.info__purchases}>
                                            {Math.floor(Math.random() * 20 + 1)}{' '}
                                            people purchased
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}
