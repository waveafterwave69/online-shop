import { Link } from 'react-router'
import styles from './BurgerOpenItems.module.css'

interface BurgerOpenItemsProps {
    toggleMenu: () => void
    url: string
    text: string
    img: string
    totalCountOfCart: number
    totalCountOfFav: number
    handleClick: () => void
}

const BurgerOpenItems: React.FC<BurgerOpenItemsProps> = ({
    toggleMenu,
    url,
    text,
    img,
    totalCountOfCart,
    totalCountOfFav,
    handleClick,
}) => {
    return (
        <>
            <li
                className={styles.count22}
                onClick={text == 'Cart' ? handleClick : undefined}
            >
                <Link to={url} onClick={toggleMenu}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            columnGap: '15px',
                        }}
                    >
                        <img src={img} alt={text} />
                        <p className={styles.count__text}>{text}</p>
                    </div>

                    {text == 'Favorites' && totalCountOfFav > 0 && (
                        <span className={styles.count2}>{totalCountOfFav}</span>
                    )}
                    {text == 'Cart' && totalCountOfCart > 0 && (
                        <span className={styles.count2}>
                            {totalCountOfCart}
                        </span>
                    )}
                </Link>
            </li>
        </>
    )
}

export default BurgerOpenItems
