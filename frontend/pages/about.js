import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/About.module.css';

//https://api.github.com/users/answebdev

export default function About({ repos }) {
    // console.log(repos);

    return (
        <div className={styles.container}>
            <Head>
                <title>Bacon Blog | About</title>
                <meta name="description" content="A blog of random content" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>
                    About Page
                </h1>

                <h3 className={styles.subHeader}>Check out my GitHub repos</h3>

                {repos.map((repo, i) => {
                    return (
                        <div key={i} className={styles.box}>
                            <a className={styles.repoLink} href={repo.svn_url} target='_blank' rel='noopener noreferrer'>
                                {repo.name}
                            </a>
                            <p className={styles.repoDescription}>{repo.description}</p>
                            <p className={styles.repoLanguage}>{repo.language}</p>
                        </div>
                    );
                })}
                {/* {articles.map((article) => {
                    return (
                        <div>
                            <p>{article.title}</p>
                        </div>
                    );
                })} */}
            </main>
        </div>
    );
}



export const getStaticProps = async () => {
    const response = await fetch('https://api.github.com/users/answebdev/repos');
    const repos = await response.json();

    return {
        props: {
            repos,
        },
    };
};

// export const getStaticProps = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`);
//     const articles = await res.json();

//     return {
//         props: {
//             articles,
//         },
//     };
// };