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

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Index = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bacon Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Bacon Blog</h1>

      {posts.length > 0 &&
        posts.map(
          ({ _id, title = '', slug = '', publishedAt = '', mainImage = '' }) =>
            slug && (
              <div key={_id} className={styles.postContainer}>
                <li className={styles.li}>
                  <Link className={styles.postLink} href={`/post/${encodeURIComponent(slug.current)}`}>
                    {title}
                  </Link>{' '}·{' '}
                  {/* ({new Date(publishedAt).toDateString()}) */}
                  <span className={styles.dateText}>{format(new Date(publishedAt), 'MMMM dd, yyyy')}</span>
                </li>
                <br />
                <img
                  // src={urlFor(mainImage).width(300).url()}
                  src={urlFor(mainImage).width(320).height(240).fit('max').auto('format')}
                  alt={`${mainImage}`}
                />

                {/* <Image
                  src={urlFor(mainImage).width(300).url()}
                  alt={`${mainImage}`}
                  width={350}
                  height={250}
                /> */}


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