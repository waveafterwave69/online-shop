import { Link } from 'react-router'
import {
    addItemToCart,
    removeItemFromCartAll,
} from '../../store/slices/userSlice'
import styles from './Cart.module.css'

import { useDispatch, useSelector } from 'react-redux'

export default function Cart() {
    const { cart } = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    const handleCart = (item, quantity) => {
        if (quantity > 0) {
            dispatch(addItemToCart({ ...item, quantity }))
        } else {
            dispatch(removeItemFromCartAll(item))
        }
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
                                        <button
                                            onClick={() =>
                                                handleCart(el, el.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                        <button
                                            // disabled={el.quantity === 1}
                                            onClick={() =>
                                                handleCart(el, el.quantity - 1)
                                            }
                                        >
                                            -
                                        </button>
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
