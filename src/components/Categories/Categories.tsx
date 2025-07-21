import { Link } from 'react-router-dom'
import styles from './Categories.module.css'
import { Category } from '../../types'

interface CategoriesProps {
    title?: string
    products?: Category[]
    amount: number
}

const Categories: React.FC<CategoriesProps> = ({
    title,
    products = [],
    amount,
}) => {
    const list = products.filter((_, i) => i < amount)

    return (
        <>
            <section className={styles.categories}>
                {title && <h2 className={styles.categories__title}>{title}</h2>}
                <ul className={styles.categories__list}>
                    {list.map((category) => (
                        <li className={styles.list__item} key={category.id}>
                            <Link to={`/categories/${category.id}`}>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className={styles.item__image}
                                />
                                <h3 className={styles.item__title}>
                                    {category.name}
                                </h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Categories
