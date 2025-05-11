import { useSelector } from 'react-redux'
import Poster from '../../components/Poster/Poster'
import Products from '../../components/Products/Products'
import Categories from '../../components/Categories/Categories'
import Banner from '../../components/Banner/Banner'

export default function HomePage() {
    const { products, categories } = useSelector((state) => state)

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
        </>
    )
}
