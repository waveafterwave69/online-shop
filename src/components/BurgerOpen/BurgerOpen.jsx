import useMenu from '../../hooks/useMenu'

export default function BurgerOpen() {
    const {
        isOpen,
        handleClick,
        toggleMenu,
        currentUser,
        totalCountOfCart,
        totalCountOfFav,
    } = useMenu()

    return (
        <>
            {isOpen && (
                <div className={styles.menu}>
                    <button className={styles.close} onClick={toggleMenu}>
                        <img src={closeImg} alt="close" />
                    </button>
                    <ul className={styles.burgerList}>
                        <li>
                            <Link to="/" onClick={toggleMenu}>
                                <img
                                    src={headerLogoImg}
                                    className={styles.header__logo}
                                    alt="STUFF"
                                />
                            </Link>
                        </li>
                        <li>
                            <button onClick={toggleMenu}>
                                {!currentUser ? (
                                    <div
                                        className={styles.user}
                                        onClick={handleClick}
                                    >
                                        <img
                                            className={styles.user__avatar}
                                            src={avatar}
                                        />
                                        <div className={styles.user__name}>
                                            Guest
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to="/profile"
                                        className={styles.user}
                                        onClick={handleClick}
                                    >
                                        <img
                                            className={styles.user__avatar}
                                            src={avatar}
                                        />
                                        <div className={styles.user__name}>
                                            {currentUser.name}
                                        </div>
                                    </Link>
                                )}
                            </button>
                        </li>
                        <li className={styles.count22}>
                            <Link to="/categoriespage" onClick={toggleMenu}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        columnGap: '15px',
                                    }}
                                >
                                    <img src={categoryImg} alt="cart" />
                                    <p className={styles.count__text}>
                                        Categories
                                    </p>
                                </div>
                            </Link>
                        </li>
                        <li className={styles.count22}>
                            <Link to="/favorites" onClick={toggleMenu}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        columnGap: '15px',
                                    }}
                                >
                                    <img src={heartImg} alt="favorites" />
                                    <p className={styles.count__text}>
                                        Favorites
                                    </p>
                                </div>

                                {totalCountOfFav > 0 && (
                                    <span className={styles.count2}>
                                        {totalCountOfFav}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li className={styles.count22}>
                            <Link to="/cart" onClick={toggleMenu}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        columnGap: '15px',
                                    }}
                                >
                                    <img src={cartImg} alt="cart" />
                                    <p className={styles.count__text}>Cart</p>
                                </div>

                                {totalCountOfCart > 0 && (
                                    <span className={styles.count2}>
                                        {totalCountOfCart}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}
