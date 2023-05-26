import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <Link style={{ color: 'tomato', paddingRight: '10px' }} href={'/'}>Home</Link>
            <Link style={{ color: 'tomato' }} href={'/about'}>About</Link>
        </div>
    );
};

export default Navbar;