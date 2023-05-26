import Head from 'next/head';
import Link from 'next/link';
import groq from 'groq';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';
import Nav from '../components/Nav';

// Live Site: https://bacon-blog.vercel.app/
// Deployed Studio: https://bacon-blog.sanity.studio/desk

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Index = ({ posts }) => {
  return (
    <div style={{ padding: '4em' }}>
      <Head>
        <title>Bacon Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div>
        <Link style={{ color: 'tomato', paddingRight: '10px' }} href={'/'}>Home</Link>
        <Link style={{ color: 'tomato' }} href={'/about'}>About</Link>
      </div> */}

      {/* <Nav /> */}

      <h1>Bacon Blog</h1>

      {posts.length > 0 &&
        posts.map(
          ({ _id, title = '', slug = '', publishedAt = '', mainImage = '' }) =>
            slug && (
              <div key={_id} style={{ marginBottom: '40px' }}>
                <li style={{ listStyle: 'none' }}>
                  <Link style={{ color: 'tomato' }} href={`/post/${encodeURIComponent(slug.current)}`}>
                    {title}
                  </Link>{' '}
                  ({new Date(publishedAt).toDateString()})
                </li>
                <br />
                <img
                  src={urlFor(mainImage).width(300).url()}
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