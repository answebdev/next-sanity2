import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import { format } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
import styles from '../styles/Index.module.css';

// Live Site: https://bacon-blog.vercel.app/
// Deployed Studio: https://bacon-blog.sanity.studio/desk

// Create search component (video at 1:16:30 - note video is for Next.js 13): https://www.youtube.com/watch?v=Y6KDk5iyrYE
// Search by tag/catgeory: https://github.com/answebdev/sanity_portfolio/blob/main/src/container/Work/Work.jsx

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Index = ({ posts }) => {
  return (
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
          ({ _id, title = '', slug = '', publishedAt = '', mainImage = '' }) =>
            slug && (
              <div key={_id} className={styles.postContainer}>
                <div className={styles.box}>
                  <li className={styles.li}>
                    {/* <Link className={styles.postLink} href={`/post/${encodeURIComponent(slug.current)}`}>
                      {title}
                    </Link><br /> */}
                    {/* ({new Date(publishedAt).toDateString()}) */}
                  </li>
                  <li className={styles.li}><span className={styles.postTitle}>{title}</span></li>
                  <li className={styles.li}><span className={styles.dateText}>{format(new Date(publishedAt), 'MMMM dd, yyyy')}</span></li>
                  <br />
                  <img style={{ marginBottom: '5px' }}
                    // src={urlFor(mainImage).width(300).url()}
                    src={urlFor(mainImage).width(320).height(240).fit('max').auto('format')}
                    alt={`${mainImage}`}
                  />

                  <li className={styles.li}>
                    <Link className={styles.postLink} href={`/post/${encodeURIComponent(slug.current)}`}>
                      View Post
                    </Link>
                  </li>
                  {/* <Image
                  src={urlFor(mainImage).width(300).url()}
                  alt={`${mainImage}`}
                  width={350}
                  height={250}
                /> */}

                </div>
              </div>
            )
        )}
    </div >
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