import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.h1}>CoderGuides</h1>
                <p className={styles.headerText}>Writings on coding</p>
            </div>
        </>
    );
};

export default Header;