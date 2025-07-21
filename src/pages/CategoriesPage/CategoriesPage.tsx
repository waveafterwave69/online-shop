import { NavLink } from 'react-router-dom'
import styles from './CategoriesPage.module.css'
import { useSelector } from 'react-redux'
import { Category } from '../../types'

const CategoriesPage: React.FC = () => {
    const { list, isLoading } = useSelector(
        (state: any) => state.categories
    ) as { list: Category[]; isLoading: boolean }

    const products = list ? list.filter((_, i) => i < 8) : []

    return (
        <>
            {' '}
            <aside className={styles.sidebar}>
                <div>
                    <h2 className={styles.sidebar__title}>CATEGORIES</h2>
                    {isLoading && <p>Loading...</p>}
                    <nav className={styles.sidebar__nav}>
                        <ul className={styles.sidebar__list}>
                            {products.map(({ id, name }) => (
                                <li key={id} className={styles.list__item}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `${isActive ? styles.active : ''}`
                                        }
                                        to={`/categories/${id}`}
                                    >
                                        <span className={styles.item__text}>
                                            {name}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className={styles.sidebar__footer}>
                    <a href="#" className={styles.footer__link}>
                        Help
                    </a>
                    <a
                        href="#"
                        className={styles.footer__link}
                        style={{ borderBottom: '1px solid #576067' }}
                    >
                        Terms & Conditions
                    </a>
                </div>
            </aside>
        </>
    )
}

export default CategoriesPage
