import Cart from '../components/Cart/Cart'
import SingleCategory from '../components/SingleCategory/SingleCategory'
import SingleProduct from '../components/SingleProduct/SingleProduct'
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage'
import FavPage from '../pages/FavPage/FavPage'
import HomePage from '../pages/HomePage/HomePage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'

export const routesConfig = [
    {
        page: <HomePage />,
        url: '/',
    },
    {
        page: <FavPage />,
        url: '/favorites',
    },
    {
        page: <Cart />,
        url: '/cart',
    },
    {
        page: <CategoriesPage />,
        url: 'categoriespage',
    },
    {
        page: <SingleCategory />,
        url: '/categories/:id',
    },
    {
        page: <SingleProduct />,
        url: '/products/:id',
    },
    {
        page: <ProfilePage />,
        url: '/profile',
    },
]
