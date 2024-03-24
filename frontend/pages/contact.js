import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import hello from '../assets/img/hello2.webp';
import styles from '../styles/Contact.module.css';

const contact = () => {

    const titleTag = `CoderGuides | Contact`;

    return (
        <>
            <Head>
                <title>{titleTag}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:image" content="https://i.postimg.cc/wBPwCy9Z/og-image.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1024" />
                <meta property="og:image:height" content="1024" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://coderguides.vercel.app/contact" />
                <meta property="og:title" content="CoderGuides" />
                <meta name="description" content="A site for coding tutorial guides." />
            </Head>

            <article className={styles.mainDiv}>
                <div className={styles.innerDiv}>
                    <Image className={styles.mainImage}
                        src={hello}
                        alt='Contact Page Image'
                        priority={true}
                    />
                    <br />
                    <div>
                        <div>
                            <p className={styles.headerText}>Hello. I'm Adolf. Nice to meet you!</p>
                            <p className={styles.subheaderText}>I'm a frontend developer based in San Diego. I like to write about coding.</p>
                            <p className={styles.subheaderText}>Feel free to connect with me.</p>
                        </div>
                        <Link className={styles.button}
                            href='https://adolfschmuck.com/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            Website
                        </Link>
                        <Link className={styles.button}
                            href='https://www.linkedin.com/in/adolf-schmuck/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            LinkedIn
                        </Link>
                        <Link className={styles.button}
                            href='https://www.buymeacoffee.com/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            Buy Me a Coffee
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
};

export default contact;