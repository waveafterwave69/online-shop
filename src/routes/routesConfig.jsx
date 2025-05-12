import Sidebar from '../components/Sidebar/Sidebar'
import SingleProduct from '../components/SingleProduct/SingleProduct'
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage'
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
        page: <CategoriesPage />,
        url: 'categoriespage',
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
