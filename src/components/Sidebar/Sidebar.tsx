import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { useSelector } from 'react-redux'
import { Category } from '../../types'

interface SidebarProps {
    amount: number
}

const Sidebar: React.FC<SidebarProps> = ({ amount }) => {
    const { list, isLoading } = useSelector(
        (state: any) => state.categories
    ) as { list: Category[]; isLoading: boolean }

    const products = list.filter((_, i) => i < amount)

    return (
        <>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebar__title}>CATEGORIES</h2>
                {isLoading && <p>Loading...</p>}
                <nav className={styles.sidebar__nav}>
                    <ul className={styles.sidebar__list}>
                        {products.map(({ id, name }: Category) => (
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

export default Sidebar
