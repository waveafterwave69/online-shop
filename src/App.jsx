import { Route, Routes } from 'react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { routesConfig } from './routes/routesConfig'
import { getCategories } from './store/slices/categoriesSlice'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { getProducts } from './store/slices/productsSlice'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            <div className="container">
                <Header />

                <Routes>
                    {routesConfig.map(({ page, url }) => (
                        <Route path={url} element={page} />
                    ))}
                </Routes>

                <Footer />
            </div>
        </>
    )
}

export default App
