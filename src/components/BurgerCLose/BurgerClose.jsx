import styles from './BurgerClose.module.css'
import formSearchOmg from '../../img/search.svg'
import { Link } from 'react-router'
import useMenu from '../../hooks/useMenu'

export default function BurgerClose() {
    const { isOpen, toggleMenu, handleSearch, searchValue } = useMenu()

    return (
        <>
            <div className={styles.burgerMenu}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        columnGap: '20px',
                        opacity: isOpen && '0',
                        transitionDuration: '0s',
                    }}
                >
                    <form
                        className={styles.form}
                        style={{
                            border: '1px solid rgba(97, 110, 116, 0.82)',
                            borderRadius: '6px',
                        }}
                    >
                        <div className={styles.form__row}>
                            <img
                                className={styles.form__search}
                                src={formSearchOmg}
                            />
                            <input
                                className={styles.input}
                                name="search"
                                placeholder="Search for anything..."
                                autoComplete="off"
                                onChange={handleSearch}
                                value={searchValue}
                                onClick={() => setShowSearchValue(true)}
                            />
                        </div>

                        {searchValue && showSearchValue && (
                            <ul className={styles.form__box}>
                                {isLoading ? (
                                    <p style={{ color: 'black' }}>Loading</p>
                                ) : !data.length ? (
                                    <p style={{ color: 'black' }}>No result</p>
                                ) : (
                                    data.map(({ title, images, id }) => {
                                        return (
                                            <li key={id}>
                                                <Link
                                                    to={`/products/${id}`}
                                                    className={styles.box__item}
                                                    onClick={itemClick}
                                                >
                                                    <img
                                                        className={
                                                            styles.box__img
                                                        }
                                                        src={images}
                                                        alt="img"
                                                    />
                                                    <p
                                                        className={
                                                            styles.box__title
                                                        }
                                                    >
                                                        {title}
                                                    </p>
                                                </Link>
                                            </li>
                                        )
                                    })
                                )}
                            </ul>
                        )}
                    </form>
                    <button
                        className={styles.burgerButton}
                        onClick={toggleMenu}
                    >
                        <div className={styles.burgerLine}></div>
                        <div className={styles.burgerLine}></div>
                        <div className={styles.burgerLine}></div>
                    </button>
                </div>
            </div>
        </>
    )
}
