import Cart from '../components/Cart/Cart'
import SingleCategory from '../components/SingleCategory/SingleCategory'
import SingleProduct from '../components/SingleProduct/SingleProduct'
import CategoriesPage from '../pages/CategoriesPage/CategoriesPage'
import FavPage from '../pages/FavPage/FavPage'
import HomePage from '../pages/HomePage/HomePage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'

import categoryImg from '../img/category.svg'
import heartImg from '../img/heart.svg'
import cartImg from '../img/cart.svg'

export const routesConfig = [
    {
        page: <HomePage />,
        url: '/',
    },
    {
        page: <FavPage />,
        url: '/favorites',
        burger: true,
        text: 'Favorites',
        img: heartImg,
    },
    {
        page: <Cart />,
        url: '/cart',
        burger: true,
        text: 'Cart',
        img: cartImg,
    },
    {
        page: <CategoriesPage />,
        url: 'categoriespage',
        burger: true,
        text: 'Categories',
        img: categoryImg,
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
