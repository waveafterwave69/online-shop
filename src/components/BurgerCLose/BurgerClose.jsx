import styles from './BurgerClose.module.css'
import useMenu from '../../hooks/useMenu'
import HeaderSearch from '../HeaderSearch/HeaderSearch'

export default function BurgerClose() {
    const { isOpen, toggleMenu } = useMenu()

    return (
        <>
            {!isOpen && (
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
                        <HeaderSearch />
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
            )}
        </>
    )
}
