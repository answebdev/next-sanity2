import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            <Link style={{ color: 'tomato', paddingRight: '10px' }} href={'/'}>Home</Link>
            <Link style={{ color: 'tomato' }} href={'/about'}>About</Link>
        </>
    );
};

export default Navbar;