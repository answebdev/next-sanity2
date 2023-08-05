import { useState, useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
// import groq from 'groq';
import client from '../client';
import { format } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Header from '../components/Header';
import styles from '../styles/Index.module.css';

// Live Site: https://coderguides.vercel.app/
// Deployed Studio: https://coderguides.sanity.studio/desk

// OLD URLS:
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
  const [query1, setQuery1] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Material UI Media Queries for search and select components, see:
  // https://stackoverflow.com/questions/45847090/media-queries-in-material-ui-components
  // https://github.com/mui/material-ui/issues/8778
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));
  const dynamicStyles = {
    ...matchesSM && {
      minWidth: 'calc(100%)',
      maxWidth: 'calc(100%)',
      // marginBottom: '40px'
    },
    ...matchesXL && { marginBottom: '40px' }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
    ).then((data) => {
      setPosts(data);

      // Get unique categories and remove duplicates
      const uniqueCategories = [...new Set(data.flatMap(post => post.categories))];
      setCategories(uniqueCategories);
    }).catch(console.error);
  }, []);


  // Resources:
  // https://stackoverflow.com/questions/70348781/how-to-fetch-sanity-blog-categories
  // https://stackoverflow.com/questions/70635704/sanity-posts-display-all-categories-not-just-ones-associated-with-post

  return (
    <>
      {/* <Header /> */}
      <div className={styles.container}>
        <Head>
          <title>CoderGuides</title>
          <meta name="description" content="A blog of random content" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className={styles.pageHeader}>Welcome to CoderGuides</h1>
        <h2 className={styles.pageSubHeader}>
          A site for coding tutorial guides
        </h2>

        <br />

        <div className={styles.searchComponentsContainer}>
          <div className={styles.searchComponentsInnerDiv}>
            <TextField
              className={styles.searchInput}
              sx={{ ...dynamicStyles }}
              // sx={{
              //   width: '300px', marginBottom: '40px'
              // }}
              onChange={(event) => setQuery1(event.target.value)}
              id='standard-basic'
              label='Search for articles'
              variant='standard'
            />
          </div>

          {/* Select element to filter by category */}
          {/* <div>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div> */}

          <div

            className={styles.searchComponentsInnerDiv}
          >
            <FormControl variant="standard"
              className={styles.categorySelect}
              sx={{ ...dynamicStyles }}
            // sx={{ m: 1, minWidth: 120, paddingLeft: 0 }}
            >
              <InputLabel id="demo-simple-select-standard-label">Search by category</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                label="Category"
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <strong>All Categories</strong>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* {posts
          .filter((item) => {
            if (query1 === '') {
              return item;
            } else if (
              item.title.toLowerCase().includes(query1.toLowerCase())
            ) {
              return item;
            }
            // If none of the if or else-if conditions match
            return false;
          })
          .map((p, i) => (
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
          ))} */}

        {posts
          .filter((item) => {
            // Filter by search query and selected category
            if (query1 === '' && (selectedCategory === '' || item.categories.includes(selectedCategory))) {
              return true;
            } else if (
              item.title.toLowerCase().includes(query1.toLowerCase()) &&
              (selectedCategory === '' || item.categories.includes(selectedCategory))
            ) {
              return true;
            }
            return false;
          })
          .map((p, i) => (
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
    </>
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