import { useDispatch, useSelector } from 'react-redux'
import Poster from '../../components/Poster/Poster'
import Products from '../../components/Products/Products'
import Categories from '../../components/Categories/Categories'
import Banner from '../../components/Banner/Banner'
import { useEffect } from 'react'
import { filterByPrice } from '../../store/slices/productsSlice'
import { Category, Product } from '../../types'

const HomePage: React.FC = () => {
    const dispatch = useDispatch()
    const { products, categories } = useSelector((state: any) => ({
        products: state.products as { list: Product[]; filtered: Product[] },
        categories: state.categories as {
            list: Category[]
            isLoading: boolean
        },
    }))

    useEffect(() => {
        if (!products.list.length) return

        dispatch(filterByPrice(100))
    }, [dispatch, products.list.length])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Poster />
            <Products products={products.list} amount={5} title="Trending" />
            <Categories
                products={categories.list}
                amount={5}
                title="Worth seeing"
            />
            <Banner />
            <Products
                products={products.filtered}
                amount={5}
                title="Less than 100$"
            />
        </>
    )
}

export default HomePage
