import { useEffect, useState } from 'react'
import styles from './SingleCategory.module.css'
import Poster from '../Poster/Poster'
import Categories from '../Categories/Categories'
import { useParams } from 'react-router'
import { useGetProductsQuery } from '../../store/api/apiSlice'
import Products from '../Products/Products'
import { useSelector } from 'react-redux'

export default function SingleCategory() {
    const { id } = useParams()
    const { list } = useSelector(({ categories }) => categories)

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
    const [cat, setCat] = useState('')
    const [params, setParams] = useState(defaultParams)

    useEffect(() => {
        if (!id) return

        setParams({ ...defaultParams, categoryId: id })
    }, [id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (!id || !list) return

        const { name } = list.find((item) => item.id === id * 1)

        setCat(name)
    }, [list, id])

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
