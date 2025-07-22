import styles from './SingleCategory.module.css'
import Poster from '../Poster/Poster'
import Products from '../Products/Products'
import useCategory from '../../hooks/useCategory'

const SingleCategory: React.FC = () => {
    const {
        hangleChange,
        handleSubmit,
        cat,
        values,
        isLoading,
        isSuccess,
        data,
        setParams,
        setValues,
        defaultParams,
    } = useCategory()

    return (
        <>
            <Poster />
            <section className={styles.categories}>
                <h2 className={styles.categories__title}>{cat}</h2>
                <form
                    onSubmit={handleSubmit}
                    className={styles.categories__form}
                >
                    <div className={styles.form__filter}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Product name"
                            className={styles.filter__text}
                            onChange={hangleChange}
                            value={values.title}
                        />
                    </div>

                    <button type="submit" className={styles.find__button}>
                        Find
                    </button>
                </form>
                {isLoading ? (
                    <div className={styles.preloader}>Loading...</div>
                ) : !isSuccess || !data.length ? (
                    <div className={styles.back}>
                        <span className={styles.noRes}>No results</span>
                        <button
                            className={styles.noResButton}
                            onClick={() => {
                                setParams(defaultParams)
                                setValues(defaultParams)
                            }}
                        >
                            Reset
                        </button>
                    </div>
                ) : (
                    <Products
                        title=""
                        products={data}
                        amount={data.length}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    />
                )}
            </section>
        </>
    )
}

export default SingleCategory
