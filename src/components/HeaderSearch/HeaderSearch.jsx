import { Link } from 'react-router'
import useMenu from '../../hooks/useMenu'
import formSearchOmg from '../../img/search.svg'
import styles from './HeaderSearch.module.css'

export default function HeaderSearch() {
    const {
        searchValue,
        setShowSearchValue,
        itemClick,
        data,
        isLoading,
        showSearchValue,
        handleSearch,
    } = useMenu()

    return (
        <>
            <form className={styles.form}>
                <div className={styles.form__row}>
                    <img className={styles.form__search} src={formSearchOmg} />
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
                                                className={styles.box__img}
                                                src={images}
                                                alt="img"
                                            />
                                            <p className={styles.box__title}>
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
        </>
    )
}
