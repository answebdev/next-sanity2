import Head from 'next/head';
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

            <article>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4em', textAlign: 'center' }}>
                    <div className={styles.headerBox}>
                        <h1 className={styles.pageHeader}>
                            About Page
                        </h1>
                    </div>
                </div>

                <div className={styles.pText}>
                    Content goes here
                </div>
            </article>
        </>
    );
};

export default about;