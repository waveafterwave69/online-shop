import { Route, Routes } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { routesConfig } from './routes/routesConfig'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { getProducts } from './store/slices/productsSlice'
import UserForm from './components/UserForm/UserForm'
import { getCategories } from './store/slices/categoriesSlice'
import { IRoutes } from './types'

const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            <div className="container">
                <Header />
                <UserForm />

                <Routes>
                    {routesConfig.map(({ page, url }: IRoutes) => (
                        <Route path={url} element={page} />
                    ))}
                </Routes>

                <Footer />
            </div>
        </>
    )
}

export default App
