import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import CoderGuides from '../assets/img/CoderGuides.webp';
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
                    <h1 className={styles.pageHeader}>About CoderGuides</h1>
                </div>

                {/* <hr /> */}

                <br />

                <div className={styles.textAndImageContainer}>
                    <div className={styles.mainTextDiv}>
                        Thank you for stopping by. CoderGuides is a site dedicated to articles about coding. Here you will find a variety of coding tutorial guides.
                        We all know what it's like to be stuck on something and look online for resources to help us. I also realize that there may be more than one way to tackle the topics written about here,
                        and that these are not the only ways to approach them. But hopefully, the information that is here is useful and will be helpful. Feel free to take a look around.
                        <br />
                        <br />
                        On another note, this is a new version of CoderGuides. I built it with Next.js and Sanity. Some of the articles here come from the original CoderGuides site, thus the older dates.
                    </div>
                    <Image
                        // style={{ width: '50%', height: '50%' }}
                        className={styles.mainImage}
                        src={CoderGuides}
                        alt='CoderGuides'
                        priority={true}
                    />
                </div>

                <br />

                {/* <hr /> */}

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