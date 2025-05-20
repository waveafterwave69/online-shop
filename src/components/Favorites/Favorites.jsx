import { Link } from 'react-router'
import { removeItemFromFav } from '../../store/slices/userSlice'
import styles from './Favorites.module.css'

import { useDispatch, useSelector } from 'react-redux'

import bin from '../../img/bin.png'

export default function Cart() {
    const { fav } = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    return (
        <>
            <section className={styles.cart}>
                <ul className={styles.cart__list}>
                    {fav.map((el) => (
                        <>
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
                                        <h3>{el.price}$</h3>
                                    </div>
                                </div>
                                <div className={styles.item__buttons}>
                                    <button
                                        style={{ padding: '8px' }}
                                        onClick={() =>
                                            dispatch(removeItemFromFav(el))
                                        }
                                    >
                                        <img
                                            src={bin}
                                            style={{
                                                width: '20px',
                                            }}
                                            alt="delete"
                                        />
                                    </button>
                                </div>
                            </li>
                        </>
                    ))}
                </ul>
            </section>
        </>
    )
}
