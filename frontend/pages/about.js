import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/img/logo_about.webp';
import styles from '../styles/About.module.css';

const about = () => {

    const titleTag = `CoderGuides | About`;

    return (
        <>
            <Head>
                <title>{titleTag}</title>
                <meta name="description" content="A blog of random content" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <article className={styles.mainDiv}>
                <div>
                    <h1 className={styles.pageHeader}>Welcome to CoderGuides</h1>
                </div>

                <div className={styles.textAndImageContainer}>
                    <div className={styles.mainTextDiv}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <Image
                        // style={{ width: '50%', height: '50%' }}
                        className={styles.mainImage}
                        src={logo}
                        alt='CoderGuides Logo'
                        priority={true}
                    />
                </div>

                <br />

                <div className={styles.copyrightDisclaimerContainer}>
                    <p className={styles.copyright}>
                        &copy; 2023 CoderGuides | CoderGuides was created and developed
                        by <Link
                            style={{ color: 'tomato' }}
                            href='https://adolfschmuck.com/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            Adolf Schmuck
                        </Link>.
                    </p>

                    <p className={styles.disclaimer}>
                        CoderGuides contains links to other websites. These links are
                        not endorsements of any products or services found on such
                        sites, and no information on such sites has been endorsed or
                        approved by CoderGuides.
                    </p>
                </div>
            </article>
        </>
    );
};

export default about;