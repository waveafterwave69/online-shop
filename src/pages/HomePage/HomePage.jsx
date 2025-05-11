import { useSelector } from 'react-redux'
import Poster from '../../components/Poster/Poster'
import Products from '../../components/Products/Products'

export default function HomePage() {
    const { list } = useSelector(({ products }) => products)

    return (
        <>
            <Poster />
            <Products products={list} amount={5} title="Trending" />
        </>
    )
}
