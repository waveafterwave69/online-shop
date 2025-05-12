import { useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import styles from './SingleProduct.module.css'
import Products from '../Products/Products'
import { useParams } from 'react-router'
import { useGetProductQuery } from '../../store/api/apiSlice'
import { useEffect, useState } from 'react'

export default function SingleProduct() {
    const { id } = useParams()

    const { data } = useGetProductQuery({ id })

    const [cart, setCart] = useState(false)
    const [fav, setFav] = useState(false)
    const [img, setImg] = useState(0)

    useEffect(() => {
        setImg(0)
        window.scrollTo(0, 0)
    }, [data])

    const {
        products: { list },
    } = useSelector((state) => state)

    return (
        <>
            <div className={styles.row}>
                <Sidebar amount={8} />
                <section className={styles.product}>
                    <div className={styles.product__row}>
                        <div className={styles.img__row}>
                            <img
                                src={data && data.images[img]}
                                className={styles.main__img}
                                alt="img"
                            />
                            <div className={styles.img__column}>
                                {data &&
                                    data.images.map((img, index) => (
                                        <button
                                            onClick={() => setImg(index)}
                                            key={img}
                                            className={styles.column__item}
                                        >
                                            <img src={img} alt="img" />
                                        </button>
                                    ))}
                            </div>
                        </div>
                        <div className={styles.product__content}>
                            <h3 className={styles.content__title}>
                                {data && data.title}
                            </h3>
                            <h4 className={styles.content__subtitle}>
                                {data && data.price}$
                            </h4>
                            <div className={styles.content__params}>
                                <div className={styles.params__element}>
                                    <p>Sizes:</p>
                                    <div className={styles.params__list}>
                                        <button className={styles.list__item}>
                                            4,5
                                        </button>
                                        <button className={styles.list__item}>
                                            5
                                        </button>

                                        <button className={styles.list__item}>
                                            5,5
                                        </button>
                                    </div>
                                </div>
                                <p className={styles.content__text}>
                                    {data && data.description}
                                </p>
                                <div className={styles.content__buttons}>
                                    <button
                                        onClick={() => setCart((prev) => !prev)}
                                        className={`${styles.button} ${
                                            cart && styles.active
                                        }`}
                                    >
                                        Add to cart
                                    </button>
                                    <button
                                        onClick={() => setFav((prev) => !prev)}
                                        className={`${styles.button}  ${
                                            fav && styles.active
                                        }`}
                                    >
                                        Add to favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Products products={list} amount={5} title="Related products" />
        </>
    )
}
