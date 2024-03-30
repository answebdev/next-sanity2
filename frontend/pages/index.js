import { useState, useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';
import client from '../client';
import { format } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from '../styles/Index.module.css';

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [query1, setQuery1] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Material UI Media Queries for search and select components
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));
  const dynamicStyles = {
    ...matchesSM && {
      minWidth: 'calc(100%)',
      maxWidth: 'calc(100%)',
    },
    ...matchesXL && { marginBottom: '40px' }
  };

  // Select component
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

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>CoderGuides</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:image" content="https://i.postimg.cc/wMSL3ms1/og-image.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1024" />
          <meta property="og:image:height" content="1024" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://coderguides.vercel.app/" />
          <meta property="og:title" content="CoderGuides" />
          <meta name="description" content="A site for coding tutorial guides." />
        </Head>

        <div className={styles.mainTitleContainer}>
          <h1 className={styles.pageHeader}>Welcome to CoderGuides</h1>
          <h2 className={styles.pageSubHeader}>
            A site for coding tutorial guides
          </h2>
        </div>

        <br />

        <div className={styles.searchComponentsContainer}>
          <div className={styles.searchComponentsInnerDiv}>
            <TextField
              InputLabelProps={{
                style: { fontFamily: 'var(--sans_pro-font)' }
              }}
              className={styles.searchInput}
              sx={{ ...dynamicStyles }}
              onChange={(event) => setQuery1(event.target.value)}
              id='standard-basic'
              label='Search for articles'
              variant='standard'
            />
          </div>

          <div

            className={styles.searchComponentsInnerDiv}
          >
            <FormControl variant="standard"
              className={styles.categorySelect}
              sx={{ ...dynamicStyles }}
            >
              <InputLabel
                className={styles.categoryPlaceholder}
                id="demo-simple-select-standard-label"
                htmlFor={'input-id'}>
                Search by category
              </InputLabel>
              <Select
                inputProps={{ id: 'input-id' }}
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
                  <MenuItem className={styles.categoryText} key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

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
      </div >
    </>
  );
};

export default Index;