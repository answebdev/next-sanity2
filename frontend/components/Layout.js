import Nav from './Nav';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </>
    );
};

export default Layout;

// Source: https://github.com/bradtraversy/next-crash-course
