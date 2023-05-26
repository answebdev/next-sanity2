// import Link from 'next/link';

// const Navbar = () => {
//     return (
//         <>
//             <Link style={{ color: 'tomato', paddingRight: '10px' }} href={'/'}>Home</Link>
//             <Link style={{ color: 'tomato' }} href={'/about'}>About</Link>
//         </>
//     );
// };

// export default Navbar;

import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;

// Source: https://github.com/bradtraversy/next-crash-course
