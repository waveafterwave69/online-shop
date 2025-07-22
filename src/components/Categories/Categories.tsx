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
                <h2 className={styles.categories__title}>{title}</h2>
                <ul className={styles.categories__list}>
                    {list.map(({ id, name, image }) => (
                        <li className={styles.list__item} key={id}>
                            <Link to={`/categories/${id}`}>
                                <img
                                    src={image}
                                    alt="product"
                                    className={styles.item__image}
                                />
                                <h3 className={styles.item__title}>{name}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Categories
