import Link from 'next/link';
import Image from 'next/image';
import groq from 'groq';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';
// import { SanityImageSource } from '@sanity/image-url/lib/types/types';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Index = ({ posts }) => {
  return (
    <div style={{ padding: '4em' }}>
      <h1>Random Blog</h1>
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
  };
}

export default Index;