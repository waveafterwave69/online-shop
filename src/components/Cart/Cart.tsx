import { Link } from 'react-router-dom'
import styles from './Cart.module.css'
import { useSelector } from 'react-redux'
import useSetCart from '../../hooks/useSetCart'
import { CartItem } from '../../types'

const Cart: React.FC = () => {
    const { cart } = useSelector((state: any) => state.user) as {
        cart: CartItem[]
    }
    const { setCart } = useSetCart()

    const setItem = (el: CartItem) => {
        setCart(el, el.quantity + 1)
    }

    function setItemMinus(el: CartItem) {
        setCart(el, el.quantity - 1)
    }

    return (
        <>
            <section className={styles.cart}>
                <ul className={styles.cart__list}>
                    {cart.map((el) => (
                        <div key={el.id}>
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
                                        <button onClick={() => setItem(el)}>
                                            +
                                        </button>
                                        <button
                                            onClick={() => setItemMinus(el)}
                                        >
                                            -
                                        </button>
                                    </div>
                                </li>
                            )}
                        </div>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Cart
