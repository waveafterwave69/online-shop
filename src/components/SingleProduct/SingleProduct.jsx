import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import styles from './SingleProduct.module.css'
import Products from '../Products/Products'
import { useParams } from 'react-router'
import { useGetProductQuery } from '../../store/api/apiSlice'
import { useEffect, useState } from 'react'
import { addItemToCart, removeItemFromCart } from '../../store/slices/userSlice'

const sizes = [4.5, 5, 5.5]

export default function SingleProduct() {
    const dispatch = useDispatch()

    const { id } = useParams()

    const { data, isLoading } = useGetProductQuery({ id })

    const [cart, setCart] = useState(false)
    const [fav, setFav] = useState(false)
    const [img, setImg] = useState(0)
    const [currentSize, setCurrentSize] = useState('')

    useEffect(() => {
        setImg(0)
        setCart(false)
        setFav(false)
        setCurrentSize('')
        window.scrollTo(0, 0)
    }, [data])

    const handleCart = () => {
        setCart(true)
        dispatch(addItemToCart(data))
    }

    const handleCartMinus = () => {
        dispatch(removeItemFromCart(data))
    }

    const handleFav = () => {
        setFav((prev) => !prev)
    }

    const handleSize = (size) => {
        if (size !== currentSize) {
            setCart(false)
            setCurrentSize(size)
        }
    }
    const {
        products: { list },
        user,
    } = useSelector((state) => state)

    let needEl

    user.cart.forEach((el, index) => {
        if (el.id == id) {
            needEl = el
        }
    })

    console.log(needEl)

    return (
        <>
            <div className={styles.row}>
                <Sidebar amount={8} />
                <section className={styles.product}>
                    <div className={styles.product__row}>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
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
                                                    onClick={() =>
                                                        setImg(index)
                                                    }
                                                    key={img}
                                                    className={
                                                        styles.column__item
                                                    }
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
                                            <div
                                                className={styles.params__list}
                                            >
                                                <p>Sizes:</p>
                                                {sizes.map((size) => (
                                                    <button
                                                        onClick={() =>
                                                            handleSize(size)
                                                        }
                                                        key={size}
                                                        className={`${
                                                            styles.list__item
                                                        } ${
                                                            currentSize ===
                                                                size &&
                                                            styles.active
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <p className={styles.content__text}>
                                            {data && data.description}
                                        </p>
                                        <div
                                            className={styles.content__buttons}
                                        >
                                            {!needEl || needEl.quantity < 1 ? (
                                                <button
                                                    disabled={!currentSize}
                                                    onClick={handleCart}
                                                    className={`${
                                                        styles.button
                                                    } ${cart && styles.active}`}
                                                >
                                                    Add to cart
                                                </button>
                                            ) : (
                                                <>
                                                    <div
                                                        className={
                                                            styles.buttonPlusMinus
                                                        }
                                                    >
                                                        <button
                                                            style={{
                                                                fontSize:
                                                                    '26px',
                                                                fontWeight:
                                                                    '600',
                                                                padding:
                                                                    '3px 5px',
                                                            }}
                                                            onClick={
                                                                handleCartMinus
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <div
                                                            className={
                                                                styles.quantity
                                                            }
                                                        >
                                                            {needEl.quantity}{' '}
                                                            шт.
                                                        </div>
                                                        <button
                                                            onClick={handleCart}
                                                            style={{
                                                                fontSize:
                                                                    '26px',
                                                                fontWeight:
                                                                    '600',
                                                                padding:
                                                                    '3px 5px',
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </>
                                            )}

                                            <button
                                                disabled={!currentSize}
                                                onClick={handleFav}
                                                className={`${styles.button}  ${
                                                    fav && styles.active
                                                }`}
                                            >
                                                {!fav
                                                    ? 'Add to favorites'
                                                    : 'Remove from favorites'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
            <Products products={list} amount={5} title="Related products" />
        </>
    )
}
