import { useState, useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
// import groq from 'groq';
import client from '../client';
import { format } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
import Header from '../components/Header';
import styles from '../styles/Index.module.css';

// Live Site: https://bacon-blog.vercel.app/
// Deployed Studio: https://bacon-blog.sanity.studio/desk

// Create search component (video at 1:16:30 - note video is for Next.js 13): https://www.youtube.com/watch?v=Y6KDk5iyrYE
// Search by tag/catgeory: https://github.com/answebdev/sanity_portfolio/blob/main/src/container/Work/Work.jsx
// Next.js Image component: https://nextjs.org/docs/pages/api-reference/components/image
// Next.js Image Component Overview: https://www.axelerant.com/blog/overview-nextjs-image-component-and-its-powerful-capabilities
// Buy Me a Coffee: https://www.buymeacoffee.com/

// DARK THEME
// For Dark Theme, try using NexUI: https://nextui.org/docs/theme/dark-mode
// Install 2 dependencies:
// npm i @nextui-org/react
// npm i next-themes
// Then, go here: https://nextui.org/docs/theme/dark-mode#using-next-themes
// Add the code in Steps 1-3 in '_app.js'; add Step for in 'Nav.js'. That's it.
// Note: this messes up the CSS, so I need to figure this out.
// Override Styles: https://nextui.org/docs/theme/override-styles

// Next.js: How to show the default 404 page: https://maxschmitt.me/posts/next-js-default-404-page

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.fetch(
      `*[_type == "post"] | order(publishedAt desc){
          title,
          slug,
          body,
          description,
          author,
          mainImage {
              asset -> {
                  _id,
                  url
              },
              alt
          },
          publishedAt,
          "categories": categories[]->title
      }`
    ).then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  // Resources:
  // https://stackoverflow.com/questions/70348781/how-to-fetch-sanity-blog-categories
  // https://stackoverflow.com/questions/70635704/sanity-posts-display-all-categories-not-just-ones-associated-with-post

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>CoderGuides</title>
          <meta name="description" content="A blog of random content" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className={styles.pageHeader}>Welcome to CoderGuides</h1>

        <br />

        {posts.map((p, i) => (
          <div key={i} className={styles.postContainer}>
            <div className={styles.card}>
              <div className={styles.card_body}>
                <div className={styles.card_title}>
                  <img className={styles.mainImage}
                    src={urlFor(p.mainImage).url()}
                    alt={`${p.title}`}
                  />
                  <strong>{p.title}</strong>
                </div>
                <div className={styles.card_text}>
                  <p>
                    {p.description}
                  </p>
                </div>
                <div className={styles.badgeContainer}>
                  {p.categories.map((category, i) => (
                    <p className={styles.tagBadge} key={i}>{category}&nbsp;</p>
                  ))}
                </div>
                <Link className={styles.postLink} href={`/post/${encodeURIComponent(p.slug.current)}`}>
                  Read More
                </Link>
              </div>
              <div className={styles.card_footer}>
                <p className={styles.text}><span className={styles.dateText}>{format(new Date(p.publishedAt), 'MMMM dd, yyyy')}</span></p>
              </div>
            </div>
          </div>
        ))}


        {/* ORIGINAL CARD */}
        {/* {posts.map((p, i) => (
          <div key={i} className={styles.postContainer}>
            <div className={styles.box}>
              <br />
              <img className={styles.mainImage}
                src={urlFor(p.mainImage).url()}
                alt={`${p.title}`}
              />
              <p className={styles.text}><span className={styles.postTitle}>{p.title}</span></p>
              <p className={styles.text}><span className={styles.dateText}>{format(new Date(p.publishedAt), 'MMMM dd, yyyy')}</span></p>
              <p className={styles.text}><span className={styles.postDescription}>{p.description}</span></p><br />
              <div className={styles.badgeContainer}>
                {p.categories.map((category, i) => (
                  <p className={styles.tagBadge} key={i}>{category}&nbsp;</p>
                ))}
              </div>
              <Link className={styles.postLink} href={`/post/${encodeURIComponent(p.slug.current)}`}>
                Read More
              </Link>
            </div>
          </div>
        ))} */}

      </div >
    </div>
  );
};

// export async function getStaticProps() {
//   const posts = await client.fetch(groq`
//       *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
//     `);
//   return {
//     props: {
//       posts,
//     },
//     revalidate: 20,
//   };
// }

export default Index;


// ORIGINAL CODE:

// import Head from 'next/head';
// import Link from 'next/link';
// import groq from 'groq';
// import client from '../client';
// import { format } from 'date-fns';
// import imageUrlBuilder from '@sanity/image-url';
// import styles from '../styles/Index.module.css';

// import Header from '../components/Header';

// // Live Site: https://bacon-blog.vercel.app/
// // Deployed Studio: https://bacon-blog.sanity.studio/desk

// // Create search component (video at 1:16:30 - note video is for Next.js 13): https://www.youtube.com/watch?v=Y6KDk5iyrYE
// // Search by tag/catgeory: https://github.com/answebdev/sanity_portfolio/blob/main/src/container/Work/Work.jsx
// // Next.js Image component: https://nextjs.org/docs/pages/api-reference/components/image
// // Next.js Image Component Overview: https://www.axelerant.com/blog/overview-nextjs-image-component-and-its-powerful-capabilities
// // Buy Me a Coffee: https://www.buymeacoffee.com/

// function urlFor(source) {
//   return imageUrlBuilder(client).image(source);
// }

// const Index = ({ posts }) => {
//   return (
//     <div>
//       <Header />
//       <div className={styles.container}>
//         <Head>
//           <title>Bacon Blog</title>
//           <meta name="description" content="A blog of random content" />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>

//         <h1 style={{ textAlign: 'center' }}>Bacon Blog</h1>

//         <br />

//         {posts.length > 0 &&
//           posts.map(
//             ({ _id, title = '', description = '', slug = '', publishedAt = '', mainImage = '' }) =>
//               slug && (
//                 <div key={_id} className={styles.postContainer}>
//                   <div className={styles.box}>
//                     <p className={styles.text}></p>
//                     <br />
//                     <img className={styles.mainImage}
//                       src={urlFor(mainImage).url()}
//                       alt={`${title}`}
//                     />
//                     <p className={styles.text}><span className={styles.postTitle}>{title}</span></p>
//                     <p className={styles.text}><span className={styles.dateText}>{format(new Date(publishedAt), 'MMMM dd, yyyy')}</span></p>
//                     <p className={styles.text}><span className={styles.postDescription}>{description}</span></p><br />
//                     <Link className={styles.postLink} href={`/post/${encodeURIComponent(slug.current)}`}>
//                       View Post
//                     </Link>
//                   </div>
//                 </div>
//               )
//           )}
//       </div >
//     </div>
//   );
// };

// export async function getStaticProps() {
//   const posts = await client.fetch(groq`
//       *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
//     `);
//   return {
//     props: {
//       posts,
//     },
//     revalidate: 20,
//   };
// }

// export default Index;