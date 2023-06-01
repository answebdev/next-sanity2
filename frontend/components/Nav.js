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
import classes from '../styles/Nav.module.css';

const Navbar = () => (
    <header className={classes.Navbar}>
        <div className={`${classes.NavbarTitle} ${classes.NavbarItem}`}>
            <div>
                {/* <span>Bacon Blog</span> */}
                <li className={classes.NavbarItem}>
                    <Link className={classes.BrandLink} href='/'>Bacon Blog</Link>
                </li>
            </div>
        </div>
        <ul className={classes.Ul}>
            <li className={classes.NavbarItem}>
                <Link className={classes.NavLink} href='/'>Home</Link>
            </li>
            <li className={classes.NavbarItem}>
                <Link className={classes.NavLink} href='/about'>About</Link>
            </li>
            <li className={classes.NavbarItem}>
                <Link className={classes.NavLink} href='/contact'>Contact</Link>
            </li>
        </ul>
    </header>
);

export default Navbar;