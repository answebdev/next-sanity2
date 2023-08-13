import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Image from 'next/image';
import hello from '../assets/img/helloy.png';
import styles from '../styles/Contact.module.css';

const contact = () => {

    const titleTag = `CoderGuides | Contact`;

    return (
        <>
            <Head>
                <title>{titleTag}</title>
                <meta name="description" content="A site for coding tutorial guides" />
                <link rel="icon" href="/favicon.ico" />
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
                        {/* <Button className={styles.button}
                            href='https://adolfschmuck.com/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            Website
                        </Button>
                        <Button className={styles.button}
                            href='https://www.linkedin.com/in/adolf-schmuck/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            LinkedIn
                        </Button>
                        <Button className={styles.button}
                            href='https://www.buymeacoffee.com/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            Buy Me a Coffee
                        </Button> */}
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