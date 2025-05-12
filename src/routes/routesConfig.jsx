import SingleProduct from '../components/SingleProduct/SingleProduct'
import HomePage from '../pages/HomePage/HomePage'

export const routesConfig = [
    {
        page: <HomePage />,
        url: '/',
    },
    {
        page: <HomePage />,
        url: '/favorites',
    },
    {
        page: <HomePage />,
        url: '/cart',
    },
    {
        // page: <HomePage />,
        url: '/categories/:id',
    },
    {
        page: <SingleProduct />,
        url: '/products/:id',
    },
]
