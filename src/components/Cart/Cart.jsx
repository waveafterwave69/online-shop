import { Link } from 'react-router'
import styles from './Cart.module.css'

import { useSelector } from 'react-redux'
import useSetCart from '../../hooks/useSetCart'

export default function Cart() {
    const { cart } = useSelector(({ user }) => user)
    const { setCart } = useSetCart()

    function setItem() {
        setCart(el, el.quantity + 1)
    }

    return (
        <>
            <section className={styles.cart}>
                <ul className={styles.cart__list}>
                    {cart.map((el) => (
                        <>
                            {el.quantity > 0 && (
                                <li className={styles.cart__item} key={el.id}>
                                    <div className={styles.item__text}>
                                        <Link to={`../products/${el.id}`}>
                                            <img
                                                src={el.images[0]}
                                                alt="img"
                                                className={styles.item__img}
                                            />
                                        </Link>

                                        <div className={styles.text__text}>
                                            <h1>{el.title}</h1>
                                            <h2>{el.quantity} шт.</h2>
                                            <h3>{el.price * el.quantity}$</h3>
                                        </div>
                                    </div>
                                    <div className={styles.item__buttons}>
                                        <button onClick={setItem}>+</button>
                                        <button onClick={setItem}>-</button>
                                    </div>
                                </li>
                            )}
                        </>
                    ))}
                </ul>
            </section>
        </>
    )
}
