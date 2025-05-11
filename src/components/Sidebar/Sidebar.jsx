import { NavLink } from 'react-router'
import styles from './Sidebar.module.css'
import { useSelector } from 'react-redux'

export default function Sidebar() {
    const { list, isLoading } = useSelector(({ categories }) => categories)

    return (
        <>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebar__title}>CATEGORIES</h2>
                {isLoading && <p>Loading...</p>}
                <nav className={styles.sidebar__nav}>
                    <ul className={styles.sidebar__list}>
                        {list &&
                            list.map(({ id, name }) => (
                                <li key={id} className={styles.list__item}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            `${isActive ? styles.active : null}`
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
