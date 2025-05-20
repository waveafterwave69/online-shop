import { useDispatch, useSelector } from 'react-redux'
import Poster from '../../components/Poster/Poster'
import Products from '../../components/Products/Products'
import Categories from '../../components/Categories/Categories'
import Banner from '../../components/Banner/Banner'
import { useEffect } from 'react'
import { filterByPrice } from '../../store/slices/productsSlice'

export default function HomePage() {
    const dispatch = useDispatch()
    const {
        products: { list, filtered },
        categories,
    } = useSelector((state) => state)

    useEffect(() => {
        if (!list.length) return

        dispatch(filterByPrice(100))
    }, [dispatch, list.length])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Poster />
            <Products products={list} amount={5} title="Trending" />
            <Categories
                products={categories.list}
                amount={5}
                title="Worth seeing"
            />
            <Banner />
            <Products products={filtered} amount={5} title="Less than 100$" />
        </>
    )
}
