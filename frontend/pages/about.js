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
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:image" content="https://i.postimg.cc/wMSL3ms1/og-image.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1024" />
                <meta property="og:image:height" content="1024" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://coderguides.vercel.app/about" />
                <meta property="og:title" content="CoderGuides" />
                <meta name="description" content="A site for coding tutorial guides." />
            </Head>

            <article className={styles.mainDiv}>
                <div>
                    <h1 className={styles.pageHeader}>About CoderGuides</h1>
                </div>

                <br />

                <div className={styles.textAndImageContainer}>
                    <div className={styles.mainTextDiv}>
                        Thank you for stopping by. CoderGuides is a site dedicated to articles about coding. Here you will find a variety of coding tutorial guides.
                        We all know what it's like to be stuck on something and look for online resources to help us. This is where CoderGuides comes in. Of course, there may be more than one way to approach the topics written about here,
                        and the ones presented here are not the only ways. But hopefully, the resources found here are useful and the information will be helpful to those who check it out here. Feel free to take a look around.
                        <br />
                        <br />
                        On the tech side of things, this is a new version of CoderGuides. I built it with Next.js and Sanity. Some of the articles here come from my original CoderGuides site, which explains some of the older dates.
                    </div>
                    <Image
                        className={styles.mainImage}
                        src={CoderGuides}
                        alt='CoderGuides'
                        priority={true}
                    />
                </div>

                <br />

                <div className={styles.copyrightDisclaimerContainer}>
                    <p className={styles.copyright}>
                        &copy; 2023 CoderGuides | CoderGuides was created and developed
                        by <Link className={styles.textLink}
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