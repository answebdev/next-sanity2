// VERSION 1

// import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
// import hello from '../assets/img/hello.webp';
// import styles from '../styles/Contact.module.css';

// const contact = () => {

//     const titleTag = `CoderGuides | Contact`;

//     return (
//         <>
//             <Head>
//                 <title>{titleTag}</title>
//                 <meta name="description" content="A blog of random content" />
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>

//             <article>
//                 <div className={styles.mainDiv}>
//                     <div>
//                         <Image className={styles.mainImage}
//                             src={hello}
//                             alt='Hello'
//                         />
//                     </div>
//                     <div>
//                         <p className={styles.headerText}>Hello. I'm Adolf. Nice to meet you!</p>
//                         <p className={styles.subheaderText}>I'm a frontend developer based in San Diego. I like to write about coding. Feel free to reach out.</p>
//                     </div>
//                     <div className={styles.buttonContainer}>
//                         <Link className={styles.button}
//                             href='https://adolfschmuck.com/'
//                             rel='noopener noreferrer'
//                             target='_blank'>
//                             Portfolio
//                         </Link>
//                         <Link className={styles.button}
//                             href='https://www.linkedin.com/in/adolf-schmuck/'
//                             rel='noopener noreferrer'
//                             target='_blank'>
//                             LinkedIn
//                         </Link>
//                         <Link className={styles.button}
//                             href='https://www.buymeacoffee.com/'
//                             rel='noopener noreferrer'
//                             target='_blank'>
//                             Buy Me a Coffee
//                         </Link>
//                     </div>
//                 </div>
//             </article>
//         </>
//     );
// };

// export default contact;

// VERSION 2

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import hello from '../assets/img/hello.webp';
// import styles from '../styles/Contact.module.css';
import classes from '../styles/Contact.module.css';

const contact = () => {

    const titleTag = `CoderGuides | Contact`;

    return (
        <div className={classes.Error}>
            <Head>
                <title>{titleTag}</title>
                <meta name="description" content="A blog of random content" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* <article className={styles.mainDiv}>
                <div className={styles.innerDiv}>
                    <div>
                        <Image className={styles.mainImg}
                            src={hello}
                            alt='Contact Page Image'
                        />
                    </div>
                    <div>
                        <div>
                            <p className={styles.headerText}>Hello. I'm Adolf. Nice to meet you!</p>
                            <p className={styles.subheaderText}>I'm a frontend developer based in San Diego. I like to write about coding. Feel free to connect with me.</p>
                        </div>
                        <div className={styles.buttonContainer}>
                            <Link className={styles.button}
                                href='https://adolfschmuck.com/'
                                rel='noopener noreferrer'
                                target='_blank'>
                                Portfolio
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

                </div>
            </article > */}
            <header className={classes.AppHeader}>
                <div className={classes.MainDiv2}>
                    <Image className={classes.AppLogo}
                        src={hello}
                        alt='Contact Page Image'
                        priority={true}
                    />
                    <br />
                    <div>
                        <div>
                            <p className={classes.headerText}>Hello. I'm Adolf. Nice to meet you!</p>
                            <p className={classes.subheaderText}>I'm a frontend developer based in San Diego. I like to write about coding.</p>
                            <p className={classes.subheaderText}>Feel free to connect with me.</p>
                        </div>
                        {/* </div>
                    <div className={classes.buttonContainer}> */}
                        <Link className={classes.button}
                            href='https://adolfschmuck.com/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            Portfolio
                        </Link>
                        <Link className={classes.button}
                            href='https://www.linkedin.com/in/adolf-schmuck/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            LinkedIn
                        </Link>
                        <Link className={classes.button}
                            href='https://www.buymeacoffee.com/'
                            rel='noopener noreferrer'
                            target='_blank'>
                            Buy Me a Coffee
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default contact;