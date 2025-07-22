import Sidebar from '../Sidebar/Sidebar'
import styles from './SingleProduct.module.css'
import Products from '../Products/Products'

import { sizes } from '../../services/product'
import useSingleCategory from '../../hooks/useSingleCategory'

const SingleProduct: React.FC = () => {
    const {
        isLoading,
        related,
        data,
        currentSize,
        img,
        needEl,
        handleCart,
        needFav,
        handleFav,
        fav,
        setImg,
        handleSize,
        handleFavMinus,
        handleCartMinus,
    } = useSingleCategory()

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
                                            data.images.map((img) => (
                                                <button
                                                    // onClick={() =>
                                                    //     setImg(index)
                                                    // }
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
                                                            handleSize(
                                                                String(size)
                                                            )
                                                        }
                                                        key={size}
                                                        className={`${
                                                            styles.list__item
                                                        } ${
                                                            currentSize ===
                                                                String(size) &&
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
                                                    className={`${styles.button}`}
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
                                            {needFav?.fav != true ? (
                                                <button
                                                    disabled={!currentSize}
                                                    onClick={handleFav}
                                                    className={`${
                                                        styles.button
                                                    }  ${fav && styles.active}`}
                                                >
                                                    Add to favorites
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        disabled={false}
                                                        onClick={handleFavMinus}
                                                        className={`${styles.button}  ${styles.active}`}
                                                    >
                                                        Remove from favorites
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
            <Products products={related} amount={5} title="Related products" />
        </>
    )
}

export default SingleProduct
