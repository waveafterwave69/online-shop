import { Route, Routes } from 'react-router'
import { routesConfig } from './routes/routesConfig'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
    return (
        <>
            <div className="container">
                <Header />

                {/* <Sidebar /> */}
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
