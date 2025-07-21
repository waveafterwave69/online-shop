import styles from './BurgerClose.module.css'
import HeaderSearch from '../HeaderSearch/HeaderSearch'
import useMenu from '../../hooks/useMenu'

const BurgerClose: React.FC = () => {
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
                            opacity: isOpen ? '0' : '1',
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

export default BurgerClose
