import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import { format } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
import styles from '../styles/Index.module.css';

import Header from '../components/Header';

// Live Site: https://bacon-blog.vercel.app/
// Deployed Studio: https://bacon-blog.sanity.studio/desk

// Create search component (video at 1:16:30 - note video is for Next.js 13): https://www.youtube.com/watch?v=Y6KDk5iyrYE
// Search by tag/catgeory: https://github.com/answebdev/sanity_portfolio/blob/main/src/container/Work/Work.jsx
// Next.js Image component: https://nextjs.org/docs/pages/api-reference/components/image
// Next.js Image Component Overview: https://www.axelerant.com/blog/overview-nextjs-image-component-and-its-powerful-capabilities
// Buy Me a Coffee: https://www.buymeacoffee.com/

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Index = ({ posts }) => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Bacon Blog</title>
          <meta name="description" content="A blog of random content" />
          <link rel="icon" href="/favicon.ico" />
        </Head>



        <h1 style={{ textAlign: 'center' }}>Bacon Blog</h1>

        <br />


        {posts.length > 0 &&
          posts.map(
            ({ _id, title = '', description = '', slug = '', publishedAt = '', mainImage = '' }) =>
              slug && (
                <div key={_id} className={styles.postContainer}>
                  <div className={styles.box}>
                    <p className={styles.text}></p>

                    {/* <p className={styles.text}><span className={styles.postDescription}>{description}</span></p> */}
                    <br />
                    <img className={styles.mainImage}
                      src={urlFor(mainImage).url()}
                      alt={`${title}`}
                    />
                    {/* <p className={styles.text}> */}
                    <p className={styles.text}><span className={styles.postTitle}>{title}</span></p>
                    <p className={styles.text}><span className={styles.dateText}>{format(new Date(publishedAt), 'MMMM dd, yyyy')}</span></p>
                    <p className={styles.text}><span className={styles.postDescription}>{description}</span></p><br />
                    <Link className={styles.postLink} href={`/post/${encodeURIComponent(slug.current)}`}>
                      View Post
                    </Link>
                    {/* </p> */}
                  </div>
                </div>
              )
          )}
      </div >
    </div>
  );
};

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `);
  return {
    props: {
      posts,
    },
    revalidate: 20,
  };
}

export default Index;