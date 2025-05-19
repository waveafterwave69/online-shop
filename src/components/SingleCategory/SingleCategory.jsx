import { useEffect, useState } from 'react'
import styles from './SingleCategory.module.css'
import Poster from '../Poster/Poster'
import Categories from '../Categories/Categories'
import { useParams } from 'react-router'
import { useGetProductsQuery } from '../../store/api/apiSlice'
import Products from '../Products/Products'

export default function SingleCategory() {
    const { id } = useParams()

    const defaultValues = {
        title: '',
        price_min: 0,
        prict_max: 0,
    }

    const defaultParams = {
        categoryId: id,
        ...defaultValues,
    }

    const [values, setValues] = useState(defaultValues)

    const [params, setParams] = useState(defaultParams)

    useEffect(() => {
        if (!id) return

        setParams({ ...defaultParams, categoryId: id })
    }, [id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { data, isLoading, isSuccess } = useGetProductsQuery(params)

    const hangleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setParams({ ...params, ...values })
    }

    return (
        <>
            <Poster />
            <section className={styles.categories}>
                <h2 className={styles.categories__title}>Shoes</h2>
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
                        <input
                            type="number"
                            name="prace_min"
                            placeholder="0"
                            className={styles.filter__text}
                            onChange={hangleChange}
                            value={values.price_min}
                        />
                        <input
                            type="number"
                            name="prace_max"
                            placeholder="0"
                            className={styles.filter__text}
                            onChange={hangleChange}
                            value={values.price_min}
                        />
                    </div>

                    <button type="submit" hidden />
                </form>
                <ul className={styles.categories__list}></ul>
                {isLoading ? (
                    <div className={styles.preloader}>Loading...</div>
                ) : !isSuccess || !data.length ? (
                    <div className={styles.back}>
                        <span className={styles.noRes}>No results</span>
                        <button
                            className={styles.noResButton}
                            onClick={() => {
                                setParams(defaultParams)
                                setValues(defaultValues)
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
                        style={{ display: 'flex', justifyContent: 'center' }}
                    />
                )}
            </section>
        </>
    )
}
