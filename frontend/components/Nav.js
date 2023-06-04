// // import Link from 'next/link';

// // const Navbar = () => {
// //     return (
// //         <>
// //             <Link style={{ color: 'tomato', paddingRight: '10px' }} href={'/'}>Home</Link>
// //             <Link style={{ color: 'tomato' }} href={'/about'}>About</Link>
// //         </>
// //     );
// // };

// // export default Navbar;

// import Link from 'next/link';
// import navStyles from '../styles/Nav.module.css';

// const Nav = () => {
//     return (
//         <>
//             <nav className={navStyles.nav}>
//                 {/* <Link href='/'>npm start blog</Link> */}
//                 <Link href='/'><span className={navStyles.brand}>Bacon Blog</span></Link>
//                 <ul>
//                     <li>
//                         <Link href='/'>Home</Link>
//                     </li>
//                     <li>
//                         <Link href='/about'>About</Link>
//                     </li>
//                     <li>
//                         <Link href='/contact'>Contact</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </>
//     );
// };

// export default Nav;

// // Source: https://github.com/bradtraversy/next-crash-course
// // See also: https://reacthustle.com/blog/next-js-add-navbar-to-all-pages


import Link from 'next/link';
// import classes from '../styles/Nav.module.css';
import styles from '../styles/Nav.module.css';

const Navbar = () => (
    <header className={styles.navbar}>
        <div className={`${styles.navbarTitle} ${styles.navbarItem}`}>
            <div>
                {/* <span>Bacon Blog</span> */}
                <li className={styles.navbarItem}>
                    <Link className={styles.brandLink} href='/'>Bacon Blog</Link>
                </li>
            </div>
        </div>
        <ul className={styles.ulElement}>
            <li className={styles.navbarItem}>
                <Link className={styles.navLink} href='/'>Home</Link>
            </li>
            <li className={styles.navbarItem}>
                <Link className={styles.navLink} href='/about'>About</Link>
            </li>
            <li className={styles.navbarItem}>
                <Link className={styles.navLink} href='/contact'>Contact</Link>
            </li>
        </ul>
    </header>
);

export default Navbar;